import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ViewGrid from "./components/Layout/ViewGrid.jsx";
import { useState } from "react";
function App() {
  const [filterType, setFilterType] = useState("All");
  const [searchItem, setSearchItem] = useState("");
  const [projects, setProjects] = useState([
    { id: 1, name: "todo" },
    { id: 2, name: "Solar" },
    { id: 3, name: "menu" },
    { id: 4, name: "Software" },
  ]);

  return (
    <>
      <Navbar
        filterType={filterType}
        setFilterType={setFilterType}
        projects={projects}
        setProjects={setProjects}
        setSearchItem={setSearchItem}
        searchItem={searchItem}
      />
      <ViewGrid
        projects={projects}
        filterType={filterType}
        setProjects={setProjects}
        searchItem={searchItem}
      />
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
