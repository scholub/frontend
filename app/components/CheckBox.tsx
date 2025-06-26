// app/components/CheckBox.tsx
import { useState } from "react";
import styled from "styled-components";

const CheckBoxInput = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #f7971d;
    border-color: #f7971d;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0.5px;
    left: 4.5px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    opacity: 0;
    transform: rotate(45deg);
  }
  &:checked::after {
    opacity: 1;
  }
`;

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function CheckBox(props: CheckBoxProps) {
  const [checked, setChecked] = useState(!!props.checked);

  return (
    <CheckBoxInput
      {...props}
      checked={checked}
      onChange={(e) => {
        setChecked(e.target.checked);
        props.onChange?.(e);
      }}
    />
  );
}
