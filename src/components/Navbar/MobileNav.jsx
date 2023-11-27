import React from "react";
import styled from "styled-components";
import FlexBox from "../../common/ui/FlexBox";
import { device } from "../../common/ui/Resposive";
import NewProjectButton from "./NewProjectButton";
import ProfileComponent from "./ProfileComponent";

const Wrapper = styled(FlexBox)`
  width: 80vw;
  padding:2rem;
  background-color: white;
  position:relative;
  @media ${device.laptop} {
    display: none;
  }
`;

const Container=styled(FlexBox)`
  flex-direction: column;
  margin:2rem;
  row-gap: 2rem;
  background-color: pink;
  justify-content: center;
  align-items: center;
  @media ${device.laptop} {
    display: none;
  }
`

const MobileNav = () => {
  return (
    <Wrapper>
      <Container>
        <NewProjectButton/>
        <ProfileComponent/>
      </Container>
    </Wrapper>
  );
};

export default MobileNav;
