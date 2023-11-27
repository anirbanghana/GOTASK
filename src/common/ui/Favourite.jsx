import React from "react";
import FlexBox from "./FlexBox";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { ACCENT_800, PRIMARY_900 } from "./colors";

const Favourite = ({ clicked, setclicked, color }) => {
  return (
    <FlexBox onClick={() => setclicked(!clicked)} style={{ cursor: "pointer" }}>
      {clicked ? (
        <FaHeart color={PRIMARY_900} size="20px" />
      ) : (
        <FaRegHeart color={color ? color : { ACCENT_800 }} size="20px" />
      )}
    </FlexBox>
  );
};

export default Favourite;
