import { useState } from "react";
import { styled } from "styled-components"
import Header from "~/components/Header"
import { serverAddress } from "../consts/backend";

export default function Login() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  
  async function login() {

    if (email === "" || password === "") { alert("이메일과 비밀번호를 입력해주세요."); return; }
    if (password.length < 8) { alert("비밀번호는 8자 이상이어야 합니다."); return; }
    if (!emailRegex.test(email)) { alert("이메일 형식이 잘못되었습니다."); return; }


    const res = await fetch(serverAddress + "/user/login", {
      method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (res.status === 200) {
      const data = await res.text();
      if (remember) { localStorage.setItem("token", data); } 
      else { sessionStorage.setItem("token", data); }
    } 
    else if (res.status === 401) { alert("이메일 또는 비밀번호가 잘못되었습니다."); } 
    else if (res.status === 422) { alert("이메일이 형식에 맞지 않습니다."); } 
    else { alert("알 수 없는 오류가 발생했습니다."); }
    
  }
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
            <TextInput type="email" placeholder="이메일" value={email} onChange={(t)=>setEmail(t.target.value)} />
            <TextInput type="password" placeholder="비밀번호" value={password} onChange={(t)=>setPassword(t.target.value)} />
            <BetweenFlex direction="row">
              <CenterFlex direction="row" gap={4} width={"fit-content"}>
                <CheckBox type="checkbox" checked={remember} onChange={(t)=>setRemember(t.target.checked)} />
                <Text>로그인 유지</Text>
              </CenterFlex>
              <Text>계정 찾기</Text>
            </BetweenFlex>
          </Container>
          <Submit onClick={login}><Text>로그인</Text></Submit>
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
  width: 100%;
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

const Submit = styled.button`
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


