import styled from "styled-components";
import ArticleMarkdown from "~/components/ArticleMarkdown";
import {useEffect, useState, useRef} from "react";
import ColBanner from "~/components/ColBanner";
import Header from "~/components/Header";
import GoodSvg from '~/asset/icon/good.svg?react'
import BadSvg from '~/asset/icon/bad.svg?react'
import ShareSvg from '~/asset/icon/share.svg?react'
import BookmarkSvg from '~/asset/icon/bookmark.svg?react'
import CommentItem, {type CommentItemProps} from "~/components/CommentItem";
import {useParams} from "react-router";

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
  const { paper_id } = useParams<{ paper_id: string }>();
  const [articleData, setArticleData] = useState<ArticleData>({
    title: '',
    description: '',
    paper_id: '',
    category: '',
    tag: '',
    created: new Date(),
    modified: new Date(),
    like_count: 0,
    dislike_count: 0,
  });
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (!paper_id) return;
    fetch(`https://scholub.misile.xyz/post/${paper_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        fetch(`https://scholub.misile.xyz/files/post/${paper_id}/post.md`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((markdown) => {
              const basePath = `https://scholub.misile.xyz/files/post/${paper_id}`;
              const updatedMarkdown = markdown.replace(
                /!\[image\]\(\/files\/post\/[^/]+\/([^)]+)\)/g,
                (_, imagePath) => `![image](${basePath}/${imagePath})`
              );
              setContent('리에서 **토큰화(tokenization)**는 \n' +updatedMarkdown);
          })
          .catch((error) => {
            console.error("Error fetching markdown content:", error);
          });

        setArticleData({
          title: data.title,
          description: data.description,
          paper_id: data.paper_id,
          category: data.category,
          tag: data.tag,
          created: data.created,
          modified: data.modified,
          like_count: data.like_count || 0,
          dislike_count: data.dislike_count || 0,
        });
      })
      .catch((error) => {
        console.error("Error fetching article data:", error);
      });

  }, [paper_id]);
  
  // 좋아요, 싫어요 상태
  const [good, setGood] = useState(false);
  const [goodValue, setGoodValue] = useState(0);
  const [bad, setBad] = useState(false);
  const [badValue, setBadValue] = useState(0);
  const [bookmark, setBookmark] = useState(false);
  // 댓글 리스트 상태 관리
  const [comments, setComments] = useState<CommentItemProps[] | null>(null);
  // 댓글 입력값 상태
  const [commentInput, setCommentInput] = useState('');
  // 한글/IME 입력 조합 상태
  const [isComposing, setIsComposing] = useState(false);
  // 댓글 추가 함수
  const addComment = () => {
    const content = commentInput.trim();
    if (!content) return;
    const newId = comments && comments.length > 0 ? comments[comments.length - 1].id + 1 : '1';
    const newComment: CommentItemProps = {
      id: newId,
      profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqXtvUw93BzewwknzouqY0JtoKUPNBDcXbuw&s',
      name: '유이',
      time: '방금 전',
      content,
      email: 'current@example.com',
      currentUserEmail: 'current@example.com',
      likeCount: 0,
      likedByCurrentUser: false,
      dislikedByCurrentUser: false,
      onDelete: () => {},
    };
    setComments(prev => prev ? [...prev, newComment] : [newComment]);
    setCommentInput('');
  };

  // 댓글 비동기 로딩 처리
  const commentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let loaded = false;
    const observer = new window.IntersectionObserver((entries) => {
      if (!loaded && entries[0].isIntersecting) {
        fetch(`https://scholub.misile.xyz/${paper_id}/comment`)
          .then(response => response.json())
          .then(data => {
            console.log("댓글 데이터:", data);
          })
          .catch(error => {
            console.error("Error fetching comments:", error);
          });

        setComments([
          //임시 데이터
          {
            id: '2',
            profile: 'https://randomuser.me/api/portraits/women/44.jpg',
            name: '김영희',
            time: '30분 전',
            content: '공감돼요. 더 자주 업데이트 되면 좋겠어요!',
            likeCount: 5,
            email: 'kim@example.com',
            currentUserEmail: 'current@example.com',
            likedByCurrentUser: false,
            dislikedByCurrentUser: false,
            onDelete: () => {}
          },
          {
            id: '3',
            profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqXtvUw93BzewwknzouqY0JtoKUPNBDcXbuw&s',
            name: '유이',
            time: '방금 전',
            content: '이 부분에 대해 좀 더 설명해주실 수 있나요?',
            likeCount: 99999999999,
            email: 'current@example.com',
            currentUserEmail: 'current@example.com',
            likedByCurrentUser: false,
            dislikedByCurrentUser: false,
            onDelete: () => {}
          }
        ]);
        loaded = true;
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (commentRef.current) observer.observe(commentRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (good) {
      setGoodValue(prev => prev + 1);
      if (bad) {
        setBad(false);
        setBadValue(prev => Math.max(0, prev - 1));
      }
    } else {
      setGoodValue(prev => Math.max(0, prev - 1));
    }
  }, [good]);

  useEffect(() => {
    if (bad) {
      setBadValue(prev => prev + 1);
      if (good) {
        setGood(false);
        setGoodValue(prev => Math.max(0, prev - 1));
      }
    } else {
      setBadValue(prev => Math.max(0, prev - 1));
    }
  }, [bad]);

  return (
    <Screen>
      <Header/>
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
          <Line/>
          <ContentContainer>
            <ArticleMarkdown content={content} />
          </ContentContainer>
          <Line/>
          <FeedbackBox>
            <ButtonContainer>
              <FeedbackButtonBox>
                <FeedbackTitle>쪼아요</FeedbackTitle>
                <GoodButton $fill={good ? '#F7971D' : '#D9D9D9'} onClick={() => setGood(!good)}/>
                <FeedbackValue>{goodValue}</FeedbackValue>
              </FeedbackButtonBox>
              <FeedbackButtonBox>
                <FeedbackTitle>시러요</FeedbackTitle>
                <BadButton $fill={bad ? '#F7971D' : '#D9D9D9'} onClick={() => setBad(!bad)}/>
                <FeedbackValue>{badValue}</FeedbackValue>
              </FeedbackButtonBox>
            </ButtonContainer>
          </FeedbackBox>
          <ActionBox>
            <SendButton><ShareSvg/>공유하기</SendButton>
            <BookmarkButton
              $fill={bookmark ? '#F7971D1A' : '#8D8D8D1A'}
              $textColor={bookmark ? '#F7971D' : '#7E7E7E'}
              onClick={() => setBookmark(!bookmark)}
              style={{ cursor: "pointer" }}
            >
              <Bookmark $fill={bookmark ? '#F7971D' : '#7E7E7E'} />
              북마크
            </BookmarkButton>
          </ActionBox>
          <Line/>
          <CommentBox>
            <ProfileImage src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqXtvUw93BzewwknzouqY0JtoKUPNBDcXbuw&s'}/>
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
            {comments ? (
              comments.map((comment) => (
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
                    if(confirm("삭제 하시겠습니까?"))
                      setComments(comments.filter(c => c.id !== comment.id));
                  }}
                />
              ))
            ) : (
              <p>댓글을 불러오는 중...</p>
            )}
          </CommentLogBox>
        </ArticleBox>
        <ColBanner/>
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
