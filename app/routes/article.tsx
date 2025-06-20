import styled from "styled-components";
import ArticleMarkdown from "~/components/ArticleMarkdown";
import { useState, useRef, useMemo} from "react";
import ColBanner from "~/components/ColBanner";
import Header from "~/components/Header";
import GoodSvg from '~/asset/icon/good.svg?react'
import BadSvg from '~/asset/icon/bad.svg?react'
import ShareSvg from '~/asset/icon/share.svg?react'
import BookmarkSvg from '~/asset/icon/bookmark.svg?react'
import CommentItem, {type CommentItemProps} from "~/components/CommentItem";
import {useParams} from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBookmark, getPostById, getPostCommentsById, getPostMarkdownById, postBookmark, postComment } from "~/apis/posts";
import { deleteReaction, getReaction, postReaction } from "~/apis/reaction";
import { getUserData } from "~/apis/uesrs";

function formatDate(date: Date) {
  return date.toLocaleString("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

interface ArticleData {
  title: string;
  description: string;
  paper_id: string;
  category: string;
  tag: string;
  created: Date;
  modified: Date;
  like_count: number;
  dislike_count: number;
}


export default function Article() {
  const queryClient = useQueryClient();
  const { paper_id } = useParams<{ paper_id: string }>();
  const [comments, setComments] = useState<CommentItemProps[] | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const commentRef = useRef<HTMLDivElement>(null);

  const {data: articleData, isLoading } = useQuery({queryKey: ['articleData', paper_id], queryFn: () => paper_id ? getPostById(paper_id) : Promise.resolve(null) });
  const {data: content, isLoading: contentLoading } = useQuery({queryKey: ['articleContent', paper_id], queryFn: () => paper_id ? getPostMarkdownById(paper_id) : Promise.resolve(null) });
  const {data: reactionData} = useQuery({queryKey: ['reactionData', paper_id], queryFn: () => paper_id ? getReaction(paper_id) : Promise.resolve(null) });
  const {data: commentData} = useQuery({queryKey: ['commentData', paper_id], queryFn: () => paper_id ? getPostCommentsById(paper_id) : Promise.resolve(null) });
  const {data: userData} = useQuery({queryKey: ['userData'], queryFn: () => getUserData() });

  const bookmark = useMemo(() => {
    if (!userData || !paper_id) return false;
    return userData.bookmarks.includes(paper_id);
  }, [userData, paper_id]); 

  const reactionType = {
    like: true,
    dislike: false,
    null: null,
  }
 
  const handleReactionMutation = useMutation({
    mutationFn: (reaction: 'like' | 'dislike') => {
      if (!paper_id) throw new Error("Paper ID is required for reaction mutation");
      if (reactionData === reactionType[reaction]) {
        return deleteReaction(paper_id);
      } else {
        return postReaction(paper_id, reaction);
      }
    },
    onMutate: (reaction) => {
      queryClient.cancelQueries({ queryKey: ['articleData', paper_id] });

      const previousArticleData = queryClient.getQueryData(['articleData', paper_id]);
      queryClient.setQueryData(['articleData', paper_id], (old: ArticleData | undefined) => {
        if (!old) return old;
        const updatedData = { ...old };
        if (reactionData === reactionType[reaction]) {
          queryClient.setQueryData(['reactionData', paper_id], null);
        }
        if (reaction === 'like') {
          updatedData.like_count += reactionData === reactionType.like ? -1 : 1;
          if (reactionData === reactionType.dislike) updatedData.dislike_count -= 1;
          queryClient.setQueryData(['reactionData', paper_id], reactionType.like);
        } else if (reaction === 'dislike') {
          updatedData.dislike_count += reactionData === reactionType.dislike ? -1 : 1;
          if (reactionData === reactionType.like) updatedData.like_count -= 1;
          queryClient.setQueryData(['reactionData', paper_id], reactionType.dislike);
        }
        return updatedData;
      });

      return { previousArticleData };
    },
    onError: (_, reaction, context) => {
      queryClient.setQueryData(['articleData', paper_id], context?.previousArticleData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['articleData', paper_id] });
      queryClient.invalidateQueries({ queryKey: ['reactionData', paper_id] });
    },
  });

  const handleClickReaction = async (reaction: 'like' | 'dislike') => {
    await handleReactionMutation.mutateAsync(reaction);
  };

  const handlePostCommentMutation = useMutation({
    mutationFn: (content: string) => {
      if (!paper_id) throw new Error("Paper ID is required for posting comment");
      return postComment(paper_id, content);
    },
    onMutate: async (newCommentContent) => {
      queryClient.cancelQueries({ queryKey: ['commentData', paper_id] });
      const previousComments = queryClient.getQueryData<CommentItemProps[]>(['commentData', paper_id]);
      const newComment: CommentItemProps = {
        id: (comments && comments.length > 0 ? comments[comments.length - 1].id + 1 : 1).toString(),
        profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqXtvUw93BzewwknzouqY0JtoKUPNBDcXbuw&s',
        name: '유이',
        time: '방금 전',
        content: newCommentContent,
        email: '',
        currentUserEmail: '',
        likeCount: 0,
        likedByCurrentUser: false,
        dislikedByCurrentUser: false,
          onDelete: () => {}
      };

      queryClient.setQueryData(['commentData', paper_id], (old: CommentItemProps[] | undefined) => {
        return old ? [...old, newComment] : [newComment];
      });
      return { previousComments };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['commentData', paper_id], context?.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['commentData', paper_id] });
    },
  });

  const addComment = async () => {
    if (commentInput.trim() === '') return;
    await handlePostCommentMutation.mutateAsync(commentInput);
    setCommentInput('');
    commentRef.current?.scrollTo(0, commentRef.current.scrollHeight);
  };

  const updateBookmarkState = (bookmarks: string[], paperId: string) => {
    if (bookmarks.includes(paperId)) {
      return bookmarks.filter(id => id !== paperId);
    } else {
      return [...bookmarks, paperId];
    }
  };

  const handleBookmarkMutation = useMutation({
    mutationFn: () => {
      if(bookmark) {
        return deleteBookmark(paper_id!);
      }
      return postBookmark(paper_id!);
    },
    onMutate: async () => {
      queryClient.cancelQueries({ queryKey: ['userData'] });
      const previousUserData = queryClient.getQueryData(['userData']);
      queryClient.setQueryData(['userData'], (old: any) => {
        if (!old) return old;
        return { ...old, bookmarks: updateBookmarkState(old.bookmarks, paper_id!) };
      });

      return { previousUserData };
    },
    onError: (_, __, context) => {
      // Rollback the user data to its previous state
      queryClient.setQueryData(['userData'], context?.previousUserData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData', paper_id] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    }
  });

  const handleClickBookmark = async () => {
    await handleBookmarkMutation.mutateAsync();
  };

  if (isLoading || contentLoading) {
    return <div>로딩 중...</div>;
  } if (!articleData || !content) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }
  return (
    <Screen>
      <Header />
      <Wrapper>
        <ArticleBox>
          <ArticleTitleBox>
            <Category>{articleData.category}</Category>
            <Title>{articleData.title}</Title>
            <DateBox>
              <DateView>{formatDate(articleData.created)}</DateView>
              <DateView>{formatDate(articleData.modified)}</DateView>
            </DateBox>
            <Editor>AI 뉴스 에디터 작성</Editor>
          </ArticleTitleBox>
          <Line />
          <ContentContainer>
            <ArticleMarkdown content={content!} />
          </ContentContainer>
          <Line />
          <FeedbackBox>
            <ButtonContainer>
              <FeedbackButtonBox>
                <FeedbackTitle>쪼아요</FeedbackTitle>
                <GoodButton $fill={reactionData ? '#F7971D' : '#D9D9D9'} onClick={async () => await handleClickReaction('like')} />
                <FeedbackValue>{articleData.like_count}</FeedbackValue>
              </FeedbackButtonBox>
              <FeedbackButtonBox>
                <FeedbackTitle>시러요</FeedbackTitle>
                <BadButton $fill={reactionData === false ? '#F7971D' : '#D9D9D9'} onClick={async () => await handleClickReaction('dislike')} />
                <FeedbackValue>{articleData.dislike_count}</FeedbackValue>
              </FeedbackButtonBox>
            </ButtonContainer>
          </FeedbackBox>
          <ActionBox>
            <SendButton><ShareSvg />공유하기</SendButton>
            <BookmarkButton
              $fill={bookmark ? '#F7971D1A' : '#8D8D8D1A'}
              $textColor={bookmark ? '#F7971D' : '#7E7E7E'}
              onClick={handleClickBookmark}
              style={{ cursor: "pointer" }}
            >
              <Bookmark $fill={bookmark ? '#F7971D' : '#7E7E7E'} />
              북마크
            </BookmarkButton>
          </ActionBox>
          <Line />
          <CommentBox>
            <ProfileImage src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqXtvUw93BzewwknzouqY0JtoKUPNBDcXbuw&s'} />
            <CommentInput
              placeholder={"댓글을 남겨주세요!"}
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !isComposing) addComment();
              }}
            />
            <CommentAddButton onClick={addComment}>등록</CommentAddButton>
          </CommentBox>
          <CommentLogBox ref={commentRef}>
            {commentData ? (
              commentData.map((comment: any) => (
                <CommentItem
                  key={comment.id}
                  id={comment.id}
                  profile={comment.profile}
                  name={comment.name}
                  time={comment.time}
                  content={comment.content}
                  currentUserEmail={comment.currentUserEmail}
                  email={comment.email}
                  likeCount={comment.likeCount ?? 0}
                  likedByCurrentUser={comment.likedByCurrentUser}
                  dislikedByCurrentUser={comment.dislikedByCurrentUser}
                  onDelete={() => {
                    if (confirm("삭제 하시겠습니까?"))
                      setComments(comments as any[])?.filter(c => c.id !== comment.id);
                  }}
                />
              ))
            ) : (
              <p>댓글을 불러오는 중...</p>
            )}
          </CommentLogBox>
        </ArticleBox>
        <ColBanner />
      </Wrapper>
    </Screen>
  );
}
const Screen = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 0 40px 60px 40px;
`
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  gap: 60px;
`
const ArticleBox = styled.div`
  display: flex;
  width: 100%;
  max-width: 700px;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  flex: 1 0 0;`
