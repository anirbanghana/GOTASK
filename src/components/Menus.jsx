import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Menus = ({ optionOpen, setOptionOpen, anchorEl }) => {
  const handleClose = () => {
    setOptionOpen(false);
  };

  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={optionOpen}
        onClose={handleClose}
        anchorOrigin={{
          //   vertical: "top",
          //   horizontal: "center",
          position: "absolute",
          top: "90px",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem onClick={handleClose}>Item 1</MenuItem>
        <MenuItem onClick={handleClose}>Item 2</MenuItem>
        <MenuItem onClick={handleClose}>Item 3</MenuItem>
      </Menu>
    </div>
  );
};

export default Menus;
