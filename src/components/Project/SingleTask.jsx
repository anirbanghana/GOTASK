import React, { useState, useEffect, useRef } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ClickAblesOpt from "../options/ClickAblesOpt";
import styled from "@emotion/styled";
import FlexBox from "../../common/ui/FlexBox";
import axios from "axios";
import Menus from "../Menus";

const Wrapper = styled(FlexBox)`
  border-radius: 0.5rem;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ highlighted }) => (highlighted ? "#E1F1FF" : "white")};
  border: ${({ highlighted }) => (highlighted ? "2px solid #007BFF" : "none")};
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
  top: 60%;
  left: 50%;

  z-index: 10;
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
  isHighlighted,
  heading,
  EditTask,
  DeleteTask,
  setEditText,
  isEditing,
  setIsEditing,
  editId,
  setEditId,
  index,
  moveTomorrow,
  today,
  moveToday,
  divRef,
}) => {
  // const [isHighlighted, setHighlighted] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);

  const [editedText, setEditedText] = useState(text);
  const [anchorEl, setAnchorEl] = useState(null);
  const optionRef = useRef(null);

  const data = [
    "Move to Tomorrow",
    "Highlights",
    "Edit",
    "Delete",
    "Move to Today",
  ];

  const handleCheckboxChange = () => {
    setTaskStatus();
  };

  const handleOptionIconClick = (e) => {
    setOptionOpen(!optionOpen);
    console.log(e, "even");
    // console.log(event, "event clicked");
    setAnchorEl(event.currentTarget);
    console.log(optionOpen, "option open");
  };
  const projectClick = (filterType) => {
    if (filterType === "Edit") {
      handleEditIconClick();

      EditTask();
      console.log(index, editId, "edit is clicked");
    } else if (filterType === "Delete") {
      DeleteTask();
    } else if (filterType === "Highlights") {
      console.log("highlight is clicked", isHighlighted);
      setTaskHighlight();
    } else if (filterType === "Move to Tomorrow") {
      moveTomorrow();
    } else if (filterType === "Move to Today") moveToday();
    setOptionOpen(false);
  };
  const handleHighlightClick = () => {};
  const handleEditIconClick = () => {
    setOptionOpen(false);
    setIsEditing(true);
  };
  const handleEditInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleEditTask = () => {
    EditTask(editedText);
    setIsEditing(false);
    setEditId(null);
  };
  const handleDocumentClick = (e) => {
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
  // console.log(ref,"ref ")

  return (
    <Wrapper highlighted={isHighlighted}>
      {isEditing && editId === index ? (
        <InputBox
          style={{ textDecoration: isChecked ? "line-through" : "none" }}
        >
          <input
            type="text"
            value={editedText}
            onChange={handleEditInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEditTask();
              }
            }}
          />
        </InputBox>
      ) : (
        <InputBox
          style={{ textDecoration: isChecked ? "line-through" : "none" }}
        >
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <p onClick={handleCheckboxChange}>{text}</p>
        </InputBox>
      )}
      <CRUDbox>
        <MoreHorizOutlinedIcon onClick={handleOptionIconClick} />

        {optionOpen && (
          <OptionBox ref={optionRef}>
            <ClickAblesOpt
              today={today}
              optionOpen={optionOpen}
              optionRef={optionRef}
              data={data}
              projectClick={(filter) => projectClick(filter)}
            />
          </OptionBox>
        )}
      </CRUDbox>
    </Wrapper>
  );
};

export default SingleTask;
