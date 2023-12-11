import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ViewGrid from './components/Layout/ViewGrid.jsx';
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [filterType, setFilterType] = useState("All");
  const [projects, setProjects] = useState([]);

   useEffect(() => {
     axios
       .get(
         "https://todo-backend-daem.vercel.app/get-all-todos/6576aaae6c2e044a510b424e"
       )
       .then((response) => {
         setProjects(response.data.todo.map((ele)=>ele.todoName));
       })
       .catch((error) => {
         console.error("Error fetching data:", error);
       });
   }, []);

  return (
    <>
      <Navbar
        filterType={filterType}
        setFilterType={setFilterType}
        projects={projects}
        setProjects={setProjects}
      />
      <ViewGrid projects={projects} filterType={filterType} />
    </>
  );
}

export default App;
