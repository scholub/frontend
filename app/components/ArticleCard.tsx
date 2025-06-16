import React, { useState } from 'react';
import styled from 'styled-components';
import BookmarkEnabledIcon from '~/asset/icon/bookmarkEnabled.svg?react';
import BookmarkDisabledIcon from '~/asset/icon/bookmarkDisabled.svg?react';

interface ArticleCardProps {
    title?: string;
    subTitle?: string;
    imgUrl?: string;
    category?: string;
    isBookmarked?: boolean;
}

const ArticleCard = (props: ArticleCardProps) => {
    const [isBookmarked, setIsBookmarked] = useState(props.isBookmarked || false);
    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        //북마크 관련 API 호출 로직 추가 필요
    };
    return(
        <ArticleCardContainer>
            <ArticleCardImage src={props.imgUrl} alt={props.title} />
            <ContetntWarper>
                <TitleText>{props.title}</TitleText>
                <SubTitleText>{props.subTitle}</SubTitleText>
                <CategoryText>{props.category}</CategoryText>
            </ContetntWarper>
            <BookmarkButton isBookmarked={isBookmarked} onClick={toggleBookmark}>
                {isBookmarked ? <BookmarkEnabledIcon /> : <BookmarkDisabledIcon />}
            </BookmarkButton>
        </ArticleCardContainer>
    );
}

export default ArticleCard;

const ArticleCardContainer = styled.div`
    display: flex;
    height: 96px;
    align-items: center;
    gap: 20px;
    align-self: stretch;
`;

const ArticleCardImage = styled.img`
    width: 170px;
    height: 96px;
    aspect-ratio: 85/48;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.20);


`;

const ContetntWarper = styled.div`
    display: flex;
    padding: 6px 0px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    flex: 1 0 0;
    align-self: stretch;
`;

const TitleText = styled.h2`
    margin: 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    align-self: stretch;
    overflow: hidden;
    color: #322F29;
    text-overflow: ellipsis;
    font-family: NanumSquareRound;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 133.333% */
    letter-spacing: -0.36px;
`; 

const SubTitleText = styled.p`
    margin: 0;
    height: 17px;
    align-self: stretch;
    overflow: hidden;
    color: #322F29;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: NanumSquareRound;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%; /* 16.8px */
    letter-spacing: -0.28px;
`;

const CategoryText = styled.p`
    margin: 0;
    color: #F7971D;
    text-align: center;
    font-family: NanumSquareRound;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
    letter-spacing: -0.12px;
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
    border: 1px solid ;
    border-color: ${({ isBookmarked }) => isBookmarked ? '#F7971D' : 'rgba(176, 176, 176, 1)'};
    background: ${({ isBookmarked }) => isBookmarked ? 'rgba(247, 151, 29, 0.1)' : 'rgba(141, 141, 141, 0.1)'};
`;
