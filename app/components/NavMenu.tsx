import styled, { createGlobalStyle } from "styled-components";
import { useEffect, useRef } from "react";
import { removeToken } from "../apis/utils";

interface Props {
  isOpen: boolean;
  setIsOpen: any;
  name: string;
  isLogin: boolean;
}

export default function NavMenu(props: Props) {
  const toggleSide = () => {
    props.setIsOpen(false);
  };
  const outside = useRef<any>(null);
  const handlerOutside = (e: any) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  };
  useEffect(() => {
    let openTimeout: NodeJS.Timeout;
    let closeTimeout: NodeJS.Timeout;

    if (props.isOpen) {
      document.body.classList.remove("menu-closing");
      document.body.classList.add("menu-opening");
      openTimeout = setTimeout(() => {
        document.body.classList.remove("menu-opening");
        document.body.classList.add("menu-open");
      }, 300);
    } else {
      document.body.classList.remove("menu-open");
      document.body.classList.add("menu-closing");
      closeTimeout = setTimeout(() => {
        document.body.classList.remove("menu-closing");
      }, 300);
    }

    document.addEventListener("mousedown", handlerOutside);
    return () => {
      clearTimeout(openTimeout);
      clearTimeout(closeTimeout);
      document.body.classList.remove("menu-open");
      document.body.classList.remove("menu-opening");
      document.body.classList.remove("menu-closing");
      document.removeEventListener("mousedown", handlerOutside);
    };
  }, [props.isOpen]);

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

  return (
    <>
      <Backdrop />
      <MenuContainer
        id="sidebar"
        ref={outside}
        className={props.isOpen ? "open" : ""}
      >
        <ProfileBox>
          {props.isLogin && (
            <UserBox>
              <ProfileImg
                src={
                  "https://dcimg1.dcinside.com/viewimage.php?id=2eb2dd2fe6ed36a379eb&no=24b0d769e1d32ca73fe983fa11d028318cb15ad56bfd98ec49f9ade75ba108bc917c09b7ae387c60dd518a2de75a860beae82c72508ae912d431ee34b6d91f501a254a7f87b12b31ff7886e541627579ca98d730882fbc"
                }
              />
              <Name>{props.name}</Name>
            </UserBox>
          )}
          {!props.isLogin ? (
            <div style={{ display: "flex", gap: "10px" }}>
              <MyPage href="/login">로그인</MyPage>
              <MyPage href="/register">회원가입</MyPage>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <MyPage>마이페이지</MyPage>
              <MyPage
                onClick={() => {
                  removeToken();
                  window.location.href = "/";
                }}
              >
                로그아웃
              </MyPage>
            </div>
          )}
        </ProfileBox>
        <Line />
        <MainMenuBox>
          {mainMenu.map((menu, index) => (
            <MainMenu key={index} href={menu.href}>
              {menu.name}
            </MainMenu>
          ))}
        </MainMenuBox>
        <Line />
        <SubMenuBox>
          {subMenu.map((menu, index) => (
            <SubMenu key={index} href={menu.href} onClick={toggleSide}>
              {menu.name}
            </SubMenu>
          ))}
        </SubMenuBox>
      </MenuContainer>
    </>
  );
}

const MenuContainer = styled.div`
  display: flex;
  width: 260px;
  height: 100dvh;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  position: fixed;

  border-radius: 8px 0 0 8px;
  background: #fff;

  z-index: 100;
  right: -1000px;
  top: 0;
  transition: 0.8s cubic-bezier(0.48, -0.07, 0.74, 0.05);

  &.open {
    right: 0;
    transition: 0.8s ease;
  }
  @media (min-width: 1050px) {
    display: none;
  }
`;
const ProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;
const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  aspect-ratio: 1/1;
  border-radius: 32px;
  border: 1px solid rgba(50, 47, 41, 0.2);
  object-fit: cover;
`;
const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #fff;
`;
const Name = styled.span`
  color: #322f29;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 25.6px */
  letter-spacing: -0.16px;
`;
const MyPage = styled.a`
  color: rgba(50, 47, 41, 0.8);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */
  letter-spacing: -0.12px;
  text-decoration: none;
`;
const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #f2f0f0;
`;
const MainMenuBox = styled.div`
  display: flex;
  max-width: 800px;
  padding: 0 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
`;
const MainMenu = styled.a`
  color: #322f29;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.14px;
  text-decoration: none;
`;
const SubMenuBox = styled.div`
  display: flex;
  max-width: 800px;
  padding: 0 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
`;
const SubMenu = styled.a`
  color: rgba(50, 47, 41, 0.8);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.14px;
  text-decoration: none;
`;
const Backdrop = createGlobalStyle`
  body.menu-open::before,
  body.menu-closing::before,
  body.menu-opening::before {
    content: "";
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.5s ease;
  }

  body.menu-opening::before {
    background-color: rgba(0, 0, 0, 0.0);
  }

  body.menu-open::before {
    background-color: rgba(0, 0, 0, 0.4);
  }

  body.menu-closing::before {
    background-color: rgba(0, 0, 0, 0);
  }
`;
