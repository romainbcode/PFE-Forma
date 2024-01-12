import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import logo_unauthorized from "../assets/unauthorized_logo.png";
export const Unauthorized = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <img
        width={300}
        height={300}
        src={logo_unauthorized}
        alt="erreur401_unauthorized"
      />
      <h1>Non autorisé à accéder à ce contenu !</h1>
      <Link to="/" style={{ color: "#FFFFFE" }}>
        Retournez à la page d'accueil !
      </Link>
    </Box>
  );
};

export default Unauthorized;
