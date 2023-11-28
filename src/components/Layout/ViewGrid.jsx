import React, { useState } from "react";
import styled from "styled-components";
import FlexBox from "../../common/ui/FlexBox";
import ChipToday from "../ChipToday";
import ProjectCard from "../Project/ProjectCard";

const Wrapper = styled(FlexBox)`
  padding: 1rem 1rem 2rem 2rem;
  row-gap: 2rem;
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

  &::-webkit-scrollbar {
    display: none;
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

const ViewGrid = ({ projects, filterType, setProjects, searchItem }) => {
  const deleteProject = (projectId) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== projectId
    );
    setProjects(updatedProjects);
  };
  return (
    <Wrapper column>
      <FlexBox column rowGap="1rem">
        <ChipToday isToday="1" />
        <FlexScroll>
          {projects.map((item, index) => (
            <ProjectCard
              key={index}
              filterType={filterType}
              heading={item}
              projects={projects}
              setProjects={setProjects}
              deleteProject={deleteProject}
              searchItem={searchItem}
            />
          ))}
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
          {projects.map((item, index) => (
            <ProjectCard
              key={index}
              filterType={filterType}
              heading={item}
              projects={projects}
              setProjects={setProjects}
              searchItem={searchItem}
            />
          ))}
        </FlexScroll>
      </FlexBox>
    </Wrapper>
  );
};

export default ViewGrid;
