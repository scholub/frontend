import styled from "styled-components";
import CheckIcon from "~/asset/icon/chipCheck.svg?react";

interface ChipProps {
  label?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function Chip(props: ChipProps) {
  return (
    <ChipContainer isSelected={props.isSelected} onClick={props.onClick}>
      {props.isSelected && <CheckIcon />}
      <LabelText isSelected={props.isSelected}>{props.label}</LabelText>
    </ChipContainer>
  );
}

const ChipContainer = styled.button<{ isSelected?: boolean }>`
  display: flex;
  height: 28px;
  padding: ${({ isSelected }) =>
    isSelected ? "4px 10px 4px 6px" : "4px 10px"};
  justify-content: center;
  align-items: center;
  gap: 2px;
  border-radius: 14px;
  border: ${({ isSelected }) =>
    isSelected ? "1px solid rgba(247, 151, 29, 1)" : "none"};
  background: ${({ isSelected }) =>
    isSelected ? "rgba(255, 212, 136, 1)" : "rgba(247, 151, 29, 0.10)"};
`;

const LabelText = styled.span<{ isSelected?: boolean }>`
  width: fit-content;
  color: ${({ isSelected }) =>
    isSelected ? "rgba(247, 151, 29, 1)" : "rgba(241, 184, 111, 1)"};
  font-family: NanumSquareRound;
  font-size: 12px;
  font-style: normal;
  font-weight: ${({ isSelected }) => (isSelected ? "700" : "400")};
  line-height: 100%; /* 12px */
  letter-spacing: -0.24px;
`;
