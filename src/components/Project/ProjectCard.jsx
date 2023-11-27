import { useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import styled from "@emotion/styled";
import FlexBox from "../../common/ui/FlexBox";
import SingleTask from "./SingleTask";
import { H3 } from "../../common/ui/Headings";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  background-color: white;
  border-radius: 1rem;
  row-gap: 1rem;
  min-width: 23rem;
  max-width:30rem;
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

const TopOption=styled(FlexBox)`
cursor:pointer;
flex-direction:column;
position:relative;
`
const EditDeleteContainer=styled(FlexBox)`
flex-direction:column;
padding:1rem;
position:absolute;
background-color:white;
box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.1);
border-radius:0.5rem;
row-gap:0.5rem;
top:60%;
right:30%;
`

const ProjectCard = ({ filterType, heading, key, }) => {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editDeleteBox,setEditDeleteBox]=useState(false);

  const projectClick=()=>{
    if (filterType === 'Edit') {
      setModalVisible(true);
      setSelectedProject(projects[index].name);
    } else if (filterType === 'Delete') {
      alert(
        'Delete Project',
        `Are you sure you want to delete ${projects[index].name}`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onClick: () => {
              const updatedProjects = [...projects];
              updatedProjects.splice(index, 1);
              setProjects(updatedProjects);
            },
          },
        ],
        {cancelable: false},
);}
  }

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

  return (
    <Wrapper>
      <HeadBox>
        <H3>{heading}</H3>
        <TopOption>
        <MoreHorizOutlinedIcon onClick={()=>{setEditDeleteBox(!editDeleteBox)}}/>
        {editDeleteBox &&<EditDeleteContainer>
          <p onClick={projectClick("Edit")}>Edit</p>
          <p onClick={projectClick("Delete")}>Delete</p>
        </EditDeleteContainer>}
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
          <SingleTask
            key={index}
            text={todo.task}
            isChecked={todo.isChecked}
            isHighlighted={todo.isHighlighted}
            // Pass the function to handle task status change
            setTaskStatus={() => handleTaskStatusChange(index)}
            setTaskHighlight={()=>handleTaskHighlightChange(index)}
          />
        ))}
      </ListWrapper>
    </Wrapper>
  );
};

export default ProjectCard;