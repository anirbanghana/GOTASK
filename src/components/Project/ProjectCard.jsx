import { useEffect, useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import styled from "@emotion/styled";
import FlexBox from "../../common/ui/FlexBox";
import SingleTask from "./SingleTask";
import { H3 } from "../../common/ui/Headings";
import axios from "axios";
import ClickAblesOpt from "../options/ClickAblesOpt";
import { useRef } from "react";
import Edit from "../NewProject/Edit";
import Modal from "../../common/ui/Modal";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

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
const OptionBox = styled(FlexBox)`
  position: absolute;
  top: 20%;
  right: 1.875rem;
  width: 6rem;
  // padding: 1rem;
  z-index: 1;
  cursor: pointer;
  /* Add styling for the OptionBox component */
`;
const ListWrapper = styled(FlexBox)`
  flex-direction: column;
  row-gap: 0.5rem;
  overflow-y: auto;
  padding-bottom: 1rem;
  max-height: 20rem;
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
  filterType,
  heading,
  key,
  userId,
  projects,
  setProjects,
}) => {
  const [inputText, setInputText] = useState("");
  const [editDeleteBox, setEditDeleteBox] = useState(false);
  const optionRef = useRef(null);
  const [openedDotIndex, setOpenedDotIndex] = useState(null);
  const data = ["Edit", "Delete"];
  const [modalOpen, setmodalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedProject, setSelectedProject] = useState("");
  const [inputTexts, setInputTexts] = useState({});
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [showHighlightedTasks, setShowHighlightedTasks] = useState(false);

  const projectClick = (id, filter) => {
    const project = projects.filter((project) => project._id === id);
    if (filter === "Edit") {
      setEditId(id);
      const newProject = projects.filter((project) => project._id === id);
      setSelectedProject(newProject[0].todoName);
      openModal();
      handleUpdateProject(id);
    } else if (filter === "Delete") {
      // alert(
      //   "Delete Project",
      //   `Are you sure you want to delete ${project.todoName}`,
      //   [
      //     {
      //       text: "Cancel",
      //       style: "cancel",
      //     },
      //     {
      //       text: "Delete",
      //       style: "destructive",
      //       onClick: () => {
      //         console.log("delete is clicked");
      //         handleDeleteProject(id);
      //       },
      //     },
      //   ],
      //   { cancelable: false }
      // );
      setEditId(id);
      handleDeleteProject(id);
    }
    setEditDeleteBox(false);
  };

  const handleDeleteProject = async (id) => {
    const newProject = projects.filter((project) => project._id === id);
    const userId = newProject[0].userId;
    console.log(id, userId, newProject);

    try {
      const response = await axios.delete(
        `https://todo-backend-daem.vercel.app/delete-todo`,
        {
          data: {
            userId: userId,
            todoId: id,
          },
        }
      );

      console.log(response);
      const updatedProjects = projects.filter((project) => project._id !== id);

      setProjects(updatedProjects);
    } catch (error) {
      console.log("error in deleting", error);
    }
  };
  const handleInputChange = (projectId, value) => {
    setInputTexts({
      ...inputTexts,
      [projectId]: value,
    });
  };
  const handleCheckBoxClick = async (projectId) => {
    const newProject = projects.find((project) => project._id === projectId);
    if (inputTexts[projectId]?.trim()) {
      try {
        const response = await axios.post(
          "https://todo-backend-daem.vercel.app/post-task-by-todo",
          {
            userId: newProject.userId,
            todoId: projectId,
            name: inputTexts[projectId],
          }
        );
        const updatedProjects = projects.map((project) => {
          if (project._id === projectId) {
            return {
              ...project,
              tasks: [...project.tasks, response.data.task],
            };
          }
          return project;
        });

        setProjects(updatedProjects);
        setInputTexts({
          ...inputTexts,
          [projectId]: "", // Clear the input text after adding the task
        });
      } catch (error) {
        console.log("Error in adding task", error.message);
      }
    }
  };

  const handleDotOpen = (index) => {
    if (openedDotIndex === index) {
      setOpenedDotIndex(null);
      setEditDeleteBox(false);
    } else {
      setOpenedDotIndex(index);
      setEditDeleteBox(true);
    }
  };
  const handleTaskStatusChange = (itemId, heading) => {
    const updatedProjects = projects?.map((project) => {
      if (project.todoName === heading) {
        const updatedTasks = project.tasks.map((task) => {
          if (task._id === itemId) {
            return { ...task, isChecked: !task.isChecked };
          }
          return task;
        });
        return { ...project, tasks: updatedTasks };
      }
      return project;
    });
    setProjects(updatedProjects);
  };
  const openModal = () => {
    setmodalOpen(true);
  };

  const closeModal = () => {
    setmodalOpen(false);
  };

  const handleTaskHighlightChange = (itemId, heading) => {
    const updatedProjects = projects?.map((project) => {
      if (project.todoName === heading) {
        const updatedTasks = project.tasks.map((task) => {
          if (task._id === itemId) {
            return { ...task, ishighlight: !task.ishighlight };
          }
          return task;
        });
        return { ...project, tasks: updatedTasks };
      }
      return project;
    });
    setProjects(updatedProjects);
    console.log(projects);
  };
  // console.log(projects, "inside the project card");
  return (
    <>
      {projects?.map((item) => (
        <Wrapper key={item._id}>
          <HeadBox>
            <H3>{item.todoName}</H3>
            <TopOption>
              <MoreHorizOutlinedIcon
                onClick={() => {
                  handleDotOpen(item._id);
                }}
              />

              {openedDotIndex === item._id && editDeleteBox && (
                <OptionBox ref={optionRef}>
                  <ClickAblesOpt
                    data={data}
                    projectClick={(filter) => projectClick(item._id, filter)}
                  />
                </OptionBox>
              )}
            </TopOption>
          </HeadBox>
          {modalOpen && (
            <Modal
              M1
              children={
                <Edit
                  userId={userId}
                  close={closeModal}
                  projects={projects}
                  setProjects={setProjects}
                  selectedProject={selectedProject}
                  todoId={editId}
                  setmodalOpen={setmodalOpen}
                />
              }
              togglePopup={modalOpen}
              justifyContent="center"
            />
          )}
          <AddingSingleTask>
            <input
              type="checkbox"
              onChange={() =>
                handleCheckBoxClick(item._id, inputTexts[item._id] || "")
              }
            />
            <input
              type="text"
              style={{ border: "none", padding: "0.5rem", width: "100%" }}
              placeholder="write a to-do and hit enter"
              onChange={(e) => handleInputChange(item._id, e.target.value)}
              value={inputTexts[item._id] || ""}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevent default form submission behavior
                  handleCheckBoxClick(item._id);
                }
              }}
            />
          </AddingSingleTask>
          {/* <ListWrapper>
            {item.tasks.map((task, index) => (
              <SingleTask
                key={task._id}
                text={task.name}
                isChecked={task.isChecked}
                isHighlighted={task.isHighlighted}
                setTaskStatus={() =>
                  handleTaskStatusChange(task._id, item.todoName)
                }
                setTaskHighlight={() => {
                  console.log("highlight is called");
                  handleTaskHighlightChange(task._id, item.todoName);
                }}
                heading={item.todoName}
                projects={projects}
                setProjects={setProjects}
              />
            ))}
          </ListWrapper> */}
          {/* { if (filterType === 'Completed') {
              setShowCompletedTasks(true);
              setShowHighlightedTasks(false);
            } else if (filterType === 'Outstanding') {
              setShowCompletedTasks(false);
              setShowHighlightedTasks(true);
            }
          } */}

          <ListWrapper>
            {item.tasks
              .filter((task) => {
                if (filterType === "Complete") {
                  return task.isChecked;
                } else if (filterType === "Outstanding") {
                  return task.ishighlight;
                }
                return true; // Show all tasks by default
              })
              .map((task, index) => (
                <SingleTask
                  key={task._id}
                  text={task.name}
                  isChecked={task.isChecked}
                  isHighlighted={task.isHighlighted}
                  setTaskStatus={() =>
                    handleTaskStatusChange(task._id, item.todoName)
                  }
                  setTaskHighlight={() =>
                    handleTaskHighlightChange(task._id, item.todoName)
                  }
                  heading={item.todoName}
                  projects={projects}
                  setProjects={setProjects}
                />
              ))}
          </ListWrapper>
        </Wrapper>
      ))}
    </>
  );
};

export default ProjectCard;
