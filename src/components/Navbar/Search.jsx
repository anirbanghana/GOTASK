import React from "react";
import styled from "styled-components";
import FlexBox from "../../common/ui/FlexBox";
import SearchIcon from "@mui/icons-material/Search";
import Filter from "./Filter";

const Wrapper = styled(FlexBox)`
  column-gap: 1rem;
  align-items: center;
  width: fit-content;

  @media (max-width: 900px) {
    width: 9rem;
    column-gap: 0.5rem;
  }
`;

const SearchBoxW = styled(FlexBox)`
  background: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  align-items: center;
  column-gap: 0.5rem;
  width: 25rem;
  border: 1px solid #d6d6d6;

  @media (max-width: 900px) {
    width: 8rem;
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 90%;

  @media (max-width: 900px) {
    width: 4.8rem;
  }
`;

const SearchBox = ({
  filterType,
  setFilterType,
  searchItem,
  setSearchItem,
}) => {
  return (
    <Wrapper>
      <SearchBoxW>
        <SearchIcon />
        <Input
          type="text"
          placeholder="Search"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </SearchBoxW>
      <Filter filterType={filterType} setFilterType={setFilterType} />
    </Wrapper>
  );
};

export default SearchBox;
