import styled from "styled-components";
import ArticleMarkdown from "~/components/ArticleMarkdown";
import React, {useEffect, useState, useRef} from "react";
import ColBanner from "~/components/ColBanner";
import Header from "~/components/Header";
import GoodSvg from '~/asset/icon/good.svg?react'
import BadSvg from '~/asset/icon/bad.svg?react'
import ShareSvg from '~/asset/icon/share.svg?react'
import BookmarkSvg from '~/asset/icon/bookmark.svg?react'
import CommentItem from "~/components/CommentItem";

function formatDate(date: Date) {
  return date.toLocaleString("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

interface ArticleProps {
  title: string;
  initialTime: Date;
  fixedTime: Date;
  category: string;
  markdownContent: string;
}

export default function Article() {
  // 좋아요, 싫어요 상태
  const [good, setGood] = useState(false);
  const [goodValue, setGoodValue] = useState(0);
  const [bad, setBad] = useState(false);
  const [badValue, setBadValue] = useState(0);
  const [bookmark, setBookmark] = useState(false);
  // 댓글 리스트 상태 관리
  const [comments, setComments] = useState<{
    id: number;
    profile: string;
    name: string;
    time: string;
    content: string;
    email: string;
    currentEmail: string;
  }[] | null>(null);

  const [articleData, setArticleData] = useState<ArticleProps>({
      title: "DeepSeek-R1: 순수 RL 기반 대형 언어모델의 추론 능력 향상",
      initialTime: new Date('2024-05-12T09:00:00Z'),
      fixedTime: new Date("2024-05-13T14:30:00Z"),
      category: "AI Research",
      markdownContent: "# 📚 Scholub: 지식의 허브를 향하여\n" +
        "---\n" +
        "## 개요\n" +
        "**Scholub**는 \"Scholar\"와 \"Hub\"의 합성어로, 최신 논문을 뉴스 형태로 가공하여 사용자들이 지식을 공유하고 토론할 수 있는 커뮤니티 플랫폼입니다. > *\"연구자의 연구가 대중의 대화로 이어지길 바라며.\"*\n" +
        "---\n" +
        "## 주요 기능 🔍\n" +
        "1. **논문 요약 및 뉴스화**  AI가 최신 논문을 자동 요약하고, 뉴스처럼 가공해 제공합니다.\n" +
        "2. **커뮤니티 토론**  뉴스 형태의 게시물에 댓글과 좋아요 기능으로 활발한 토론을 유도합니다.\n" +
        "3. **맞춤형 추천**  사용자의 관심사에 따라 논문과 뉴스 피드를 개인화합니다.\n" +
        "---\n" +
        "### 기술 스택 💻\n" +
        "- **Frontend**: React, PWA  \n" +
        "- **Backend**: FastAPI, MongoDB  \n" +
        "- **AI 기술**: LLM, 자연어 처리  \n" +
        "- **UX/UI**: 카테고리별 뉴스 게시판, 채팅 인터페이스  \n" +
        "---\n" +
        "### 개발 일정 🗓️\n" +
        "| 월 | 주차 | 주요 작업 |\n" +
        "|---|---|---|\n" +
        "| 4월 | 1~2주차 | 기획서 작성 |\n" +
        "| 4월 | 3~4주차 | 디자인 |\n" +
        "| 5월 | 1~4주차 | 프론트엔드/백엔드 개발 |\n" +
        "| 6월 | 1~4주차 | 테스트 및 버그 수정 |\n" +
        "| 7월 | - | 부가 기능 개발 |\n" +
        "---\n" +
        "### 팀원 역할 👥\n" +
        "- **박찬규**: 백엔드 (API, DB 관리, 크롤러 제작)  \n" +
        "- **설지원**: 프론트엔드 (뉴스 피드, 댓글 기능, 랜딩 페이지)  \n" +
        "- **유채호**: AI (논문 요약, 딥리서치, LLM 챗봇)  \n" +
        "---\n" +
        "### 특장점 🌟\n" +
        "- [ ] 빠른 논문 탐색과 요약\n" +
        "- [ ] 커뮤니티 기반 토론\n" +
        "- [ ] 사용자 친화적 인터페이스\n" +
        "- [ ] AI 기반 개인화 뉴스\n" +
        "---\n" +
        "## 참고 이미지  \n" +
        "![Scholub Concept](https://i.namu.wiki/i/6OwDAUYGGTGzVc0dXzTQ8qEk4qoHf___fOy4XGH5ksiDkCsv1x4XldPjmKwsuIRDy9adqD9QOj0jJqHpTPsiIg.webp)\n" +
        "---\n" +
        "### 코드 예시 👨‍💻\n" +
        "```python\n" +
        "from fastapi import FastAPI\n" +
        "app = FastAPI()\n" +
        "@app.get(\"/news\")\n" +
        "async def get_news():\n" +
        "    return {\"message\": \"최신 논문 뉴스 피드\"}\n" +
        "```\n" +
        "---\n" +
        "### 인용구 📜\n" +
        "> \"지식을 나누는 일은 세상을 바꾸는 첫걸음이다.\" - 알베르트 아인슈타인\n" +
        "---\n" +
        "### 링크 🔗\n" +
        "- 공식 홈페이지: [Scholub](https://scholub.com)\n" +
        "- 연락처: [이메일](mailto:contact@scholub.com)\n" +
        "---\n" +
        "### 참고 자료 📑\n" +
        "- ~~논문 전체 열람이 필요하다면 arXiv 사용을 권장드립니다.~~  \n" +
        "- 기존 플랫폼과의 차별화 포인트를 꼭 참고하세요!\n",
    });

  // 댓글 비동기 로딩 처리
  const commentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let loaded = false;
    const observer = new window.IntersectionObserver((entries) => {
      if (!loaded && entries[0].isIntersecting) {
        setComments([
          // TODO: 받아온 댓글 넣기
          { id: 1, profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqXtvUw93BzewwknzouqY0JtoKUPNBDcXbuw&s', name: '유이', time: '1시간 전', content: '와웅', email: 'hong@example.com', currentEmail: 'hong@example.com' },
          { id: 2, profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREGFq17Q8ajbYOPZszUsWuTEKO1MyTIKiirQ&s', name: '프리렌', time: '2시간 전', content: '힘멜이라면 분명 그렇게 말했을거야.', email: 'kim@example.com', currentEmail: 'current@example.com' },
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
              <DateView>{formatDate(articleData.initialTime)}</DateView>
              <DateView>{formatDate(articleData.fixedTime)}</DateView>
            </DateBox>
            <Editor>AI 뉴스 에디터 작성</Editor>
          </ArticleTitleBox>
          <Line/>
          <ContentContainer>
            {/*TODO: 마크다운 형식, 코드박스 디자인*/}
            <ArticleMarkdown content={articleData.markdownContent} />
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
            <CommentInput placeholder={"댓글을 남겨주세요!"}/>
            <CommentAddButton>등록</CommentAddButton>
          </CommentBox>
          <CommentLogBox ref={commentRef}>
            {comments ? (
              comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  profile={comment.profile}
                  name={comment.name}
                  time={comment.time}
                  content={comment.content}
                  currentUserEmail={comment.currentEmail}
                  email={comment.email}
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
  align-items: flex-start;
  gap: 6px;
`
const SendButton  = styled.div`
  display: flex;
  width: 200px;
  padding: 8px 0;
  justify-content: center;
  align-items: center;
  gap: 4px;

  border-radius: 4px;
  border: 1px solid #322F29;
  background: #FFF;
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
