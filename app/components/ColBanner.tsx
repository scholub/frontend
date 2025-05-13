import styled from "styled-components";
import img from "../asset/img/colBanner.png"


export default function ColBanner(){
  return (
    <BannerContainer  src={img} alt={'배너 이미지'}/>
  );
};

const BannerContainer = styled.img`
  display: flex;
  width: 256px;
  height: 720px;
  justify-content: center;
  align-items: center;
  background-color: #747474;
  object-fit: cover;

`
