import styled from "styled-components";
import {useEffect, useRef} from "react";

export default function NavMenu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) {
  const toggleSide = () => {
    setIsOpen(false);
  };
  const outside = useRef<any>(null);
  const handlerOutside = (e: any) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handlerOutside);
    return () => {
      document.removeEventListener('mousedown', handlerOutside);
    };
  }, []);

  return(
    <MenuContainer id="sidebar" ref={outside} className={isOpen ? 'open' : ''}>
      <ProfileBox>
        <UserBox>
          <ProfileImg/>
          {/*TODO: 이름 넣기*/}
          <Name>유이</Name>
        </UserBox>
        <MyPage>마이페이지</MyPage>
      </ProfileBox>
      <Line/>
      <MainMenuBox>
        <MainMenu>최신연구</MainMenu>
        <MainMenu>인기연구</MainMenu>
        <MainMenu>기사 및 칼럼</MainMenu>
        <MainMenu>상세 검색</MainMenu>
      </MainMenuBox>
      <Line/>
      <SubMenuBox>
        <SubMenu>컴퓨터 과학</SubMenu>
        <SubMenu>네트워크 및 통신</SubMenu>
        <SubMenu>인공지능</SubMenu>
        <SubMenu>데이터 과학</SubMenu>
      </SubMenuBox>
    </MenuContainer>
  )
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

  z-index: 5;
  right: -1000px;
  top: 0;
  transition: 0.5s ease;

  &.open {
    right: 0;
    transition: 0.5s ease;
  }
  @media (min-width: 768px) {
    display: none;
  }
`
const ProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`
const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  aspect-ratio: 1/1;
  border-radius: 32px;
  border: 1px solid rgba(50, 47, 41, 0.20);
`
const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #fff;
`
const Name = styled.span`
  color: #322F29;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 25.6px */
  letter-spacing: -0.16px;
`
const MyPage = styled.a`
  color: rgba(50, 47, 41, 0.80);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */
  letter-spacing: -0.12px;
`
const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #F2F0F0;

`
const MainMenuBox = styled.div`
  display: flex;
  max-width: 800px;
  padding: 0 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
`
const MainMenu = styled.a`
  color: #322F29;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.14px;
`
const SubMenuBox = styled.div`
  display: flex;
  max-width: 800px;
  padding: 0 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
`
const SubMenu = styled.a`
  color: rgba(50, 47, 41, 0.80);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.14px;
`
