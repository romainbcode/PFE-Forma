import React from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { BookText } from "lucide-react";

export const MenuItemLink = ({ to, children, onClose }) => {
  return (
    <MenuItem onClick={onClose} disableRipple>
      <Link
        to={to}
        style={{
          textDecoration: "none",
          color: "black",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <BookText />
        {children}
      </Link>
    </MenuItem>
  );
};

export default MenuItemLink;
