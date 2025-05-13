import styled from "styled-components";
import Header from "~/components/Header";
import Banner from "~/components/Banner";
import ArticleUnit, {type ArticleListProps} from "~/components/ArticleUnit";

export function meta() {
  return [
    { title: "Scholub" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const articles: ArticleListProps[] = [
    {
      title: "AI 요약 기술의 현재",
      subTitle: "대규모 언어 모델 기반 논문 요약",
      imgUrl: "https://source.unsplash.com/400x300/?ai,technology",
      category: "AI"
    },
    {
      title: "양자컴퓨팅 논문 요약",
      subTitle: "양자 오버헤드 최적화에 대한 최신 연구",
      imgUrl: "https://source.unsplash.com/400x300/?quantum,science",
      category: "Quantum"
    },
    {
      title: "의료 인공지능의 발전",
      subTitle: "AI 진단 도구의 정확성과 적용사례 분석",
      imgUrl: "https://source.unsplash.com/400x300/?health,ai",
      category: "Medical"
    },
    {
      title: "자연어처리와 한국어",
      subTitle: "한국어 코퍼스를 활용한 LLM 훈련",
      imgUrl: "https://source.unsplash.com/400x300/?nlp,korean",
      category: "NLP"
    },
    {
      title: "로보틱스와 자율주행",
      subTitle: "센서 융합 기반 주행 안정성 향상 연구",
      imgUrl: "https://source.unsplash.com/400x300/?robot,autonomous",
      category: "Robotics"
    },
  ];


  return <Screen>
    <Header/>
    <Banner/>
    <ArticleBoardContainer>
      {articles.map((article, i) => (
        <ArticleUnit title={article.title} subTitle={article.subTitle} imgUrl={article.imgUrl} category={article.category}/>
      ))}
    </ArticleBoardContainer>
  </Screen>;
}

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100dvh;
  width: 100%;
  max-width: 1200px;
`
const ArticleBoardContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(273px, 1fr));
  gap: 50px 10px;
`