const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 60px;
  flex-direction: column;
  justify-content: center;
`
const ArticleTitleBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 14px;
  align-self: stretch;
`
const Category = styled.div`
  color: #F7971D;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 16.8px */
  letter-spacing: -0.14px;
`
const Title = styled.span`
  color: #322F29;
  font-size: 30px;
  font-style: normal;
  font-weight: 800;
  line-height: 36px; /* 120% */
  letter-spacing: -0.6px;
`
const DateBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
`
const DateView = styled.span`
  color: rgba(50, 47, 41, 0.80);
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 14.4px */
  letter-spacing: -0.12px;
`
const Editor = styled.span`
  color: rgba(50, 47, 41, 0.80);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 16.8px */
  letter-spacing: -0.14px;
`
const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #F2F0F0;
`
const FeedbackBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 60px;
`
const FeedbackButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`
const FeedbackTitle = styled.span`
  color: #322F29;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 12px */
`
const FeedbackValue = styled.span`
  color: #322F29;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 18px */
  letter-spacing: -0.36px;
`
const GoodButton = styled(GoodSvg)<{ $fill: string }>`
  path {
    fill: ${({ $fill }) => $fill};
  }
`;

const BadButton = styled(BadSvg)<{ $fill: string }>`
  path {
    fill: ${({ $fill }) => $fill};
}`
const ActionBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 6px;
  @media (max-width: 420px) {
    flex-direction: column;
  }
