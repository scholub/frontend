import styled from "styled-components";
import ArticleMarkdown from "~/components/ArticleMarkdown";
import React from "react";
import ColBanner from "~/components/ColBanner";
import Header from "~/components/Header";

interface ArticleProps {
  title: string;
  initialTime: Date;
  fixedTime: Date;
  category: string;
  markdownContent: string;
}

function formatDate(date: Date) {
  return date.toLocaleString("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function Article(props: ArticleProps) {
  const exampleArticle: ArticleProps = {
    title: "DeepSeek-R1: 순수 RL 기반 대형 언어모델의 추론 능력 향상",
    initialTime: new Date('2024-05-12T09:00:00Z'),
    fixedTime: new Date("2024-05-13T14:30:00Z"),
    category: "AI Research",
    markdownContent: "### 도입\\n최신 대형 언어모델(LLM)은 **추론 능력** 강화를 위한 다양한 기법이 제안되어 왔지만, 대부분은 방대한 지도학습 데이터에 의존합니다. DeepSeek 연구팀은 arXiv에 올린 논문 **‘DeepSeek-R1’**을 통해, 지도학습 없이도 순수 **강화학습(RL)** 만으로 고급 추론 행동이 자연스럽게 등장함을 보였습니다. 더 나아가 **Cold-Start 데이터**와 **다단계 학습 파이프라인**을 도입해 가독성과 성능을 동시에 잡은 점이 주목됩니다.\\n\\n![image](IMAGE_PLACEHOLDER_URL_1)\\n\\n### 기술 설명\\nDeepSeek-R1은 두 가지 핵심 단계로 구성됩니다. 우선 **DeepSeek-R1-Zero** 단계에서 완전한 RL만으로 기본 모델을 훈련해, **Chain-of-Thought(CoT)** 기반 추론 패턴을 스스로 학습합니다. 이후 **Cold-Start SFT**로 수천 개의 고품질 CoT 예시를 이용해 초기 모델을 미세조정한 뒤, 다시 **추론 지향 RL**과 **Rejection Sampling + SFT**, 그리고 **모든 시나리오를 아우르는 RL**을 순차적으로 수행합니다.\\n\\n- Cold-Start 데이터 수집 및 SFT 미세조정\\n- 추론 지향 대규모 강화학습\\n- Rejection Sampling 기반 SFT 재학습\\n- 일반․추론 시나리오 통합 RL\\n\\n![image](IMAGE_PLACEHOLDER_URL_2)\\n\\n### 세부 기술·실험 결과\\nDeepSeek-R1-Zero는 AIME 2024 벤치마크에서 **초기 15.6% → 71.0%** pass@1으로 비약적 성능 향상을 보였으며, 다수결 투표 시 **86.7%**로 OpenAI-o1-0912를 뛰어넘었습니다. 최종 모델 DeepSeek-R1은 AIME 2024에서 **79.8%**, MATH-500에서 **97.3%**, Codeforces 상위 **96.3%** 등 주요 수학·코딩·지식 벤치마크에서 OpenAI-o1-1217와 유사한 성능을 달성했습니다. MMLU, GPQA Diamond 등 지식형 평가에서도 평균 **90%** 이상의 결과를 보여, 범용적 강화를 입증했습니다.\\n\\n![image](IMAGE_PLACEHOLDER_URL_3)\\n\\n### 소형 모델 증류\\nDeepSeek-R1의 추론 데이터를 활용해 Qwen·Llama 계열 1.5B부터 70B까지 **6개 크기 모델**을 증류했습니다. 증류된 14B 모델은 AIME에서 **69.7%**, MATH-500에서 **93.9%**를 기록해 기존 공개 소형 모델을 모두 압도했습니다. 특히 32B 모델은 **72.6%** AIME pass@1으로 o1-mini에 육박하는 성능을 보였고, 증류만으로도 소형 모델의 추론 능력을 크게 끌어올릴 수 있음을 확인했습니다.\\n\\n- DeepSeek-R1-Distill-Qwen-7B: AIME 55.5%, MATH-500 92.8%\\n- DeepSeek-R1-Distill-Qwen-14B: AIME 69.7%, MATH-500 93.9%\\n- DeepSeek-R1-Distill-Qwen-32B: AIME 72.6%, MATH-500 94.3%\\n\\n![image](IMAGE_PLACEHOLDER_URL_4)\\n\\n### 기술적 의의 및 전망\\n이 논문은 **순수 RL**만으로 LLM 추론 능력을 확보할 수 있음을 처음으로 검증했으며, **Cold-Start+다단계 학습** 파이프라인의 실용적 가이드라인을 제시했습니다. 또한 강력한 소형 증류 모델을 공개해 연구·산업계 확산을 꾀합니다. 앞으로는 다국어 혼합 현상 해결, 함수 호출·멀티턴·JSON 출력 등 **일반화 능력** 강화, 소프트웨어 엔지니어링 벤치마크 대규모 RL 적용 등이 기대됩니다.\\n\\n![image](IMAGE_PLACEHOLDER_URL_5)",
  };

  return (
    <Screen>
      <Header/>
      <Wrapper>
        <ArticleBox>
          <ArticleTitleBox>
            {/*<Category>{props.cartegory}</Category>*/}
            {/*<Title>{props.title}</Title>*/}
            {/*<DateBox>*/}
            {/*  <DateView>{props.initialTime}</DateView>*/}
            {/*  <DateView>{props.fixedTime}</DateView>*/}
            <Category>{exampleArticle.category}</Category>
            <Title>{exampleArticle.title}</Title>
            <DateBox>
              <DateView>{formatDate(exampleArticle.initialTime)}</DateView>
              <DateView>{formatDate(exampleArticle.fixedTime)}</DateView>
            </DateBox>
            <Editor>AI 뉴스 에디터 작성</Editor>
          </ArticleTitleBox>
          <Line/>
          <ContentContainer>
            {/*<ArticleMarkdown content={props.markdownContent} />*/}
            {/*TODO: 마크다운 형식, 코드박스 디자인*/}
            <ArticleMarkdown content={exampleArticle.markdownContent} />
          </ContentContainer>
          <Line/>
        {/* TODO: 좋아요, 댓글, 공유하기, 북마크, */}
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
  height: 5px;
  width: 100%;
  stroke: #666666;
`
//TODO: 외않되
