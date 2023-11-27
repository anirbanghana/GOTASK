import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ViewGrid from './components/Layout/ViewGrid.jsx';
import { useState } from "react";
function App() {
  const [filterType, setFilterType] = useState("All");
  const [projects, setProjects] = useState([
    "todo",
    "projects",
    "solar",
    "eclipse",
  ]);

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

// <Navbar
//         filterType={filterType}
//         setFilterType={setFilterType}
//         projects={projects}
//         setProjects={setProjects}
//       />
//       <ViewGrid projects={projects} filterType={filterType} />
