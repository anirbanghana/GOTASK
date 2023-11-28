import React, { useState } from "react";
import FlexBox from "../../common/ui/FlexBox";
import { Body2 } from "../../common/ui/Headings";

const EditTask = ({ task, setTaskEdit, handleUpdate }) => {
  const [inputValue, setInputValue] = useState(task);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const updateText = () => {
    handleUpdate(inputValue);
    setTaskEdit(false); // Close the editing interface after updating
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
          {/* Corrected the onClick event handler */}
          <Body2 onClick={updateText}>Update</Body2>
        </FlexBox>
        <FlexBox borderRadius="10px" backgroundColor="blue" padding="10px">
          <Body2 onClick={() => setTaskEdit(false)}>Cancel</Body2>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default EditTask;
