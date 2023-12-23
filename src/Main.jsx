import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ViewGrid from "./components/Layout/ViewGrid.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

function Main({ projects, setProjects, userId }) {
  const [filterType, setFilterType] = useState("All");

  return (
    <>
      <Navbar
        filterType={filterType}
        setFilterType={setFilterType}
        projects={projects}
        userId={userId}
        setProjects={setProjects}
      />
      <ViewGrid
        projects={projects}
        setProjects={setProjects}
        filterType={filterType}
        userId={userId}
      />
    </>
  );
}

export default Main;
