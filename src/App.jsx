import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Main from "./Main";

function App() {
  const [filterType, setFilterType] = useState("All");
  const [projects, setProjects] = useState([]);
  const [userId, setUserId] = useState(() => {
    // Fetch userId from local storage if available, else return null
    return localStorage.getItem("userId") || null;
  });

  useEffect(() => {
    if (userId) {
      // Fetch user data when userId exists
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://todo-backend-daem.vercel.app/get-all-todos/${userId}`
          );
          setProjects(response.data.todo);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [userId]);

  return (
    <BrowserRouter>
      <Routes>
        {/* If userId exists, redirect to the homepage, else redirect to login */}
        <Route
          path="/"
          element={
            userId ? (
              <Main
                projects={projects}
                setProjects={setProjects}
                userId={userId}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login setUserId={setUserId} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
