import React, { useState } from "react";
import { useEffect } from "react";

import styled from "styled-components";
import BookmarkEnabledIcon from "~/asset/icon/bookmarkEnabled.svg?react";
import BookmarkDisabledIcon from "~/asset/icon/bookmarkDisabled.svg?react";

export interface ArticleCardProps {
  paper_id: string;
  title?: string;
  subTitle?: string;
  imgUrl?: string;
  category?: string;
  isBookmarked?: boolean;
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default function ArticleCard(props: ArticleCardProps) {
  const width = useWindowWidth();
  const [isBookmarked, setIsBookmarked] = useState(props.isBookmarked || false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    //북마크 관련 API 호출 로직 추가 필요
  };

  useEffect(() => {
    if (width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  return (
    <ArticleCardContainer>
      {!isMobile && <ArticleCardImage src={props.imgUrl} alt={props.title} />}
      <ContetntWarper
        onClick={() => {
          window.location.href = `/article/${props.paper_id}`;
        }}
      >
        <TitleTextButton>{props.title}</TitleTextButton>
        <SubTitleText>{props.subTitle}</SubTitleText>
        <CategoryText>{props.category}</CategoryText>
      </ContetntWarper>
      {!isMobile && (
        <BookmarkButton isBookmarked={isBookmarked} onClick={toggleBookmark}>
          {isBookmarked ? <BookmarkEnabledIcon /> : <BookmarkDisabledIcon />}
        </BookmarkButton>
      )}
    </ArticleCardContainer>
  );
}

const ArticleCardContainer = styled.div`
  display: flex;
  max-width: 100%;
  height: 96px;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  overflow: hidden; // 추가: 컨테이너에서 넘치는 내용 숨김
`;

const ArticleCardImage = styled.img`
  width: 170px;
  height: 96px;
  aspect-ratio: 85/48;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  object-fit: cover;
  flex-shrink: 0;
`;

const ContetntWarper = styled.div`
  display: flex;
  max-width: 100%;
  min-width: 0; // 추가: flex item에서 overflow ellipsis 동작
  padding: 6px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
`;

const TitleTextButton = styled.button`
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  align-self: stretch;
  overflow: hidden;
  color: #322f29;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.36px;
  border: none;
  background: none;
  align-items: start;
  text-align: start;
  padding: 0;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: nowrap; // 수정: 한 줄로 표시
  text-overflow: ellipsis; // 추가: 넘치는 텍스트 ... 처리
  min-width: 0; // 추가: flex item에서 overflow ellipsis 동작
  max-width: 100%; // 추가: 부모 영역을 넘지 않도록
`;

const SubTitleText = styled.p`
  margin: 0;
  height: 17px;
  align-self: stretch;
  overflow: hidden;
  color: #322f29;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: NanumSquareRound;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: -0.28px;
  min-width: 0; // 추가
  max-width: 100%; // 추가
`;

const CategoryText = styled.p`
  margin: 0;
  color: #f7971d;
  text-align: center;
  font-family: NanumSquareRound;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap; // 추가
  min-width: 0; // 추가
  max-width: 100%; // 추가
`;

const BookmarkButton = styled.button<{ isBookmarked: boolean }>`
  display: flex;
  width: 100px;
  height: 44px;
  padding: 6px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${({ isBookmarked }) =>
    isBookmarked ? "#F7971D" : "rgba(176, 176, 176, 1)"};
  background: ${({ isBookmarked }) =>
    isBookmarked ? "rgba(247, 151, 29, 0.1)" : "rgba(141, 141, 141, 0.1)"};
`;
