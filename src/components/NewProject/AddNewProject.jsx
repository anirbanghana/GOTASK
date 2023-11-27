import React, { useState } from "react";
import styled from "styled-components";
import FlexBox from "../../common/ui/FlexBox";
import { IoIosClose } from "react-icons/io";
const Wrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items:center;
  background-color: #f6f6f8;
  padding: 2rem;
  overflow-y: auto;
  position: relative;
  padding: 3rem 0.5rem;
`;

const Container = styled(FlexBox)`
width: fit-content;
  justify-self: center;
  align-items:center;
  row-gap:1rem;
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
  align-items:center;
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

  const AdditionProject = () => {
    // Assuming projects is an array
    setProjects([...projects, formData]);
    // Reset formData after adding the new project
    setFormData("");
    // Close the modal or perform other actions if needed
    close();
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
