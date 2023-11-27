import Button from "@mui/material/Button";
import React, { useState } from "react";
import FlexBox from "../../common/ui/FlexBox";
import AddNewProject from "../NewProject/AddNewProject";
import Modal from "../../common/ui/Modal";

const NewProjectButton = ({ projects, setProjects }) => {
  const [modalOpen, setmodalOpen] = useState(false);

  const openModal = () => {
    setmodalOpen(true);
  };

  const closeModal = () => {
    setmodalOpen(false);
  };

  return (
    <>
      <FlexBox onClick={openModal}>
        <Button disableElevation="true" variant="contained">
          + ‎ ADD NEW PROJECT
        </Button>
      </FlexBox>
      {modalOpen && (
        <Modal
          M1
          children={
            <AddNewProject
              close={closeModal}
              projects={projects}
              setProjects={setProjects}
            />
          }
          togglePopup={modalOpen}
          justifyContent="center"
        />
      )}
    </>
  );
};

export default NewProjectButton;
