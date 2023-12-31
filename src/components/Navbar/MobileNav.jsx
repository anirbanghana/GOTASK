import React from "react";
import styled from "styled-components";
import FlexBox from "../../common/ui/FlexBox";
import NewProjectButton from "./NewProjectButton";
import ProfileComponent from "./ProfileComponent";
import { useEffect } from "react";
const Wrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 2;
  position: absolute;
  flex-direction: column;
  right: 0px;
  top: 0px;
  padding: 4rem;
  row-gap: 1rem;
  transition: 3s ease-in-out;
`;

const MobileNav = ({ projects, setProjects, userId }) => {
  useEffect(() => {
    console.log(projects, "this is movile nav");
  });
  return (
    <Wrapper>
      <NewProjectButton
        projects={projects}
        setProjects={setProjects}
        userId={userId}
      />
      <ProfileComponent />
    </Wrapper>
  );
};
export default MobileNav;
