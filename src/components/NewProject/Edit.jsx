import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 80%;
  height: 90%;
  background-color: white;
  margin: auto;
  padding: 10px;
  // z-index: 10;
`;

const InputBox = styled.div`
  width: 100%;
  border-width: 1px;
  border-color: black;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  margin-vertical: 6px;
`;

const UpdateButton = styled.button`
  background-color: blue;
  border-radius: 8px;
  padding: 10px 20px;
  margin-top: 20px;
  align-self: center;
  color: white;
  border: none;
  cursor: pointer;
`;

const Edit = ({
  open,
  projects,
  userId,
  setProjects,
  selectedProject,
  todoId,
  setmodalOpen,
}) => {
  const [editedProject, setEditedProject] = useState(selectedProject || "");

  const handleProject = (event) => {
    setEditedProject(event.target.value);
  };

  const handleUpdateProject = async () => {
    if (editedProject.trim() !== "") {
      const newProject = projects.filter((project) => project._id === todoId);
      console.log(newProject[0], todoId, editedProject, "this is new project");
      try {
        const response = await axios.patch(
          "https://todo-backend-daem.vercel.app/update-todo",
          {
            userId: userId,
            todoId: todoId,
            todoName: editedProject,
          }
        );

        const updatedData = response.data.todo;

        setProjects((prevProjects) => {
          const updatedProjects = prevProjects.map((project) => {
            if (project._id === updatedData._id) {
              return updatedData;
            }
            return project;
          });
          return updatedProjects;
        });
        console.log(updatedData, "after editing");
      } catch (error) {
        console.log("Error in updating", error);
      }
    }
    setmodalOpen(false);
  };

  return (
    <Wrapper>
      <h1 style={{ fontWeight: "bold", fontSize: 20 }}>
        {selectedProject ? "Edit Project" : "Add New Project"}
      </h1>
      <InputBox>
        <input
          type="text"
          placeholder="Name of your Project"
          onChange={handleProject}
          value={editedProject}
        />
      </InputBox>

      <UpdateButton onClick={handleUpdateProject}>Update Project</UpdateButton>
    </Wrapper>
  );
};

export default Edit;
