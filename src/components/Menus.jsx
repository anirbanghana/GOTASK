import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const Menus = ({ anchorEl, setAnchorEl }) => {
  // Open the menu
  const handleClick = (event) => {
    // console.log(event.currentTarget, "vutton");
    setAnchorEl(event.currentTarget);
  };

  // Close the menu
  const handleClose = (event) => {
    console.log("clicked");
    event.stopPropagation();
    // console.log(event.stopPropagation);

    setAnchorEl(null);
  };
  console.log("clicked", anchorEl);
  return (
    <div>
      {/* <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button> */}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Item 1</MenuItem>
        <MenuItem onClick={handleClose}>Item 2</MenuItem>
        <MenuItem onClick={handleClose}>Item 3</MenuItem>
      </Menu>
    </div>
  );
};

export default Menus;
