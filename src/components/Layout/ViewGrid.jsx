import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FlexBox from "../../common/ui/FlexBox";
import ChipToday from "../ChipToday";
import ProjectCard from "../Project/ProjectCard";
import axios from "axios";

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

const dummydata = [
  {
    projectName: "work",
    id: 1,
    tasks: [
      {
        id: "a1",
        taskname: "buy apple",
      },
      {
        id: "a2",
        taskname: "buy banan",
      },
      {
        id: "a3",
        taskname: "buy cat",
      },
    ],
  },
  {
    projectName: "personal",
    id: 2,
    tasks: [
      {
        id: "a1",
        taskname: "eat apple",
      },
      {
        id: "a2",
        taskname: "eat banan",
      },
      {
        id: "a3",
        taskname: " cat farming",
      },
    ],
  },
];

const ViewGrid = ({ projects, filterType }) => {
  const [data, setData] = useState([]);

  const url = "https://todo-backend-daem.vercel.app/get-all-todos";
  const userId = "6576aaae6c2e044a510b424e";

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

  console.log("viewgrid", data);

  return (
    <Wrapper column>
      {/* <FlexBox column rowGap="1rem">
        <ChipToday isToday="1" />
        <FlexScroll>
          {data.length > 0 &&
            dummydata.map((item, index) => (
              <ProjectCard />
            ))}
        </FlexScroll>
      </FlexBox> */}

      <FlexBox column rowGap="1rem">
        <ChipToday isToday="1" />
        <FlexScroll>
          <ProjectCard
            filterType={filterType}
            projects={projects}
            data={data}
          />
        </FlexScroll>
      </FlexBox>
      <FlexBox column rowGap="1rem">
        <SectionWithChipAndHr>
          {/* checking for tomrrow */}
          <ChipToday isToday={0} />
          <HrBox>
            <hr />
          </HrBox>
        </SectionWithChipAndHr>
        <FlexScroll>
          <ProjectCard
            filterType={filterType}
            projects={projects}
            data={data}
          />
        </FlexScroll>
      </FlexBox>
    </Wrapper>
  );
};

export default ViewGrid;
