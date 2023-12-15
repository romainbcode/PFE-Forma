import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { MenuSection } from "./menu-section";
import { styled, alpha } from "@mui/material/styles";
import { EditIcon, ArchiveIcon, FileCopyIcon } from "@mui/icons-material";
import Divider from "@mui/material/Divider";

const color_paragraphe = "#a7a9be";

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
    { path: "/utilisateur/badges", label: "Badges" },
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
