import styled from "styled-components";
import LogoTextSvg from "../asset/icon/logoText.svg?react";
import LogoIcon from "../asset/icon/logoIcon.svg?react";
import SearchSvg from "../asset/icon/search.svg?react";
import MenuLineSvg from "../asset/icon/menuLine.svg?react";
import MenuButtonSvg from "../asset/icon/menu.svg?react";
import { useEffect, useState } from "react";
import NavMenu from "~/components/NavMenu";
import { getToken, removeToken } from "../apis/utils";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

interface HeaderProps {
  thresholdWidth?: number;
}

export default function Header(props: HeaderProps) {
  const width = useWindowWidth();
  const [isMobile, setIsMobile] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainMenu = [
    { name: "최신 연구", href: "" },
    { name: "인기 연구", href: "" },
    { name: "기사 및 칼럼", href: "" },
    { name: "상세 검색", href: "" },
  ];

  const subMenu = [
    { name: "컴퓨터 과학", href: "" },
    { name: "네트워크 및 통신", href: "" },
    { name: "인공지능", href: "/articleList" },
    { name: "데이터 과학", href: "" },
  ];

  useEffect(() => {
    if (width < (props?.thresholdWidth || 1050)) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  useEffect(() => {
    const token = getToken();
    fetch("https://scholub.misile.xyz/user/verify", {
      method: "GET",
      headers: {
        accept: "application/json",
        token: token ? token : "",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to verify user");
        }
        setIsLogin(true);
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error("Error verifying user:", error);
      });
  }, []);

  return (
    <HeaderContainer>
      <SearchBarContainer>
        <div>
          {isMobile ? (
            <LogoIcon
              style={{
                width: 28,
                height: 28,
                minWidth: 28,
                minHeight: 28,
                cursor: "pointer",
              }}
              onClick={() => (window.location.href = "/")}
            />
          ) : (
            <LogoTextSvg
              style={{ width: 116, height: 21, cursor: "pointer" }}
              onClick={() => (window.location.href = "/")}
            />
          )}
        </div>
        <SearchBarContainer>
          <SearchBar>
            <SearchBarInput placeholder={"관심 있는 연구를 검색해보세요!"} />
            <SearchBarButton>
              <SearchSvg />
            </SearchBarButton>
          </SearchBar>
        </SearchBarContainer>
        {isMobile && (
          <MenuButton
            onClick={() => {
              setIsMenuOpen(true);
            }}
          >
            <MenuButtonSvg style={{ cursor: "pointer" }} />
          </MenuButton>
        )}
      </SearchBarContainer>
      <NavBar>
        <MenuContainer>
          {mainMenu.map((menu, index) => (
            <MenuMain key={index} href={menu.href}>
              {menu.name}
            </MenuMain>
          ))}
          <MenuLineSvg />
          {subMenu.map((menu, index) => (
            <MenuSub key={index} href={menu.href}>
              {menu.name}
            </MenuSub>
          ))}
        </MenuContainer>
        <AuthContainer>
          {isLogin ? (
            <>
              <MyPage>마이페이지</MyPage>
              <LoginButton
                onClick={() => {
                  removeToken();
                  window.location.href = "/";
                }}
              >
                로그아웃
              </LoginButton>
            </>
          ) : (
            <>
              <LoginButton onClick={() => (window.location.href = "/login")}>
                로그인
              </LoginButton>
              <SignInButton href={"/register"}>회원가입</SignInButton>
            </>
          )}
        </AuthContainer>
      </NavBar>
      <NavMenu
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        name={"페른"}
        isLogin={isLogin}
      />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: black solid 1px;
  border-bottom-color: #dddddd;
  padding: 20px 0;
`;
const SearchBarContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-direction: row;
  height: 44px;
  padding: 10px 0;
  @media (max-width: 1050px) {
    gap: 20px;
  }
`;
const SearchBar = styled.div`
  display: flex;
  width: 100%;
  padding: 0;
  gap: 0;
  margin: 0;
  flex-direction: row;
`;
const SearchBarInput = styled.input`
  color: #000;
  text-align: start;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.14px;
  outline: none;
  &::placeholder {
    color: rgba(50, 47, 41, 0.3);
  }

  display: flex;
  width: 100%;
  align-items: center;
  border-radius: 30px 0px 0px 30px;
  border: 1px solid #f7971d;
  padding: 8px 20px;
  gap: 10px;
  flex: 1 0 0;
`;
const SearchBarButton = styled.div`
  display: flex;
  padding: 8px 16px 8px 8px;
  align-items: center;
  border-radius: 0px 30px 30px 0px;
  background: #f7971d;
`;

const NavBar = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  padding: 21px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  @media (max-width: 1050px) {
    display: none;
  }
`;
const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 36px;
`;
const MenuMain = styled.a`
  text-decoration: none;
  color: #322f29;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px; /* 162.5% */
  letter-spacing: -0.32px;
`;
const MenuSub = styled.a`
  text-decoration: none;
  color: rgba(50, 47, 41, 0.8);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px; /* 162.5% */
  letter-spacing: -0.32px;
  border: none;
  background: none;
  cursor: pointer;
`;
const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const LoginButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
  color: #322f29;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.14px;
  cursor: pointer;
`;
const SignInButton = styled.a`
  text-decoration: none;
  color: #322f29;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.14px;
`;
const MenuButton = styled.div`
  width: 24px;
  height: 24px;
`;
const MyPage = styled.a`
  color: #322f29;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.14px;
`;
