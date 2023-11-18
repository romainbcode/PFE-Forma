import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
export const ListeMenuInfosUtilisateur = () => {
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
      <Link to="/utilisateur/badges" style={linkStyle}>
        Badges
      </Link>
      <Link to="/utilisateur/informations" style={linkStyle}>
        Informations
      </Link>
      <Link to="/utilisateur/scores" style={linkStyle}>
        Scores
      </Link>
      <Link to="/logout" style={linkStyle}>
        Déconnexion
      </Link>
    </Box>
  );
};

const linkStyle = {
  margin: "10px", // Ajoutez l'espacement souhaité entre les liens
  fontWeight: "bold", // Mettez le texte en gras
  textDecoration: "none", // Supprimez le soulignement par défaut des liens
  color: "#fffffe",
};
export default ListeMenuInfosUtilisateur;
