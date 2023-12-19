import React from "react";
import styled from "styled-components";
import FlexBox from "../../common/ui/FlexBox";
import NewProjectButton from "./NewProjectButton";
import ProfileComponent from "./ProfileComponent";
const Wrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
  background-color: red;
  z-index: 2;
  position: absolute;
  flex-direction: column;
  right: 0px;
  top: 0px;
  padding: 4rem;
  row-gap: 1rem;
  transition: 3s ease-in-out;
`;

const MobileNav = () => {
  return (
    <Wrapper>
      <NewProjectButton />
      <ProfileComponent />
    </Wrapper>
  );
};
export default MobileNav;
