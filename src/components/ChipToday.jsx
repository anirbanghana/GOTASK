import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";

const Wrapper = styled(FlexBox)`
  padding: 0.5rem 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: fit-content;
  z-index: 1;
`;

const ChipToday = ({ isToday }) => {
  return <Wrapper>{isToday ? <p>Today</p> : <p>Tomorrow</p>}</Wrapper>;
};

export default ChipToday;
