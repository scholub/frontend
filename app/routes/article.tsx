import styled from "styled-components";
import ArticleMarkdown from "~/components/ArticleMarkdown";
import React from "react";
import ColBanner from "~/components/ColBanner";
import Header from "~/components/Header";

const exampleArticle: ArticleProps = {
  title: "DeepSeek-R1: 순수 RL 기반 LLM 추론 강화",
  initialTime: "2024-05-12T09:00:00Z",
  fixedTime: "2024-05-13T14:30:00Z",
  cartegory: "AI Research",
  markdownContent: `
### 도입
최신 대형 언어모델(LLM)은 **추론 능력** 강화를 위한 다양한 기법이 제안되어 왔지만, 대부분은 방대한 지도학습 데이터에 의존합니다. DeepSeek 연구팀은 arXiv에 올린 논문 **‘DeepSeek-R1’**을 통해, 지도학습 없이도 순수 **강화학습(RL)** 만으로 고급 추론 행동이 자연스럽게 등장함을 보였습니다. 더 나아가 **Cold-Start 데이터**와 **다단계 학습 파이프라인**을 도입해 가독성과 성능을 동시에 잡은 점이 주목됩니다.

![image](https://source.unsplash.com/600x300/?ai)

### 기술 설명
DeepSeek-R1은 두 가지 핵심 단계로 구성됩니다. 우선 **DeepSeek-R1-Zero** 단계에서 완전한 RL만으로 기본 모델을 훈련해, **Chain-of-Thought(CoT)** 기반 추론 패턴을 스스로 학습합니다. 이후 **Cold-Start SFT**로 수천 개의 고품질 CoT 예시를 이용해 초기 모델을 미세조정한 뒤, 다시 **추론 지향 RL**과 **Rejection Sampling + SFT**, 그리고 **모든 시나리오를 아우르는 RL**을 순차적으로 수행합니다.

- Cold-Start 데이터 수집 및 SFT 미세조정
- 추론 지향 대규모 강화학습
- Rejection Sampling 기반 SFT 재학습
- 일반․추론 시나리오 통합 RL

![image](https://source.unsplash.com/600x300/?robot)

### 기술적 의의 및 전망
이 논문은 **순수 RL**만으로 LLM 추론 능력을 확보할 수 있음을 처음으로 검증했으며, **Cold-Start+다단계 학습** 파이프라인의 실용적 가이드라인을 제시했습니다. 또한 강력한 소형 증류 모델을 공개해 연구·산업계 확산을 꾀합니다. 앞으로는 다국어 혼합 현상 해결, 함수 호출·멀티턴·JSON 출력 등 **일반화 능력** 강화, 소프트웨어 엔지니어링 벤치마크 대규모 RL 적용 등이 기대됩니다.

![image](https://source.unsplash.com/600x300/?future)
`
};


interface ArticleProps {
  title: string;
  initialTime: string;
  fixedTime: string;
  cartegory: string;
  markdownContent: string;
}

export default function Article(props: ArticleProps) {
  const exampleArticle: ArticleProps = {
    title: "DeepSeek-R1: 순수 RL 기반 LLM 추론 강화",
    initialTime: "2024-05-12T09:00:00Z",
    fixedTime: "2024-05-13T14:30:00Z",
    cartegory: "AI Research",
    markdownContent: `
### 도입
최신 대형 언어모델(LLM)은 **추론 능력** 강화를 위한 다양한 기법이 제안되어 왔지만, 대부분은 방대한 지도학습 데이터에 의존합니다. DeepSeek 연구팀은 arXiv에 올린 논문 **‘DeepSeek-R1’**을 통해, 지도학습 없이도 순수 **강화학습(RL)** 만으로 고급 추론 행동이 자연스럽게 등장함을 보였습니다. 더 나아가 **Cold-Start 데이터**와 **다단계 학습 파이프라인**을 도입해 가독성과 성능을 동시에 잡은 점이 주목됩니다.

![image](https://source.unsplash.com/600x300/?ai)

### 기술 설명
DeepSeek-R1은 두 가지 핵심 단계로 구성됩니다. 우선 **DeepSeek-R1-Zero** 단계에서 완전한 RL만으로 기본 모델을 훈련해, **Chain-of-Thought(CoT)** 기반 추론 패턴을 스스로 학습합니다. 이후 **Cold-Start SFT**로 수천 개의 고품질 CoT 예시를 이용해 초기 모델을 미세조정한 뒤, 다시 **추론 지향 RL**과 **Rejection Sampling + SFT**, 그리고 **모든 시나리오를 아우르는 RL**을 순차적으로 수행합니다.

- Cold-Start 데이터 수집 및 SFT 미세조정
- 추론 지향 대규모 강화학습
- Rejection Sampling 기반 SFT 재학습
- 일반․추론 시나리오 통합 RL

![image](https://source.unsplash.com/600x300/?robot)

### 기술적 의의 및 전망
이 논문은 **순수 RL**만으로 LLM 추론 능력을 확보할 수 있음을 처음으로 검증했으며, **Cold-Start+다단계 학습** 파이프라인의 실용적 가이드라인을 제시했습니다. 또한 강력한 소형 증류 모델을 공개해 연구·산업계 확산을 꾀합니다. 앞으로는 다국어 혼합 현상 해결, 함수 호출·멀티턴·JSON 출력 등 **일반화 능력** 강화, 소프트웨어 엔지니어링 벤치마크 대규모 RL 적용 등이 기대됩니다.

![image](https://source.unsplash.com/600x300/?future)
`
  };

  return (
    <Screen>
      <Header/>
      <ArticleTitleBox>
        <Category>{props.cartegory}</Category>
        <Title>{props.title}</Title>
        <DateBox>
          <Date>{props.initialTime}</Date>
          <Date>{props.fixedTime}</Date>
        </DateBox>
        <Editor>AI 뉴스 에디터 작성</Editor>
      </ArticleTitleBox>
      <ContentContainer>
        <ArticleMarkdown content={props.markdownContent} />
        <ColBanner/>
      </ContentContainer>
    </Screen>
  );
}
const Screen = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 0 40px 60px 40px;
`
const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 60px;
  flex-direction: row;
  justify-content: center;
`
const ArticleTitleBox = styled.div`
  display: flex;
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
const Date = styled.span`
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
