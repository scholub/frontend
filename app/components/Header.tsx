import styled from "styled-components";
import LogoSvg from "../asset/icon/logo.svg?react";
import SearchSvg from "../asset/icon/search.svg?react";
import MenuLineSvg from "../asset/icon/menuLine.svg?react";

export default function Header() {
    return (
        <HeaderContainer>
            <SearchBarContainer>
                <a href={"/"}><LogoSvg/></a>
                <SearchBarContainer>
                    <SearchBar>
                        <SearchBarInput placeholder={'관심 있는 연구를 검색해보세요!'}/>
                        <SearchBarButton><SearchSvg/></SearchBarButton>
                    </SearchBar>
                </SearchBarContainer>
            </SearchBarContainer>
            <NavBar>
                <MenuContainer>
                    <MenuMain href={''}>최신 연구</MenuMain>
                    <MenuMain href={''}>인기 연구</MenuMain>
                    <MenuMain href={''}>기사 및 칼럼</MenuMain>
                    <MenuMain href={''}>상세 검색</MenuMain>
                    <MenuLineSvg/>
                    <MenuSub href={''}>컴퓨터 과학</MenuSub>
                    <MenuSub href={''}>네트워크 및 통신</MenuSub>
                    <MenuSub href={''}>인공지능</MenuSub>
                    <MenuSub href={''}>데이터 과학 </MenuSub>
                </MenuContainer>
                <AuthContainer>
                    <LoginButton href={''}>로그인</LoginButton>
                    <SignInButton href={''}>회원가입</SignInButton>
                </AuthContainer>
            </NavBar>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: black solid 1px;
  border-bottom-color: #DDDDDD;
  margin-top: 20px;
`
const SearchBarContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 600px;
    justify-content: center;
    align-items: center;
    gap: 30px;
    flex-direction: row;
    height: 44px;
    padding: 8px 20px;
`
const SearchBar = styled.div`
    display: flex;
    width: 100%;
    padding: 0;
    gap: 0;
    margin: 0;
    flex-direction: row;
`
const SearchBarInput = styled.input`
    color: #000;
    text-align: start;
    font-family: NanumSquareRound;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.14px;
    &::placeholder{
        color: rgba(50, 47, 41, 0.30);
    }

    display: flex;
    width: 100%;
    align-items: center;
    border-radius: 30px 0px 0px 30px;
    border: 1px solid #F7971D;
    padding: 8px 20px;
    gap: 10px;
    flex: 1 0 0;
`
const SearchBarButton = styled.div`
    display: flex;
    padding: 8px 16px 8px 8px;
    align-items: center;
    border-radius: 0px 30px 30px 0px;
    background: #F7971D;
`

const NavBar = styled.div`
    display: flex;
    width: 100%;
    max-width: 1200px;
    padding: 21px 0px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    align-self: stretch;
`
const MenuContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 36px;
`
const MenuMain = styled.a`
    text-decoration: none;
    color: #322F29;
    text-align: center;
    font-family: NanumSquareRound;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 26px; /* 162.5% */
    letter-spacing: -0.32px;
`
const MenuSub = styled.a`
    text-decoration: none;
    color: rgba(50, 47, 41, 0.80);
    text-align: center;
    font-family: NanumSquareRound;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px; /* 162.5% */
    letter-spacing: -0.32px;
`
const AuthContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`
const LoginButton = styled.a`
    text-decoration: none;
    color: #322F29;
    text-align: center;
    font-family: NanumSquareRound;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.14px;
`
const SignInButton = styled.a`
    text-decoration: none;
    color: #322F29;
    text-align: center;
    font-family: NanumSquareRound;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.14px;
`
