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
  const  [likeArticles, setLikeArticles] = useState<ArticleListProps[]>([]);
  const  [recommendArticles, setRecommendArticles] = useState<ArticleListProps[]>([]);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    fetch("https://scholub.misile.xyz/post")  
      .then((response) => response.json())
      .then((data) => {
        setLikeArticles([...data].reverse());
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      fetch("https://scholub.misile.xyz/posts/recommend", {
        method: "GET",
        headers: {
          "token": token
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setRecommendArticles([...data].reverse());
        })
        .catch((error) => {
          console.error("Error fetching articles:", error);
        });
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      fetch("https://scholub.misile.xyz/user/verify", {
        method: "GET",
        headers: {
          "token": token
        }
      })
        .then((response) => {
          if (response.status === 200) {
            console.log("Token verification successful");
            setIsVerified(true);
          } else {
            console.log("Token verification failed");
            setIsVerified(false);
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
        });
    }
  }, []);



  return <Screen>
    <Header/>
    <RowBanner />

    <ArticleRow>
      <ArticleBoadrTitle>🌟 오늘의 인기 논문!</ArticleBoadrTitle>
      <ArticleBoardContainer>
        {likeArticles.map((likeArticles, i) => (
          <ArticleUnit
            key={i}
            paper_id={likeArticles.paper_id}
            title={likeArticles.title}
            description={likeArticles.description}
            imgUrl={`https://scholub.misile.xyz/files/post/${likeArticles.paper_id}/IMAGE_PLACEHOLDER_URL_1.png`}
            category={likeArticles.category}
            tag={likeArticles.tag}
            created={likeArticles.created}
            modified={likeArticles.modified}
            like_count={likeArticles.like_count}
            dislike_count={likeArticles.dislike_count}
          />
        ))}
      </ArticleBoardContainer>
    </ArticleRow>
    {isVerified && (
    <ArticleRow>
      <ArticleBoadrTitle>😋 맞춤 논문 추천</ArticleBoadrTitle>
      <ArticleBoardContainer>
        {recommendArticles.slice(0,4).map((recommendArticles, i) => (
          <ArticleUnit
            key={i}
            paper_id={recommendArticles.paper_id}
            title={recommendArticles.title}
            description={recommendArticles.description}
            imgUrl={`https://scholub.misile.xyz/files/post/${recommendArticles.paper_id}/IMAGE_PLACEHOLDER_URL_1.png`}
            category={recommendArticles.category}
            tag={recommendArticles.tag}
            created={recommendArticles.created}
            modified={recommendArticles.modified}
            like_count={recommendArticles.like_count}
            dislike_count={recommendArticles.dislike_count}
          />
        ))}
      </ArticleBoardContainer>
    </ArticleRow>
    )}
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

const ArticleBoadrTitle = styled.h1`
  margin: 0;
  color: #322F29;
  font-family: NanumSquareRound;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px; /* 138.462% */
  letter-spacing: -0.52px;
`;

const ArticleRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;
