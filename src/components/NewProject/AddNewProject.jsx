import React, { useState } from "react";
import styled from "styled-components";
import FlexBox from "../../common/ui/FlexBox";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
const Wrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f8;
  padding: 2rem;
  overflow-y: auto;
  position: relative;
  padding: 3rem 0.5rem;
`;

const Container = styled(FlexBox)`
  width: fit-content;
  justify-self: center;
  align-items: center;
  row-gap: 1rem;
`;

const FormGroup = styled(FlexBox)`
  flex-direction: row;
  align-items: center;
  column-gap: 0.5rem;
`;

const Label = styled.label`
  display: block;
`;

const Input = styled.input`
  max-height: 3rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  box-sizing: border-box;
`;

const SubmitButton = styled(FlexBox)`
  background-color: #007bff;
  color: #fff;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 1.5rem;
  cursor: pointer;
  margin: 0.5rem;
  font-weight: bold;
  align-items: center;
`;

const Close = styled(IoIosClose)`
  position: absolute;
  top: 5px;
  right: 5px;
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

//main function and components

const AddNewProject = ({ close, projects, setProjects }) => {
  const [formData, setFormData] = useState("");

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const AdditionProject = async () => {
    try {
      if (formData.trim() === "") {
        alert("Project title cannot be empty");
        return;
      }
      const response = await axios.post(
        "https://todo-backend-daem.vercel.app/post-todo",
        {
          todoName: formData,
          // userId: "6576aaae6c2e044a510b424e",
        }
      );
      console.log(response.status, "gg");
      if (response.ok) {
        // Update the state with the new project
        console.log("pushed");
        setProjects([...projects, response.data]);
        setFormData("");
        close();
      } else {
        console.error("Error adding project:", response.data);
        alert("Failed to add project. Please try again.");
      }
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed . Please try again.");
    }
  };

  const handleClose = () => {
    close();
  };

  return (
    <Wrapper>
      <Close onClick={handleClose} />
      <Container column>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            value={formData}
            onChange={handleChange}
          />
        </FormGroup>
        <SubmitButton onClick={AdditionProject}>Submit</SubmitButton>
      </Container>
    </Wrapper>
  );
};

export default AddNewProject;
