import styled from "styled-components";
import FlexBox from "../../common/ui/FlexBox";
import { Body2 } from "../../common/ui/Headings";

const Wrapper = styled(FlexBox)`
  padding: 1.5rem;
  width: 10rem;
  background-color: white;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  row-gap: 0.5rem;
  border: 1px solid black;
  z-index: 10;
`;

const Option = styled(FlexBox)``;

const ClickAblesOpt = ({ data, projectClick, today }) => {
  // Filter the data list based on the today prop
  const filteredData = today
    ? data.filter((item) => item !== "Move to Today")
    : data.filter((item) => item !== "Move to Tomorrow");

  return (
    <Wrapper column>
      {filteredData.map((item, index) => {
        return (
          <Option key={index}>
            <Body2 onClick={() => projectClick(item)}>{item}</Body2>
          </Option>
        );
      })}
    </Wrapper>
  );
};

export default ClickAblesOpt;
