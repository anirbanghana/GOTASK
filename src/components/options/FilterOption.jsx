import styled from "styled-components";
import FlexBox from "../../common/ui/FlexBox";
import { Body2 } from "../../common/ui/Headings";

const Wrapper = styled(FlexBox)`
  padding: 1rem;
  width: fit-content;
  background-color: white;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  row-gap: 0.3rem;
`;

const Option = styled(FlexBox)`
  cursor: pointer;
`;

const FilterOption = ({
  filterType,
  setFilterType,
  setFilterOptionVisible,
  isFilterOptionVisible,
}) => {
  const handleClick = (filter) => {
    setFilterType(filter);
    console.log(filter);
  };

  return (
    <Wrapper column>
      <Option
        onClick={() => {
          setFilterOptionVisible(!isFilterOptionVisible);
          handleClick("All");
        }}
      >
        <Body2>All</Body2>
      </Option>
      <Option
        onClick={() => {
          setFilterOptionVisible(!isFilterOptionVisible);
          handleClick("Outstanding");
        }}
      >
        <Body2>Outstanding</Body2>
      </Option>
      <Option
        onClick={() => {
          setFilterOptionVisible(!isFilterOptionVisible);
          handleClick("Complete");
        }}
      >
        <Body2>Complete</Body2>
      </Option>
    </Wrapper>
  );
};

export default FilterOption;
