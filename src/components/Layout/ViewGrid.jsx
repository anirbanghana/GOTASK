import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FlexBox from "../../common/ui/FlexBox";
import ChipToday from "../ChipToday";
import ProjectCard from "../Project/ProjectCard";
import axios from "axios";

const Wrapper = styled(FlexBox)`
  padding: 1rem 1rem 2rem 2rem;
  row-gap: 2rem;
  z-index: 1;
`;

const FlexScroll = styled(FlexBox)`
  column-gap: 1rem;
  padding: 0 0.5rem;
  margin: 0 -0.5rem;
  width: 100%;
  max-width: 100vw;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  z-index: 1;
  &::-webkit-scrollbar {
    display: none;
    z-index: 1;
  }
`;

const SectionWithChipAndHr = styled(FlexBox)`
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const HrBox = styled(FlexBox)`
  position: absolute;
  top: 50%;
  width: 100%;
  background-color: #e1e1e1;
`;

const ViewGrid = ({
  projects,
  setProjects,
  filterType,
  heading,
  userId,
  searchText,
  setSearchText,
}) => {
  const [data, setData] = useState([]);
  const url = "https://todo-backend-daem.vercel.app/get-all-todos";
  console.log(filterType, "Inside the grid view");
  useEffect(() => {
    axios
      .get(
        "https://todo-backend-daem.vercel.app/get-all-todos/6576aaae6c2e044a510b424e"
      )
      .then((response) => {
        setData(response.data.todo);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    console.log("viewgrid", projects);
  }, []);

  return (
    <Wrapper column>
      <FlexBox column rowGap="1rem">
        <ChipToday isToday="1" />
        <FlexScroll>
          <ProjectCard
            filterType={filterType}
            today={true}
            projects={projects}
            userId={userId}
            setProjects={setProjects}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </FlexScroll>
      </FlexBox>
      <FlexBox column rowGap="1rem">
        <SectionWithChipAndHr>
          <ChipToday isToday={0} />
          <HrBox>
            <hr />
          </HrBox>
        </SectionWithChipAndHr>
        <FlexScroll>
          <ProjectCard
            userId={userId}
            filterType={filterType}
            projects={projects}
            today={false}
            setProjects={setProjects}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </FlexScroll>
      </FlexBox>
    </Wrapper>
  );
};

export default ViewGrid;
