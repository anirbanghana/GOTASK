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
import { ConstructionOutlined } from "@mui/icons-material";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  background-color: white;
  border-radius: 1rem;
  row-gap: 1rem;
  min-width: 23rem;
  max-width: 30rem;
  height: 30rem;
  // position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    width: 100%;
    min-width: 20rem;
    z-index: 1;
  }
`;
const OptionBox = styled(FlexBox)`
  position: absolute;
  top: 25%;
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
  padding-bottom: 3rem;
  // background-color: red;
  // max-height: 40rem;
  height: 100%;
  position: relative;
  z-index: 1;
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

const NewOptionBox = styled(FlexBox)`
  position: absolute;
  top: 60%;
  left: 50%;

  z-index: 10;
  cursor: pointer;
  /* Add styling for the OptionBox component */
`;

const ProjectCard = ({
  filterType,
  userId,
  projects,
  setProjects,
  today,
  setSearchText,
  searchText,
}) => {
  const [editDeleteBox, setEditDeleteBox] = useState(false);
  const optionRef = useRef(null);
  const [openedDotIndex, setOpenedDotIndex] = useState(null);
  const data = ["Edit", "Delete"];
  const [modalOpen, setmodalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedProject, setSelectedProject] = useState("");
  const [inputTexts, setInputTexts] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);
  const divRef = useRef(null);
  const projectClick = (id, filter) => {
    const project = projects.filter((project) => project._id === id);
    if (filter === "Edit") {
      setEditId(id);
      const newProject = projects.filter((project) => project._id === id);
      setSelectedProject(newProject[0].todoName);
      openModal();
    } else if (filter === "Delete") {
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

  const handleUpdateTask = async (id, projectId, editText) => {
    setEditId(id);
    try {
      const response = await axios.patch(
        `https://todo-backend-daem.vercel.app/update-task-by-todo/${id}`,
        {
          name: editText,
        }
      );

      const updatedTasks = projects.map((project) => {
        if (project.todoName === projectId) {
          const updatedTaskList = project.tasks.map((task) => {
            if (task._id === id) {
              return { ...task, name: editText };
            }
            return task;
          });
          return { ...project, tasks: updatedTaskList };
        }
        return project;
      });

      setProjects(updatedTasks);
      console.log(response.data);
    } catch (error) {
      console.log("Error in updating task", error);
    }
  };

  const handleDeleteTask = async (id, projectId) => {
    try {
      await axios.delete(
        `https://todo-backend-daem.vercel.app/delete-task-by-todo/${id}`
      );
      const updatedProjects = projects.map((project) => {
        if (project.todoName === projectId) {
          const updatedTasks = project.tasks.filter((task) => task._id !== id);
          return {
            ...project,
            tasks: updatedTasks,
          };
        }
        return project;
      });

      setProjects(updatedProjects);
    } catch (error) {
      console.log("error in deleting ", error.message);
    }
  };
  const handleCheckBoxClick = async (projectId) => {
    console.log(inputTexts[projectId]);
    const newProject = projects.find((project) => project._id === projectId);
    if (inputTexts[projectId]?.trim()) {
      try {
        const response = await axios.post(
          "https://todo-backend-daem.vercel.app/post-task-by-todo",
          {
            userId: newProject.userId,
            todoId: projectId,
            name: inputTexts[projectId],
            Date: today
              ? currentDate.toLocaleString()
              : tomorrowDate.toLocaleString(),
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
        console.log(response.data.task);
        console.log(updatedProjects);
        setProjects(updatedProjects);
        console.log(projects);
        setInputTexts({
          ...inputTexts,
          [projectId]: "",
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

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate());
  const dateStringtoday = currentDate;
  const dateNewtoday = new Date(currentDate);
  const formattedTodayDate =
    ("0" + dateNewtoday.getDate()).slice(-2) +
    "/" +
    ("0" + (dateNewtoday.getMonth() + 1)).slice(-2) +
    "/" +
    dateNewtoday.getFullYear();
  const tomorrowDate = new Date();
  tomorrowDate.setDate(currentDate.getDate() + 1);
  const dateStringNew = tomorrowDate;
  const dateNew = new Date(dateStringNew);
  const formattedDate =
    ("0" + dateNew.getDate()).slice(-2) +
    "/" +
    ("0" + (dateNew.getMonth() + 1)).slice(-2) +
    "/" +
    dateNew.getFullYear();

  const handleMoveToday = async (itemId, heading) => {
    const response = await axios.patch(
      `https://todo-backend-daem.vercel.app/update-task-by-todo/${itemId}`,
      {
        isToday: true,
      }
    );
    console.log(response.data.updatedTask);
    const updatedTask = response.data.updatedTask;
    const updatedProjects = projects.map((project) => {
      if (project.todoName === heading) {
        const updatedTasks = project.tasks.map((task) => {
          if (task._id === itemId) {
            return {
              ...task,
              isToday: true,
            };
          }
          return task;
        });

        return {
          ...project,
          tasks: updatedTasks,
        };
      }
      return project;
    });

    setProjects(updatedProjects);
  };

  const handleMoveTomorrow = async (itemId, heading) => {
    console.log(itemId, heading);

    const response = await axios.patch(
      `https://todo-backend-daem.vercel.app/update-task-by-todo/${itemId}`,
      {
        isToday: false,
      }
    );
    console.log(response.data.updatedTask);
    const updatedTask = response.data.updatedTask;
    const updatedProjects = projects.map((project) => {
      if (project.todoName === heading) {
        const updatedTasks = project.tasks.map((task) => {
          if (task._id === itemId) {
            return {
              ...task,
              isToday: false,
            };
          }
          return task;
        });

        return {
          ...project,
          tasks: updatedTasks,
        };
      }
      return project;
    });

    setProjects(updatedProjects);
  };

  const handleTaskStatusChange = async (itemId, heading) => {
    console.log(itemId, heading);
    const newProject = projects.filter(
      (project) => project.todoName === heading
    );
    const task = newProject[0].tasks.filter((task) => task._id === itemId);
    console.log(task[0].isChecked);
    const checked = task[0].isChecked;
    const response = await axios.patch(
      `https://todo-backend-daem.vercel.app/update-task-by-todo/${itemId}`,
      {
        isChecked: !task[0].isChecked,
      }
    );
    console.log(response.data.updatedTask);
    const updatedTask = response.data.updatedTask;
    const updatedProjects = projects.map((project) => {
      if (project.todoName === heading) {
        const updatedTasks = project.tasks.map((task) => {
          if (task._id === itemId) {
            return {
              ...task,
              isChecked: updatedTask.isChecked,
            };
          }
          return task;
        });

        return {
          ...project,
          tasks: updatedTasks,
        };
      }
      return project;
    });

    setProjects(updatedProjects);
  };
  const handleTaskHighlightChange = async (itemId, heading) => {
    console.log(itemId, heading);
    const newProject = projects.filter(
      (project) => project.todoName === heading
    );
    const task = newProject[0].tasks.filter((task) => task._id === itemId);
    console.log(task[0].ishighlight, "highlight");
    const response = await axios.patch(
      `https://todo-backend-daem.vercel.app/update-task-by-todo/${itemId}`,
      {
        ishighlight: !task[0].ishighlight,
      }
    );
    console.log(response.data.updatedTask);
    const updatedTask = response.data.updatedTask;
    const updatedProjects = projects.map((project) => {
      if (project.todoName === heading) {
        const updatedTasks = project.tasks.map((task) => {
          if (task._id === itemId) {
            return {
              ...task,
              ishighlight: updatedTask.ishighlight,
            };
          }
          return task;
        });

        return {
          ...project,
          tasks: updatedTasks,
        };
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

  const todayTomorrow = (task) => {
    console.log(task.isToday);
    if (today) {
      return task.isToday;
    } else return !task.isToday;
  };

  const searchItem = (task) => {
    if (searchText) {
      if (task.name && typeof task.name === "string") {
        return task.name.toLowerCase().includes(searchText.toLowerCase());
      }
    }
    return true;
  };

  const handleTarget = (event) => {
    // console.log(event.target.getBoundingClientRect().left, "left");
    // console.log(event.currentTarget.getBoundingClientRect().left, "left");
    console.log(
      event,
      divRef.current.getBoundingClientRect().bottom,
      "inner div"
    );
    // console.log(event.target.getBoundingClientRect().bottom, "main Div ");
    console.log(event.screenY, "main Div ");
  };

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
              height="50%"
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
                  e.preventDefault();
                  handleCheckBoxClick(item._id);
                }
              }}
            />
          </AddingSingleTask>

          <ListWrapper>
            {item.tasks
              ?.filter((task) => {
                if (filterType === "Complete") {
                  return (
                    task.isChecked && searchItem(task) && todayTomorrow(task)
                  );
                } else if (filterType === "Outstanding") {
                  return (
                    task.ishighlight && searchItem(task) && todayTomorrow(task)
                  );
                }

                return searchItem(task) && todayTomorrow(task);
              })
              ?.map((task, index) => (
                <SingleTask
                  key={task._id}
                  index={task._id}
                  text={task.name}
                  optionOpen={optionOpen}
                  setOptionOpen={setOptionOpen}
                  today={today}
                  setEditId={setEditId}
                  editId={editId}
                  isChecked={task.isChecked}
                  isHighlighted={task.ishighlight}
                  divRef={divRef}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  setTaskStatus={() =>
                    handleTaskStatusChange(task._id, item.todoName)
                  }
                  setTaskHighlight={() =>
                    handleTaskHighlightChange(task._id, item.todoName)
                  }
                  EditTask={(editText) => {
                    handleUpdateTask(task._id, item.todoName, editText);
                  }}
                  DeleteTask={() => handleDeleteTask(task._id, item.todoName)}
                  moveTomorrow={() =>
                    handleMoveTomorrow(task._id, item.todoName)
                  }
                  moveToday={() => handleMoveToday(task._id, item.todoName)}
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
