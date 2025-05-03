import { styled } from "styled-components"
import Header from "~/components/Header"

export default function Login() {
  return (
    <Screen>
      <Header />
      <CenterFlex height="calc(100dvh - 168px)">
        <CenterFlex maxwidth="400px" gap={40}>
          <CenterFlex height="fit-content" gap={14}>
            <Title>로그인</Title>
            <Description>로그인하여 Scholub 커뮤니티를 이용하세요!</Description>
          </CenterFlex>
          <Container gap={30}>
            <TextInput type="text" placeholder="이메일" />
            <TextInput type="password" placeholder="비밀번호" />
            <BetweenFlex direction="row">
              <CenterFlex direction="row" gap={4} width={"fit-content"}>
                <CheckBox type="checkbox" />
                <Text>로그인 유지</Text>
              </CenterFlex>
              <Text>계정 찾기</Text>
            </BetweenFlex>
          </Container>
          <Submit type="submit" value="로그인" />
        </CenterFlex>
      </CenterFlex>
    </Screen>
  );
}

const Flex = styled.div<{
  direction?: "row" | "column",
  gap?: number,
  height?: string,
  width?: string,
  maxwidth?: string
}>`
  ${props => props.gap ? `gap: ${props.gap}px;` : ""}
  ${props => props.height ? `height: ${props.height};` : ""}
  ${props => props.width ? `width: ${props.width};` : ""}
  ${props => props.maxwidth ? `max-width: ${props.maxwidth};` : ""}
  display: flex;
  flex-direction: ${props => props.direction || "column"};
  margin: 0;
  padding: 0;
`

const Screen = styled(Flex)`
  justify-content: center;
  align-items: center;
  height: 100dvh;
`

const CenterFlex = styled(Flex)`
  width: ${props => props.width || "100%"};
  justify-content: center;
  align-items: center;
`

const Container = styled(CenterFlex)`
  max-width: 400px;
`

const BetweenFlex = styled(Container)`
  justify-content: space-between;
  height: fit-content;
`;

const Text = styled.span`
  color: #322F29;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.14px;
  text-align: center;
  height: fit-content;
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

const TextInput = styled(Input)`
  &::placeholder {
    text-color: rgba(50, 47, 41, 0.4);
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid #F7971D;
  }
`;

const CheckBox = styled(Input)`
  max-width: 400px;
  min-width: fit-content;
  height: fit-content;
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


