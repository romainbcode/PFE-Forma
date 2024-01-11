import React from "react";
import { Menu } from "@mui/material";
import { MenuSection } from "./menu-section";
import { styled } from "@mui/material/styles";

const color_main = "#fffffe";
const color_background = "#252525";
const color_button_background = "#ff8906";

export const MenuUser = ({ anchorEl, open, onClose }) => {
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 20,
      minWidth: 180,
      color: color_main,
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      backgroundColor: color_background,
      "& .MuiMenuItem-root": {
        //Logos quand le menu s'ouvre
        "& .lucide-book-text": {
          fontSize: 20,
          color: color_button_background,
          marginRight: "10px",
        },
        //Hover quand des sous-menus quand menu est ouvert
        "&:hover": {
          backgroundColor: color_button_background,
          "& .lucide-book-text": {
            color: color_main,
          },
        },
      },
    },
  }));

  const userItems = [
    { path: "/utilisateur/informations", label: "Information" },
    { path: "/utilisateur/scores", label: "Scores" },
  ];

  return (
    <StyledMenu
      id="demo-customized-menuUtilisateur"
      MenuListProps={{
        "aria-labelledby": "demo-customized-buttonUtilisateur",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      <MenuSection title="Compte" items={userItems} onClose={onClose} />
    </StyledMenu>
  );
};

export default MenuUser;
