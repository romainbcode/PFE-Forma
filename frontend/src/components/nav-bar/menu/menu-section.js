import React from "react";
import { Box, Divider } from "@mui/material";
import { MenuItemLink } from "./menu-item-link";

export const MenuSection = ({ title, items, onClose }) => {
  return (
    <Box>
      <Divider sx={{ my: 1 }}>{title}</Divider>
      {items.map((item, index) => (
        <MenuItemLink key={index} to={item.path} onClose={onClose}>
          {item.label}
        </MenuItemLink>
      ))}
    </Box>
  );
};

export default MenuSection;
