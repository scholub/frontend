import styled from "styled-components";
import Header from "~/components/Header";
import RowBanner from "~/components/RowBanner";


const ArticleList = () => {
    return (
        <Screen>
            <Header/>
            <RowBanner/>
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