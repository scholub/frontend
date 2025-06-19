import styled from "styled-components";
import Header from "~/components/Header";
import RowBanner from "~/components/RowBanner";
import ChipGroup from "~/components/ChipGroup";
import ArticleCard, { type ArticleCardProps } from "~/components/ArticleCard";

import { useEffect, useState } from "react";


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
    const [articles, setArticles] = useState<ArticleCardProps[]>([]);

    useEffect(() => {
        fetch("https://scholub.misile.xyz/post")
            .then((response) => response.json())
            .then((data) => {
                setArticles([
                    {
                        paper_id: data[0].paper_id,
                        title: data[0].title,
                        subTitle: data[0].description,
                        imgUrl: `https://scholub.misile.xyz/files/post/${data[0].paper_id}/IMAGE_PLACEHOLDER_URL_1.png`,
                        category: data[0].category,
                    },
                ]);
            })
            .catch((error) => {
                console.error("Error fetching articles:", error);
            });
    }, []);

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
                            paper_id={article.paper_id}
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
//   height: 100dvh;
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

