import styled from "styled-components";

export interface ArticleListProps {
  title: string;
  subTitle: string;
  imgUrl: string;
  category: string;
}

export default function ArticleUnit(props: ArticleListProps) {
  return (
    <ArticleContainer>
      <ArticleImg/>
      <ArticleTitle>{props.title}</ArticleTitle>
      <ArticleSubTitle>{props.subTitle}</ArticleSubTitle>
      <ArticleCategory>{props.category}</ArticleCategory>
    </ArticleContainer>
  )
}

const ArticleContainer = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`
const ArticleImg = styled.img`
  height: 159px;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid #DDD;
  background-color: #696969;
`
const ArticleTitle = styled.span`
  align-self: stretch;
  color: #322F29;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.36px;
`
const ArticleSubTitle = styled.span`
  overflow: hidden;
  color: #322F29;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 16.8px */
  letter-spacing: -0.28px;
`
const ArticleCategory = styled.span`
  color: #F7971D;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.12px;
`
