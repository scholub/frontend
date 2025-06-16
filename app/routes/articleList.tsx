import styled from "styled-components";
import Header from "~/components/Header";
import RowBanner from "~/components/RowBanner";
import ChipGroup from "~/components/ChipGroup";
import ArticleCard from "~/components/ArticleCard";

import { useState } from "react";


export default function ArticleList() {
    const [selectedChips, setSelectedChips] = useState<string[]>([]);

    const category: string = "인공지능";
    const subCategories: string[] = [
        "머신러닝",
        "강화학습",
        "컴퓨터비전",
        "NLP·LLM",
        "생성 모델",
        "XAI"
    ];
    const articles = [
        {
            title: "구글 브레인 연구팀, RNN 없는 번역 모델 제안… “영어-독일어 번역 성능 향상”",
            subTitle: "대규모 언어 모델 기반 논문 요약",
            imgUrl: "https://place-hold.it/400x300/fff/005/000?text=Greeting!&fontsize=40",
            category: "인공지능 > 딥러닝, NLP·LLM"
        },
        {
            title: "AI 요약 기술의 현재",
            subTitle: "대규모 언어 모델 기반 논문 요약",
            imgUrl: "https://place-hold.it/400x300/fff/005/000?text=Greeting!&fontsize=40",
            category: "인공지능 > 딥러닝, NLP·LLM"
        },
        {
            title: "AI 요약 기술의 현재",
            subTitle: "대규모 언어 모델 기반 논문 요약",
            imgUrl: "https://place-hold.it/400x300/fff/005/000?text=Greeting!&fontsize=40",
            category: "인공지능 > 딥러닝, NLP·LLM"
        }
    ];

    return (
        <Screen>
            <Header/>
            <RowBanner/>
            <ArticleBoardContainer>
                <ArticleBorderHeadContainer>
                    <ArticleBorderTitle>{category}</ArticleBorderTitle>
                    <ChipGroup
                        options={subCategories}
                        selectedList={selectedChips}
                        onChange={setSelectedChips}
                    />
                </ArticleBorderHeadContainer>
                <span style={{ height: "1px", alignSelf: "stretch", borderBottom: "1px solid #DDD"}} />
                {articles.map((article, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "20px",
                            alignSelf: "stretch"
                        }}
                    >
                        <ArticleCard
                            title={article.title}
                            subTitle={article.subTitle}
                            imgUrl={article.imgUrl}
                            category={article.category}
                        />
                        <span style={{ display: "block", height: "0.5px", width: "100%", backgroundColor: "rgba(221, 221, 221, 0.50)" }} />
                    </div>
                ))}
            </ArticleBoardContainer>
        </Screen>
    )
	
};

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
    display: flex;
    max-width: 1200px;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    align-self: stretch;
`;

const ArticleBorderHeadContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 30px;
    align-self: stretch;
`;

const ArticleBorderTitle = styled.h1`
    color: #322F29;
    font-family: NanumSquareRound;
    margin: 0;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px; /* 150% */
    letter-spacing: -0.48px;
`;

