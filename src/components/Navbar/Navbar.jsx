import styled from "styled-components";
import FlexBox from "../../common/ui/FlexBox";
import SearchBox from "./Search";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { IoCloseOutline } from "react-icons/io5";
import { device } from "../../common/ui/Resposive";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import MobileNav from "./MobileNav";
import NewProjectButton from "./NewProjectButton";
import ProfileComponent from "./ProfileComponent";
import { useEffect } from "react";
import goTaskimg from "../../../src/assets/GoTask.png";

const Wrapper = styled(FlexBox)`
  background: white;
  width: 100%;
  height: 5rem;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  column-gap: 1rem;

  @media (max-width: 900px) {
    width: 99vw;
    justify-content: space-between;
    padding: 0 1rem;
    column-gap: 0.2rem;
  }
`;
const Hamburger = styled(RxHamburgerMenu)`
  display: block;
  @media ${device.laptop} {
    display: none;
  }
`;

const Logo = styled(FlexBox)`
  @media (max-width: 900px) {
    width: 30px;
  }
`;
const Close = styled(IoCloseOutline)`
  display: block;
  z-index: 5;
  @media ${device.laptop} {
    display: none;
  }
`;

const ProfileBox = styled(FlexBox)`
  @media (max-width: 900px) {
    display: none;
  }
`;
const Navbar = ({
  filterType,
  setFilterType,
  projects,
  setProjects,
  userId,
  searchText,
  setSearchText,
}) => {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(true);

  return (
    <Wrapper>
      <Logo>
        <img src={goTaskimg} alt="GoTask" width="90px" />
      </Logo>
      <SearchBox
        filterType={filterType}
        setFilterType={setFilterType}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <ProfileBox>
        <NewProjectButton
          projects={projects}
          setProjects={setProjects}
          userId={userId}
        />
      </ProfileBox>

      <ProfileBox>
        <ProfileComponent />
      </ProfileBox>

      {close && (
        <Hamburger
          onClick={() => {
            setOpen(!open);
            setClose(!close);
          }}
        />
      )}
      {open && (
        <Close
          onClick={() => {
            setClose(!close);
            setOpen(!open);
          }}
        />
      )}
      {open && (
        <MobileNav
          projects={projects}
          setProjects={setProjects}
          userId={userId}
        />
      )}
    </Wrapper>
  );
};

export default Navbar;
