import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
export const ListeMenuInfosUtilisateur = () => {
  const handleMouseEnter = (e) => {
    e.target.style.textDecoration = "underline";
    e.target.style.textDecorationColor = "#ff8906"; // changez 'red' par la couleur désirée
  };

  const handleMouseLeave = (e) => {
    e.target.style.textDecoration = "none";
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translate(0%, -50%)",
      }}
    >
      <Link
        to="/utilisateur/badges"
        style={linkStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Badges
      </Link>
      <Link
        to="/utilisateur/informations"
        style={linkStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Informations
      </Link>
      <Link
        to="/utilisateur/scores"
        style={linkStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Scores
      </Link>
    </Box>
  );
};

const linkStyle = {
  margin: "10px",
  fontWeight: "bold",
  textDecoration: "none",
  color: "#fffffe",
};
export default ListeMenuInfosUtilisateur;
