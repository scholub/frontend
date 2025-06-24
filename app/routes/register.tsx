import { styled } from "styled-components"
import Header from "~/components/Header"
import ChipGroup from "~/components/ChipGroup";
import { useState, useEffect } from "react";

export default function Register() {
  const [token, setToken] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthdate, setBirthdate] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");

  }, [token]);


  return (
    <Screen>
      <Header />
      <CenterFlex height="calc(100dvh - 168px)">
        <CenterFlex gap={40}>
          <CenterFlex height="fit-content" gap={14}>
            <Title>회원가입</Title>
            <Description>회원가입하여 Scholub의 모든 서비스를 이용하세요!</Description>
          </CenterFlex>

            <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '60px',
            width: '100%',
            }}>

            {/* 왼쪽: 이메일 인증, 비밀번호 */}
            <Container gap={30} style={{ maxWidth: '400px' }}>
              <TextInputContainer>
                <TextInputLabel>이메일</TextInputLabel>
                <EmailAuthContainer>
                  <TextInput
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  {token? <EmailAuthButton disabled style={{backgroundColor: 'gray'}}>인증완료</EmailAuthButton>:<EmailAuthButton onClick={() => {
                    const ws = new WebSocket("https://scholub.misile.xyz/user/register");
                    ws.onopen = () => {
                      ws.send(email);
                      alert("인증 이메일이 발송되었습니다.");
                    };
                    ws.onmessage = (event) => {
                      const data = JSON.parse(event.data);
                        if (data.status === 409) {
                          alert("이미 등록된 이메일입니다.");
                        } else if (data.status === 400) {
                          alert("잘못된 이메일 형식입니다.");
                        } else if (data.status === 200) {
                          alert("이메일 인증이 완료되었습니다.");
                          setToken(data.data || "");
                        } else {
                        alert("알 수 없는 오류가 발생했습니다.");
                        }
                    };
                  }}>인증하기</EmailAuthButton>}
                </EmailAuthContainer>
              </TextInputContainer>
              <TextInputContainer>
                <TextInputLabel>비밀번호</TextInputLabel>
                <TextInput
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                 />
              </TextInputContainer>
              <TextInputContainer>
                <TextInputLabel>비밀번호 확인</TextInputLabel>
                <TextInput
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                />
              </TextInputContainer>
            </Container>

            {/* 오른쪽: 닉네임, 생년월일, 관심분야 */}
            <Container gap={30} style={{ maxWidth: '400px' }}>
              <TextInputContainer>
                <TextInputLabel>닉네임</TextInputLabel>
                <TextInput
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                />
              </TextInputContainer>
              <TextInputContainer>
                <TextInputLabel>생년월일(8자리)</TextInputLabel>
                <TextInput
                type="text"
                placeholder="YYYY/MM/DD"
                value={birthdate}
                onChange={e => setBirthdate(e.target.value)}
                 />
              </TextInputContainer>
              <TextInputContainer>
                <TextInputLabel>관심분야</TextInputLabel>
                <ChipGroup
                  options={["AI", "프론트엔드", "백엔드", "데이터 사이언스", "DevOps", "보안", "기타"]}
                  selectedList={selectedChips}
                  onChange={(selected) => setSelectedChips(selected)}
                />

              </TextInputContainer>
            </Container>
          </div>

          <Submit onClick={() => {
            fetch("https://scholub.misile.xyz/user/register", {
              method: "POST",
              headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: token,
                name: nickname,
                password: password,
              }),
            })
              .then((response) => {
                if (!response.ok) {
                  if (response.status === 401) {
                    alert("인증 과정에서 문제가 생겼습니다.")
                  } else if (response.status === 400) {
                    alert("비밀번호는 최소 8글자여야 합니다.")
                  } else if (response.status === 409) {
                    response.text().then((content)=>{
                      if (content.includes('email must be unique.')) {
                        alert("같은 이메일을 가진 유저가 존재합니다.")
                      } else {
                        alert("같은 이름을 가진 유저가 존재합니다.")
                      }
                    })
                  } else {
                    throw new Error("Failed to register");
                  }
                }
              return response.json();
              })
              .then((data) => {
              })
              .catch((error) => {
                console.error("Error registering user:", error);
              });
          }}>
            <Text
              style={{
                color: "#FFF",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "normal",
              }}
            >
              회원가입
            </Text>
          </Submit>
        </CenterFlex>
      </CenterFlex>
    </Screen>
  )
}

interface FlexProps {
  direction?: "row" | "column",
  gap?: number,
  height?: string,
  width?: string,
  maxwidth?: string
}

const Flex = styled.div <FlexProps>`
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
`

const CenterFlex = styled(Flex)`
  width: ${props => props.width || "100%"};
  align-items: center;
  justify-content: center;
`

const Container = styled(CenterFlex)`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  `

const Text = styled.span`
  color: #322f29;
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
  display: flex;
  height: 48px;
  padding: 10px 4px;
  align-items: center;
  flex: 1 0 0;
  border: none;
  border-bottom: 1px solid #ddd;
  width: 100%;
`

const TextInput = styled(Input)`
  color: #322f29;
  font-size: 14px;
  font-weight: 400;
  line-height: 120%;
  padding: 0;

  &::placeholder {
    color: rgba(50, 47, 41, 0.4);
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid #f7971d;
  }
`

const Submit = styled.button`
  height: 42px;
  padding: 10px;
  align-self: stretch;
  border: none;
  border-radius: 4px;
  background: #f7971d;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
`

const TextInputContainer = styled.div`
  width: 100%;
  display: flex;
  height: 64px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`

const TextInputLabel = styled.text`
  color: #000;
  font-family: NanumSquareRound;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`

const EmailAuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
  align-self: stretch;
`

const EmailAuthButton = styled.button`
  display: flex;
  width: 72px;
  height: 40px;
  padding: 10px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: #f7971d;
  border: none;
  color: #fff;
  font-size: 12px;
`

const CheckBoxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export function meta() {
  return [{
    title: "Scholub 회원가입"
  }]
}
