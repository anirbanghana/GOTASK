import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import FlexBox from "../../common/ui/FlexBox";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import FilterOption from "../options/FilterOption";

const FilterWrapper = styled(FlexBox)`
  padding: 1rem;
  height: 3rem;
  border: 1px solid #e1e1e1;
  border-radius: 0.5rem;
  border: 1px solid #d6d6d6;
  align-items: center;
  cursor: pointer;
  position:relative;
`;

const FilterWithOptnBox = styled(FlexBox)`
position:absolute;
top:50%;
right:70%;
width:fit-content;

`;

const Filter = ({filterType,setFilterType}) => {
  const [isFilterOptionVisible, setFilterOptionVisible] = useState(false);
  const filterWrapperRef = useRef(null);

  const handleOptionIconClick = () => {
    setFilterOptionVisible(!isFilterOptionVisible);
  };

  const handleDocumentClick = (e) => {
    // Close the FilterOption if the click is outside the FilterWrapper or FilterOption
    if (
      isFilterOptionVisible &&
      filterWrapperRef.current &&
      !filterWrapperRef.current.contains(e.target)
    ) {
      setFilterOptionVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [isFilterOptionVisible]);

  return (
      <FilterWrapper >
        <TuneOutlinedIcon onClick={handleOptionIconClick}/>
        {isFilterOptionVisible && (
          <FilterWithOptnBox ref={filterWrapperRef}>
            <FilterOption filterType={filterType} setFilterType={setFilterType}/>
          </FilterWithOptnBox>
        )}
      </FilterWrapper>
  );
};

export default Filter;
