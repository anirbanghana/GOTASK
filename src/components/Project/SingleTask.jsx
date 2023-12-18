import React, { useState, useEffect, useRef } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ClickAblesOpt from "../options/ClickAblesOpt";
import styled from "@emotion/styled";
import FlexBox from "../../common/ui/FlexBox";

const Wrapper = styled(FlexBox)`
  border-radius: 0.5rem;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ isHighlighted }) =>
    isHighlighted ? "#E1F1FF" : "white"};
  border: ${({ isHighlighted }) =>
    isHighlighted ? "2px solid #007BFF" : "none"};
  box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  position: relative;
`;

const InputBox = styled(FlexBox)`
  column-gap: 1rem;
  align-items: center;
  cursor: pointer;
`;

const CRUDbox = styled(FlexBox)`
  cursor: pointer;
`;

const OptionBox = styled(FlexBox)`
  position: absolute;
  top: 70%;
  left: 50%; const handleDeleteProject = async (id) => {
    const project = projects.filter((project) => project._id === id);
    try {
      const response = await axios.delete(
        "https://todo-backend-daem.vercel.app/delete-todo",
        {
          userId: project.userId,
          todoId: id,
        }
      );
      console.log(response.data);
      const updatedProjects = projects.filter((project) => project._id != id);
      setProjects(updatedProjects);
    } catch (error) {
      console.log("error in deleting", error);
    }
  };

  z-index: 1;
  cursor: pointer;
  /* Add styling for the OptionBox component */
`;
const TaskBox = styled(FlexBox)`
  background-color: white;
  border: 1px solid black;
`;
const SingleTask = ({
  projects,
  setProjects,
  text,
  isChecked,
  setTaskStatus,
  setTaskHighlight,
  heading,
}) => {
  const [isHighlighted, setHighlighted] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);
  const optionRef = useRef(null);

  const data = ["Move to Tomorrow", "Highlights", "Edit", "Delete"];

  const handleCheckboxChange = () => {
    setTaskStatus(); // Update the task's isChecked status
  };

  const handleOptionIconClick = () => {
    setOptionOpen(!optionOpen);
  };

  const handleHighlightClick = () => {
    setTaskHighlight();
    setHighlighted(!isHighlighted);
    setOptionOpen(false); // Close the options after clicking "Highlight"
  };

  const handleDocumentClick = (e) => {
    // Close the OptionBox if the click is outside the OptionBox
    if (
      optionOpen &&
      optionRef.current &&
      !optionRef.current.contains(e.target)
    ) {
      setOptionOpen(false);
    }
  };
  const filteredTasks = projects.filter(
    (project) => project.todoName === heading
  );
  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [optionOpen]);
  // console.log(filteredTasks[0]?.tasks, heading, "single card");
  return (
    <Wrapper isHighlighted={isHighlighted}>
      <InputBox style={{ textDecoration: isChecked ? "line-through" : "none" }}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <p onClick={handleCheckboxChange}>{text}</p>
      </InputBox>
      <CRUDbox>
        <MoreHorizOutlinedIcon onClick={handleOptionIconClick} />
        {optionOpen && (
          <OptionBox ref={optionRef}>
            <ClickAblesOpt
              onHighlightClick={handleHighlightClick}
              data={data}
            />
          </OptionBox>
        )}
      </CRUDbox>
    </Wrapper>
  );
};

export default SingleTask;
