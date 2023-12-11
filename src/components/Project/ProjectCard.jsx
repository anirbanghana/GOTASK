import { useEffect, useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import styled from "@emotion/styled";
import FlexBox from "../../common/ui/FlexBox";
import SingleTask from "./SingleTask";
import { H3 } from "../../common/ui/Headings";
import axios from "axios";

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
  overflow-y: auto;
  max-height: 20rem;
  padding-bottom:1rem;
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

const dummydata = [
  {
    projectName: "work",
    id: 1,
    tasks: [
      {
        id: "a1",
        taskname: "buy apple",
      },
      {
        id: "a2",
        taskname: "buy banan",
      },
      {
        id: "a3",
        taskname: "buy cat",
      },
    ],
  },
  {
    projectName: "personal",
    id: 2,
    tasks: [
      {
        id: "a1",
        taskname: "eat apple",
      },
      {
        id: "a2",
        taskname: "eat banan",
      },
      {
        id: "a3",
        taskname: " cat farming",
      },
    ],
  },
];

const ProjectCard = ({ filterType, heading, key,data }) => {
  const [tasks, setTasks] = useState([{ task: "appleee", isChecked: "0" }]);
  const [inputText, setInputText] = useState("");
  const [editDeleteBox, setEditDeleteBox] = useState(false);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://todo-backend-daem.vercel.app/get-all-todos/6576aaae6c2e044a510b424e"
  //     )
  //     .then((response) => {
  //       setData(response.data.todo);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  const projectClick = () => {
    if (filterType === "Edit") {
      setModalVisible(true);
      setSelectedProject(projects[index].name);
    } else if (filterType === "Delete") {
      alert(
        "Delete Project",
        `Are you sure you want to delete ${projects[index].name}`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onClick: () => {
              const updatedProjects = [...projects];
              updatedProjects.splice(index, 1);
              setProjects(updatedProjects);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handleCheckBoxClick = () => {
    if (inputText.trim()) {
      const newTask = {
        task: inputText,
        isChecked: false,
      };
      setTasks([...tasks, newTask]);
      setInputText(""); // Clear input field after adding task
    }
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

  // Filter tasks based on filterType
  const filterTasks = () => {
    if (filterType === "All") {
      return tasks;
    } else if (filterType === "Complete") {
      return tasks.filter((task) => task.isChecked);
    } else if (filterType === "Outstanding") {
      return tasks.filter((task) => task.isHighlighted);
    }
    return tasks;
  };

  const filteredTask = filterTasks();
  console.log(data, "hello");

  return (
    <>
      {data.map((item) => (
        <Wrapper key={item._id}>
          <HeadBox>
            <H3>{item.todoName}</H3>
            <TopOption>
              <MoreHorizOutlinedIcon
                onClick={() => {
                  setEditDeleteBox(!editDeleteBox);
                }}
              />
              {editDeleteBox && (
                <EditDeleteContainer>
                  <p onClick={projectClick("Edit")}>Edit</p>
                  <p onClick={projectClick("Delete")}>Delete</p>
                </EditDeleteContainer>
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
            {item.tasks.map((task)=>(<SingleTask
              key={task.id}
              text={task.name}
              isChecked={"todo.isChecked"} //prev todo->task
              isHighlighted={"todo.isHighlighted"}
              // Pass the function to handle task status change
              // setTaskStatus={() => handleTaskStatusChange(index)}
              // setTaskHighlight={() => handleTaskHighlightChange(index)}
            />))}
          </ListWrapper>
        </Wrapper>
      ))}
    </>
    //   <ListWrapper>
    //     {filteredTask.map((todo, index) => (

    //     ))}
    //   </ListWrapper>
  );
};

export default ProjectCard;
