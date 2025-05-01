import { styled } from "styled-components"
import Header from "~/components/Header"

const ColFlex = styled.div`
  display: flex;
  flex-direction: column;
`

const RowBetweenFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const CenterFlex = styled(ColFlex)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  font-weight: 800;
  font-size: 24px;
  text-color: #322F29;
`

const Description = styled.h2`
  font-weight: 400;
  font-size: 16px;
  text-color: #322F29;
`

const Input = styled.input`
  &::placeholder {
    text-color: rgba(50, 47, 41, 0.4);
  }
  min-width: 400px;
`;


export function meta() {
  return [{
    title: "Scholub"
  }]
}

export default function Login() {
  return (
    <>
      <Header />
      <CenterFlex>
        <Title>로그인</Title>
        <Description>로그인하여 Scholub 커뮤니티를 이용하세요!</Description>
        <ColFlex>
          <Input type="text" placeholder="example@example.com" />
          <Input type="password" />
        </ColFlex>
        <RowBetweenFlex>
          <Input type="checkbox" />
          <p>계정 찾기</p>
        </RowBetweenFlex>
        <Input type="submit" />
      </CenterFlex>
    </>
  );
}


