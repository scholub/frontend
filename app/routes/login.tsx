import { styled } from "styled-components"
import Header from "~/components/Header"

const ColFlex = styled.div`
  display: flex;
  flex-direction: column;
`

const CenterFlex = styled(ColFlex)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export function meta() {
  return [{
    title: "scholub"
  }]
}

export default function Login() {
  return (
    <>
      <Header />
      <CenterFlex>
        <h1>로그인</h1>
        <h2>로그인하여 Scholub 커뮤니티를 이용하세요!</h2>
      </CenterFlex>
    </>
  );
}


