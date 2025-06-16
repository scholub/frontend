import styled from "styled-components";
import Chip from "./Chip";

interface ChipGroupProps {
  options: string[];
  selectedList: string[];
  onChange: (selected: string[]) => void;
}

export default function ChipGroup({ options, selectedList, onChange }: ChipGroupProps) {
  const toggleChip = (label: string) => {
    if (selectedList.includes(label)) {
      onChange(selectedList.filter(item => item !== label));
    } else {
      onChange([...selectedList, label]);
    }
  };

  return (
    <Wrapper>
      {options.map(label => (
        <Chip
          key={label}
          label={label}
          isSelected={selectedList.includes(label)}
          onClick={() => toggleChip(label)}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;
`;