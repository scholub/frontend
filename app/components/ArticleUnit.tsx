import styled from "styled-components";

export interface ArticleListProps {
  paper_id: string;
  created: string;
  title: string;
  imgUrl: string;
  description: string;
  category: string;
  tag: string;
  modified: string;
  like_count: number;
  dislike_count: number;
}

export default function ArticleUnit(props: ArticleListProps) {
  return (
    <ArticleContainer onClick={()=>{
      window.location.href = "https://scholub.misile.xyz/files/post/" + props.paper_id + "/post.md";
    }}>
      <ArticleImg/>
      <ArticleTitle>{props.title}</ArticleTitle>
      <ArticleSubTitle>{props.description}</ArticleSubTitle>
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
  color: #322F29;
  white-space: nowrap;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 16.8px */
  letter-spacing: -0.28px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;

`
const ArticleCategory = styled.span`
  width: 100%;
  color: #F7971D;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  letter-spacing: -0.12px;
`
