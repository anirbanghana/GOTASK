import React from "react";
import styled from "styled-components";

import FlexBox from "./FlexBox";

const Wrapper = styled(FlexBox)`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Loader = ({ height }) => {
  return (
    <Wrapper>
      <img
        src="/assets/images/loading.gif"
        height={height || "90px"}
        alt="loader"
      />
      Loader
    </Wrapper>
  );
};

export default Loader;
