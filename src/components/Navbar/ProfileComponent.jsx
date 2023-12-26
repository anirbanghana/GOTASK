import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "../../common/ui/Modal";
import { useNavigate } from "react-router-dom";
import userImg from "../../../src/assets/userimg.png";

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UserPicContainer = styled.div`
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.5rem;
  width: 50px;
  height: 50px;
`;

const UserPic = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const UserDesignation = styled.div`
  font-size: 0.7rem;
  color: #888;
`;

const SignOutBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    padding: 1rem;
    flex-direction: column;
    row-gap: 1rem;
    min-width: 75vw;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 1rem;

  @media (max-width: 900px) {
    flex-direction: column;
    row-gap: 0.5rem;
  }
`;

const SignOutButton = styled.button`
  background-color: #f44336;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: black;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 700;
`;

const ProfileComponent = ({ user, onSignOut }) => {
  const navigate = useNavigate();
  const [modalOpen, setmodalOpen] = useState(false);
  const handleSignOut = () => {
    // Perform sign-out logic here
    // ...

    // Close the sign-out modal
    // setSignOutModalVisible(false);
    // localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    navigate("/login");

    // Redirect to the login page
    // Example: window.location.href = '/login';
  };

  const openModal = () => {
    setmodalOpen(true);
  };

  const closeModal = () => {
    setmodalOpen(false);
  };

  return (
    <>
      <ProfileContainer onClick={openModal}>
        <UserPicContainer>
          <UserPic src={userImg} alt="User Profile" />
        </UserPicContainer>
        <UserInfo>
          <UserName>Client</UserName>
          <UserDesignation>manager</UserDesignation>
        </UserInfo>
      </ProfileContainer>

      {modalOpen && (
        <Modal M1>
          <SignOutBox>
            <div>
              <p>Are you sure you want to sign out?</p>
            </div>
            <Buttons>
              <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
              <CancelButton onClick={closeModal}>Cancel</CancelButton>
            </Buttons>
          </SignOutBox>
        </Modal>
      )}
    </>
  );
};

export default ProfileComponent;
