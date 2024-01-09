import React, { useState, useEffect, useRef } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ClickAblesOpt from "../options/ClickAblesOpt";
import styled from "@emotion/styled";
import FlexBox from "../../common/ui/FlexBox";
import axios from "axios";
import Menus from "../Menus";
import { device } from "../../common/ui/Resposive";

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
  top: ${({ change }) => (change ? "-10rem" : "40%")};
  left: 40%;

  z-index: 10;
  cursor: pointer;
  @media ${device.laptop} {
    left: 50%;
  }
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
  const [optionOpen, setOptionOpen] = useState(false);

  const [editedText, setEditedText] = useState(text);
  const [anchorEl, setAnchorEl] = useState(null);
  const optionRef = useRef(null);
  const [change, setChange] = useState(false);
  const [parentElement, setParentElement] = useState(null);
  const [element, setElement] = useState(null);
  const [spaceAboveNew, setSpaceAbove] = useState(0);
  const [spaceBelowNew, setSpaceBelow] = useState(0);
  const [optionTop, setOptionTop] = useState(0);

  const data = [
    "Move to Tomorrow",
    "Highlight",
    "Edit",
    "Delete",
    "Move to Today",
  ];

  const handleCheckboxChange = () => {
    setTaskStatus();
  };

  const calculateDistanceToBottom = () => {
    const parentContainer = element?.parentElement;
    const taskRect = parentElement?.getBoundingClientRect();
    const parentRect = parentContainer?.getBoundingClientRect();
    console.log(parentContainer, "option ref");
    console.log(taskRect, "task Rect");

    if (!parentRect || !taskRect) {
      return null;
    }

    const spaceBelow = parentRect.bottom - taskRect.top;
    const spaceAbove = taskRect.bottom - parentRect.top;

    return { spaceBelow, spaceAbove };
  };

  const handleOptionIconClick = () => {
    const distances = calculateDistanceToBottom();
    console.log(distances, "distance");

    if (!distances) {
      setOptionOpen(true);
      return;
    }

    const { spaceBelow, spaceAbove } = distances;
    console.log(spaceBelow, spaceAbove, "space", optionOpen);

    if (spaceAbove - spaceBelow > 50) {
      // setChange(true);
      setChange((prevChange) => {
        if (!prevChange) {
          // setOptionOpen(true);
        }
        return true;
      });
      console.log(change, "change");
    }
    // } else {
    setOptionOpen(true);
    // }
  };
  useEffect(() => {
    console.log("Change value after update:", change);
  }, [change]);

  const projectClick = (filterType) => {
    if (filterType === "Edit") {
      handleEditIconClick();

      EditTask();
      console.log(index, editId, "edit is clicked");
    } else if (filterType === "Delete") {
      DeleteTask();
    } else if (filterType === "Highlight") {
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

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [optionOpen]);
  useEffect(() => {
    setParentElement(optionRef.current);
    setElement(optionRef.current);
    console.log(parentElement, "parentElements");
  }, [element]);

  return (
    <Wrapper highlighted={isHighlighted} ref={optionRef}>
      {isEditing && editId === index ? (
        <InputBox
          style={{ textDecoration: isChecked ? "line-through" : "none" }}
        >
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleEditTask}
          />
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
          <OptionBox change={change} ref={optionRef} id="dot-container">
            <ClickAblesOpt
              today={today}
              optionOpen={optionOpen}
              // optionRef={optionRef}
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