`
const SendButton  = styled.div`
  display: flex;
  width: 200px;
  padding: 8px 0;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 14px;

  border-radius: 4px;
  border: 1px solid #322F29;
  background: #FFF;

  @media (max-width: 420px) {
    width: 100%;
  }
`
const BookmarkButton = styled.div<{ $fill: string, $textColor: string }>`
  display: flex;
  width: 200px;
  padding: 8px 0;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  background-color: ${({ $fill }) => $fill};
  color: ${({ $textColor }) => $textColor};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 14px */
  @media (max-width: 420px) {
    width: 100%;
  }
`
const Bookmark = styled(BookmarkSvg)<{ $fill: string }>`
  path {
    fill: ${({ $fill }) => $fill};
  }`
const CommentBox = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  align-self: stretch;
`
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  aspect-ratio: 1/1;
  border-radius: 40px;
  border: 1px solid rgba(50, 47, 41, 0.20);
  object-fit: cover;
`
const CommentInput = styled.input`
  display: flex;
  padding: 10px 4px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1 0 0;
  border: none;
  outline: none;
  border-bottom: 1px solid #F7971D;

`
const CommentAddButton = styled.div`
  display: flex;
  padding: 10px 14px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #F7971D;
  color: #FFF;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  &::placeholder{
    color: rgba(50, 47, 41, 0.40);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 22.4px */
  }
  `
const CommentLogBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
`