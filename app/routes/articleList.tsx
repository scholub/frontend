import styled from "styled-components";
import Header from "~/components/Header";
import Chip from "~/components/Chip";
import RowBanner from "~/components/RowBanner";


const ArticleList = () => {
    return (
        <Screen>
            <Header/>
            <RowBanner/>
            <ArticleBoardContainer>
                <ArticleBorderHeadContainer>
                    <ArticleBorderTitle>최신 연구 논문</ArticleBorderTitle>
                    <Chip label="AI"/>
                </ArticleBorderHeadContainer>
            </ArticleBoardContainer>
        </Screen>

    )
	
};

export default ArticleList;

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
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px; /* 150% */
    letter-spacing: -0.48px;
`;
