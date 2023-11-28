import React, { useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import styled from "@emotion/styled";
import FlexBox from "../../common/ui/FlexBox";
import SingleTask from "./SingleTask";
import { H3 } from "../../common/ui/Headings";
import Edit from "../Edit";
import Modal from "../../common/ui/Modal";
import EditTask from "./EditTask";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  background-color: white;
  border-radius: 1rem;
  row-gap: 1rem;
  min-width: 23rem;
  max-width: 30rem;
  @media (max-width: 768px) {
    width: 100%;
    min-width: 20rem;
  }
`;

const ListWrapper = styled(FlexBox)`
  flex-direction: column;
  row-gap: 0.5rem;
`;

const HeadBox = styled(FlexBox)`
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const AddingSingleTask = styled(FlexBox)`
  border-radius: 0.5rem;
  column-gap: 0.5rem;
  align-items: center;
  background-color: white;
  border: none;
  box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const TopOption = styled(FlexBox)`
  cursor: pointer;
  flex-direction: column;
  position: relative;
`;
const EditDeleteContainer = styled(FlexBox)`
  flex-direction: column;
  padding: 1rem;
  position: absolute;
  background-color: white;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  row-gap: 0.5rem;
  top: 60%;
  right: 30%;
`;

const ProjectCard = ({
  projects,
  setProjects,
  filterType,
  heading,
  key,
  deleteProject,
  searchItem,
}) => {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editDeleteBox, setEditDeleteBox] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedHeading, setEditedHeading] = useState(heading.name || "");
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [updatedTaskText, setUpdatedTaskText] = useState("");
  const [taskEdit, setTaskEdit] = useState(false);

  const projectClick = (item, heading) => {
    if (item === "Edit") {
      setModalOpen(!modalOpen);
      console.log("edit is clicked");
    } else if (item === "Delete") {
      console.log(heading.id);
      deleteProject(heading.id);
    }
  };

  const handleCheckBoxClick = () => {
    if (inputText.trim()) {
      const newTask = {
        task: inputText,
        isChecked: false,
      };
      setTasks([...tasks, newTask]);
      setInputText("");
    }
  };

  const onEdit = (index) => {
    setTaskEdit(!taskEdit);
    setSelectedTaskIndex(index);
    setUpdatedTaskText(filteredTask[index - 1].task);
  };
  // const EditTask = () => {};
  const handleUpdate = (updatedValue) => {
    setEditedHeading(updatedValue);
    setModalOpen(false);
  };

  const onDelete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleTaskUpdate = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].task = updatedTask;
    setTasks(updatedTasks);
    setTaskEdit(false); // Close the editing interface after updating
  };

  const handleTaskStatusChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isChecked = !updatedTasks[index].isChecked;
    setTasks(updatedTasks);
  };

  const handleTaskHighlightChange = (index) => {
    const updatedTasks2 = [...tasks];
    updatedTasks2[index].isHighlighted = !updatedTasks2[index].isHighlighted;
    setTasks(updatedTasks2);
  };

  const filterTasks = () => {
    let filteredTasks = tasks;

    if (filterType === "Complete") {
      filteredTasks = filteredTasks.filter((task) => task.isChecked);
    } else if (filterType === "Outstanding") {
      filteredTasks = filteredTasks.filter((task) => task.isHighlighted);
    }

    if (searchItem) {
      filteredTasks = filteredTasks.filter((task) =>
        task.task.toLowerCase().includes(searchItem.toLowerCase())
      );
    }

    return filteredTasks;
  };

  const filteredTask = filterTasks();

  return (
    <Wrapper>
      <HeadBox>
        <H3>{editedHeading}</H3>
        <TopOption>
          <MoreHorizOutlinedIcon
            onClick={() => {
              setEditDeleteBox(!editDeleteBox);
            }}
          />
          {editDeleteBox && (
            <EditDeleteContainer>
              <p onClick={() => projectClick("Edit", heading)}>Edit</p>
              <p onClick={() => projectClick("Delete", heading)}>Delete</p>
            </EditDeleteContainer>
          )}
          {modalOpen && (
            <Modal M1 width="20%" height="20%">
              <Edit
                heading={heading}
                setModalOpen={setModalOpen}
                handleUpdate={handleUpdate}
              />
            </Modal>
          )}
        </TopOption>
      </HeadBox>

      <AddingSingleTask>
        <input type="checkbox" onChange={handleCheckBoxClick} />
        <input
          type="text"
          style={{ border: "none", padding: "0.5rem", width: "100%" }}
          placeholder="write a to-do and hit enter"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCheckBoxClick();
            }
          }}
        />
      </AddingSingleTask>

      <ListWrapper>
        {filteredTask.map((todo, index) => (
          <div key={index}>
            <SingleTask
              key={todo.id}
              text={todo.task}
              isChecked={todo.isChecked}
              isHighlighted={todo.isHighlighted}
              setTaskStatus={() => handleTaskStatusChange(index)}
              setTaskHighlight={() => handleTaskHighlightChange(index)}
              onEdit={() => onEdit(index)}
              onDelete={() => onDelete(index)}
              editTask={() => EditTask(index)}
            />
            {taskEdit && (
              <Modal>
                <EditTask
                  setTaskEdit={setTaskEdit}
                  task={todo.task}
                  handleUpdate={(updatedTask) =>
                    handleTaskUpdate(index, updatedTask)
                  }
                />
              </Modal>
            )}
          </div>
        ))}
      </ListWrapper>
    </Wrapper>
  );
};

export default ProjectCard;
