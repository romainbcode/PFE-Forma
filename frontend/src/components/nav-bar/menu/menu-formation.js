import React from "react";
import { Menu } from "@mui/material";
import { MenuSection } from "./menu-section";
import { styled, alpha } from "@mui/material/styles";

const color_paragraphe = "#a7a9be";

export const MenuFormation = ({ anchorEl, open, onClose, roleUser }) => {
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
      //marginTop: theme.spacing(1),
      minWidth: 180,
      color: "black",
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "0",
      },

      "& .MuiMenuItem-root": {
        //Logos quand le menu s'ouvre
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: color_paragraphe,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
        //Hover quand des sous-menus quand menu est ouvert
        "&:hover": {
          backgroundColor: "red",
        },
      },
    },
  }));

  const userItems = [
    { path: "/formations", label: "Formations" },
    { path: "/utilisateur/formation/inscrit", label: "Formations inscrit" },
  ];

  const profItems = [
    { path: "/formations/create", label: "Créer une formation" },
    { path: "/quizs/create", label: "Créer un quiz" },
    { path: "/professeur/formations", label: "Afficher ses formations" },
  ];

  const adminItems = [
    { path: "/admin/dashboard/formations", label: "Dashboard" },
  ];

  return (
    <StyledMenu
      id="demo-customized-menuFormation"
      MenuListProps={{
        "aria-labelledby": "demo-customized-buttonFormation",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      {roleUser >= 1 && (
        <MenuSection title="Utilisateur" items={userItems} onClose={onClose} />
      )}
      {roleUser >= 2 && (
        <MenuSection title="Professeur" items={profItems} onClose={onClose} />
      )}
      {roleUser == 3 && (
        <MenuSection title="Admin" items={adminItems} onClose={onClose} />
      )}
    </StyledMenu>
  );
};

export default MenuFormation;
