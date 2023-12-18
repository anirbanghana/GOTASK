import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ViewGrid from "./components/Layout/ViewGrid.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

function Main({ projects, setProjects, userId }) {
  const [filterType, setFilterType] = useState("All");

  //   useEffect(() => {
  //     axios
  //       .get(
  //         "https://todo-backend-daem.vercel.app/get-all-todos/6576aaae6c2e044a510b424e"
  //       )
  //       .then((response) => {
  //         setProjects(response.data.todo);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   }, []);

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
{
  /* <BrowserRouter>
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/homepage" element={<App />} />
  <Route path="/register" element={<Register />} />

</Routes>
</BrowserRouter> */
}
