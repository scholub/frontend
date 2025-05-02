import { styled } from "styled-components"
import Header from "~/components/Header"

export default function Login() {
  return (
    <Screen>
      <Header />
      <CenterFlex height="calc(100dvh - 168px)">
        <CenterFlex style={{maxWidth: "400px"}} gap={40}>
          <CenterFlex height="fit-content" gap={14}>
            <Title>로그인</Title>
            <Description>로그인하여 Scholub 커뮤니티를 이용하세요!</Description>
          </CenterFlex>
          <Container gap={30}>
            <Input type="text" placeholder="이메일" />
            <Input type="password" placeholder="비밀번호" />
            <RowBetweenFlex>
              <RowFlex>
                <CheckBox type="checkbox" />
                <Text>로그인 유지</Text>
              </RowFlex>
              <Text>계정 찾기</Text>
            </RowBetweenFlex>
          </Container>
          <Submit type="submit" value="로그인" />
        </CenterFlex>
      </CenterFlex>
    </Screen>
  );
}

const Flex = styled.div<{gap?: number, height?: string, width?: string}>`
  ${props => props.gap ? `gap: ${props.gap}px;` : ""}
  ${props => props.height ? `height: ${props.height};` : ""}
  ${props => props.width ? `width: ${props.width};` : ""}
  display: flex;
`

const ColFlex = styled(Flex)`
  flex-direction: column;
`

const RowFlex = styled(Flex)`
  flex-direction: row;
`

const RowCenterFlex = styled(RowFlex)`
  justify-content: center;
  align-items: center;
`;

const Screen = styled(ColFlex)`
  justify-content: center;
  align-items: center;
  height: 100dvh;
`

const CenterFlex = styled(ColFlex)`
  margin: 0;
  padding: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const Container = styled(CenterFlex)`
  max-width: 400px;
`

const RowBetweenFlex = styled(Container)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Text = styled.span`
  text-color: #322F29;
  color: #322F29;
  font-family: NanumSquareRound;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.14px;
`

const Title = styled(Text)`
  font-size: 24px;
  font-weight: 800;
`

const Description = styled(Text)`
  font-size: 16px;
  font-weight: 400;
`

const Input = styled.input`
  &::placeholder {
  text-color: rgba(50, 47, 41, 0.4);
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid #F7971D;
  }
  border: none;
  min-width: 400px;
  display: flex;
  height: 48px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  border-bottom: 1px solid #DDD;
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
  height: 42px;
  padding: 10px;
  align-self: stretch;
  border: none;
  border-radius: 4px;
  background: #F7971D;
  max-width: 400px;
`

export function meta() {
  return [{
    title: "Scholub 로그인"
  }]
}


