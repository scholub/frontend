import { styled } from "styled-components"
import Header from "~/components/Header"

export default function Login() {
  return (
    <Screen>
      <Header />
      <CenterFlex>
        <CenterFlex style={{gap:14}}>
          <Title>로그인</Title>
          <Description>로그인하여 Scholub 커뮤니티를 이용하세요!</Description>
        </CenterFlex>
        <ColFlex>
          <Input type="text" placeholder="example@example.com" />
          <Input type="password" />
        </ColFlex>
        <RowBetweenFlex>
          <CheckBox type="checkbox" />
          <span style={{flex:1}}>계정 찾기</span>
        </RowBetweenFlex>
        <Submit type="submit" />
      </CenterFlex>
    </Screen>
  );
}

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100dvh;
`
const ColFlex = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`

const RowBetweenFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CenterFlex = styled(ColFlex)`
  width: 100%;
  //height: calc(100dvh - 168px);
  justify-content: center;
  align-items: center;
  gap: 40px;
`

const Title = styled.span`
  font-weight: 800;
  font-size: 24px;
  text-color: #322F29;
`

const Description = styled.span`
  font-weight: 400;
  font-size: 16px;
  text-color: #322F29;
`

const Input = styled.input`
  &::placeholder {
  text-color: rgba(50, 47, 41, 0.4);
  }
  &:focus{
    outline: none;
  }
  border: none;
  min-width: 400px;
  display: flex;
  height: 48px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  border-bottom: 1px solid #F7971D;
`;

const CheckBox = styled.input`
  border: none;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 1px solid #F7971D;
  margin: 0;
  margin-right: 4px;
`

const Submit = styled.input`
  display: flex;
  height: 42px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border: none;
  border-radius: 4px;
  background: #F7971D;
`


export function meta() {
  return [{
    title: "Scholub로그인"
  }]
}


