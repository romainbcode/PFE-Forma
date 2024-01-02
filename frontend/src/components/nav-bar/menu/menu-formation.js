import React from "react";
import { Menu } from "@mui/material";
import { MenuSection } from "./menu-section";
import { styled } from "@mui/material/styles";

const color_button_background = "#ff8906";
const color_background = "#252525";
const color_main = "#fffffe";

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
      minWidth: 180,
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      backgroundColor: color_background,
      color: color_main,

      "& .MuiMenuItem-root": {
        //Logos quand le menu s'ouvre
        "& .lucide-book-text": {
          fontSize: 20,
          marginRight: "10px",
          color: color_button_background,
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
    { path: "/formations", label: "Formations" },
    { path: "/utilisateur/formation/inscrit", label: "Formations inscrit" },
    { path: "/cours/disponible", label: "Cours disponible" },
  ];

  const profItems = [
    { path: "/formations/create", label: "Créer une formation" },
    { path: "/quizs/create", label: "Créer un quiz" },
    {
      path: "/professeur/formations",
      label: "Ajouter des quizs dans sa formation",
    },
    {
      path: "/professeur/list/formations/update",
      label: "Modifier sa formation",
    },
    { path: "/professeur/quiz/update", label: "Modifier vos quizs" },
    { path: "/cours/creation", label: "Ajouter un créneau pour votre cours" },
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
