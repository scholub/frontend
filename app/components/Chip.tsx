import styled from 'styled-components';

interface ChipProps {
  label?: string;
}

export default function Chip(props: ChipProps) {

  return (
    <ChipContainer>
      <LabelText >{props.label}</LabelText>
    </ChipContainer>
  );
}

interface IsSelected{
  isSelected?: boolean;
}


const ChipContainer = styled.button<IsSelected>`
  display: flex;
  height: 26px;
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border-radius: 14px;
  border:none;
  background: rgba(247, 151, 29, 0.10);
`


const LabelText = styled.span`
  color: #F1B86F;
  font-family: NanumSquareRound;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 12px */
  letter-spacing: -0.24px;
`