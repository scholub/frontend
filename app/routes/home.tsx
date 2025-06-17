import styled from "styled-components";
import Header from "~/components/Header";
import RowBanner from "~/components/RowBanner";
import ArticleUnit, {type ArticleListProps} from "~/components/ArticleUnit";
import { useEffect, useState } from "react";



export function meta() {
  return [
    { title: "Scholub" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const  [articles, setArticles] = useState<ArticleListProps[]>([]);

  useEffect(() => {
    fetch("https://scholub.misile.xyz/post")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  return <Screen>
    <Header/>
    <RowBanner/>
    <ArticleBoardContainer>
      {articles.map((article, i) => (
        <ArticleUnit
          key={i}
          paper_id={article.paper_id}
          title={article.title}
          description={article.description}
          imgUrl={`https://scholub.misile.xyz/files/post/${article.paper_id}/IMAGE_PLACEHOLDER_URL_1.png`}
          category={article.category}
          tag={article.tag}
          created={article.created}
          modified={article.modified}
          like_count={article.like_count}
          dislike_count={article.dislike_count}
        />
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
