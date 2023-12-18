import Button from "@mui/material/Button";
import React, { useState } from "react";
import FlexBox from "../../common/ui/FlexBox";
import AddNewProject from "../NewProject/AddNewProject";
import Modal from "../../common/ui/Modal";
import { useEffect } from "react";

const NewProjectButton = ({ projects, setProjects, userId }) => {
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
        <Modal M1 togglePopup={modalOpen} justifyContent="center">
          <AddNewProject
            close={closeModal}
            userId={userId}
            projects={projects}
            setProjects={setProjects}
          />
        </Modal>
      )}
    </>
  );
};

export default NewProjectButton;
