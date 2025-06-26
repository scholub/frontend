import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ThmbUp from "../asset/icon/thumb_up.svg?react";
import ThmbDn from "../asset/icon/thumb_down.svg?react";
import Delete from "../asset/icon/delete.svg?react";

export interface CommentItemProps {
  id: string;
  profile: string;
  name: string;
  time: string;
  content: string;
  likeCount: number;
  email: string; // 댓글 작성자 이메일
  currentUserEmail: string; // 현재 로그인한 유저의 이메일
  likedByCurrentUser: boolean;
  dislikedByCurrentUser: boolean;
  onDelete: () => void;
}

const CommentItem = ({
  profile,
  name,
  time,
  content,
  email,
  currentUserEmail,
  onDelete,
  likeCount,
  likedByCurrentUser,
  dislikedByCurrentUser,
}: CommentItemProps) => {
  const [liked, setLiked] = useState(likedByCurrentUser);
  const [disliked, setDisliked] = useState(dislikedByCurrentUser);

  const canDelete = email === currentUserEmail;

  const displayLike =
    likeCount + (liked ? 1 : 0) - (likedByCurrentUser ? 1 : 0);

  return (
    <CommentItemBox>
      <ProfileImg src={profile} />
      <CommentContentBox>
        <NameTime>
          {name} <Time>{time}</Time>
        </NameTime>
        <Content>{content}</Content>
        <Actions>
          <LikeValueBox>
            <ActionButton
              onClick={() => {
                if (!liked) {
                  setLiked(true);
                  setDisliked(false);
                } else {
                  setLiked(false);
                }
              }}
            >
              <ThmbUpStyled $fill={liked ? "#F7971D" : "#322F2999"} />
            </ActionButton>
            <LikeValue>{displayLike}</LikeValue>
          </LikeValueBox>
          <ActionButton
            onClick={() => {
              if (!disliked) {
                setDisliked(true);
                setLiked(false);
              } else {
                setDisliked(false);
              }
            }}
          >
            <ThmbDnStyled $fill={disliked ? "#F7971D" : "#322F2999"} />
          </ActionButton>
          {canDelete && (
            <ActionButton onClick={onDelete}>
              <DeleteStyled $fill={"#322F2999"} />
            </ActionButton>
          )}
        </Actions>
      </CommentContentBox>
    </CommentItemBox>
  );
};

export default CommentItem;

const CommentItemBox = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 14px;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  aspect-ratio: 1/1;
  border-radius: 40px;
  border: 1px solid rgba(50, 47, 41, 0.2);
  object-fit: cover;
`;

const CommentContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const NameTime = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #322f29;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 16.8px */
`;

const Time = styled.span`
  color: rgba(50, 47, 41, 0.6);
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 15.4px */
`;

const Content = styled.span`
  color: #322f29;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const Actions = styled.div`
  display: flex;
  gap: 14px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;
const LikeValueBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;
const LikeValue = styled.span`
  color: #322f29;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 15.4px */
  letter-spacing: -0.22px;
`;

// Styled SVG components to apply path fill color
const ThmbUpStyled = styled(ThmbUp)<{ $fill: string }>`
  path {
    fill: ${({ $fill }) => $fill};
  }
`;

const ThmbDnStyled = styled(ThmbDn)<{ $fill: string }>`
  path {
    fill: ${({ $fill }) => $fill};
  }
`;

const DeleteStyled = styled(Delete)<{ $fill: string }>`
  path {
    fill: ${({ $fill }) => $fill};
  }
`;
