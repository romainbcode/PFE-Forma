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
          display: "flex",
          color: "#fffffe",
          flexDirection: "row",
          justifyContent: "left",
          width: "100%",
        }}
      >
        <BookText />
        {children}
      </Link>
    </MenuItem>
  );
};

export default MenuItemLink;
