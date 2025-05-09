import styled from "styled-components";
import img from "../asset/img/bannerImg.png"


export default function Banner(){
  return (
    <BannerContainer>
      <img src={img} alt={'배너 이미지'} />
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  display: flex;
  margin: 40px 0;
  width: 100%;
  height: 140px;
  background-color: #696969;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`
