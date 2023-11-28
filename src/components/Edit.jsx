// Edit.js

import React, { useState } from "react";
import FlexBox from "../common/ui/FlexBox";
import { Body2 } from "../common/ui/Headings";

const Edit = ({ heading, setModalOpen, handleUpdate }) => {
  const [inputValue, setInputValue] = useState(heading.name);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const updateText = () => {
    // Pass the updated value to the parent component using handleUpdate
    handleUpdate(inputValue);
  };

  return (
    <FlexBox column rowGap="10px">
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <FlexBox justify="center" columnGap="10px">
        <FlexBox
          borderRadius="10px"
          backgroundColor="blue"
          padding="0.2rem"
          align="center"
        >
          <Body2 onClick={updateText}>Update</Body2>
        </FlexBox>
        <FlexBox borderRadius="10px" backgroundColor="blue" padding="10px">
          <Body2 onClick={() => setModalOpen(false)}>Cancel</Body2>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default Edit;
