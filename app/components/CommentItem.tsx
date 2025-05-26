import React, { useState } from "react";
import styled from "styled-components";
import ThmbUp from "../asset/icon/thumb_up.svg?react"
import ThmbDn from "../asset/icon/thumb_down.svg?react"
import Delete from "../asset/icon/delete.svg?react"

export interface CommentItemProps {
  profile: string;
  name: string;
  time: string;
  content: string;
  email: string; // 댓글 작성자 이메일
  currentUserEmail: string; // 현재 로그인한 유저의 이메일
}

const CommentItem = ({ profile, name, time, content, email, currentUserEmail }: CommentItemProps) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const canDelete = email === currentUserEmail;

  return (
    <CommentItemBox>
      <ProfileImg src={profile} />
      <CommentContentBox>
        <NameTime>
          {name} <Time>{time}</Time>
        </NameTime>
        <Content>{content}</Content>
        <Actions>
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
            <ThmbUpStyled $fill={liked ? '#F7971D' : '#322F2999'} />
          </ActionButton>
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
            <ThmbDnStyled $fill={disliked ? '#F7971D' : '#322F2999'} />
          </ActionButton>
          {canDelete && (
            <ActionButton onClick={() => {
              confirm("삭제하시겠습니까?");
            }}>
              <DeleteStyled $fill={'#322F2999'} />
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
  align-items: flex-start;
  gap: 14px;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  aspect-ratio: 1/1;
  border-radius: 40px;
  border: 1px solid rgba(50, 47, 41, 0.20);
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
  color: #322F29;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 16.8px */
`;

const Time = styled.span`
  color: rgba(50, 47, 41, 0.60);
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 15.4px */
`;

const Content = styled.span`
  color: #322F29;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
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
