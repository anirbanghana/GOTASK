import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ViewGrid from "./components/Layout/ViewGrid.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Login/Register.jsx";
import Main from "./Main.jsx";

function App() {
  const [filterType, setFilterType] = useState("All");
  const [projects, setProjects] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    console.log(userId, "in app");
    const fetchData = async () => {
      console.log(userId);
      try {
        const response = await axios.get(
          `https://todo-backend-daem.vercel.app/get-all-todos/${userId}`
        );

        setProjects(response.data.todo);
        // console.log("this is in the app side",response.data.todo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    // <>
    //   <Navbar
    //     filterType={filterType}
    //     setFilterType={setFilterType}
    //     projects={projects}
    //     setProjects={setProjects}
    //   />
    //   <ViewGrid
    //     projects={projects}
    //     setProjects={setProjects}
    //     filterType={filterType}
    //   />
    // </>

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login userId={userId} setUserId={setUserId} />}
        />
        <Route
          path="/homepage"
          element={
            <Main
              projects={projects}
              setProjects={setProjects}
              userId={userId}
            />
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
{
  /*  */
}
