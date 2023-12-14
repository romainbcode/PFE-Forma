import React from "react";
import { Box, Typography } from "@mui/material";
import { SousChapText } from "./souschap-text";

export const SousChapTitreDescritpion = (props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        sx={{
          fontStyle: "italic",
          textDecoration: "underline",
        }}
      >
        {"Partie " + props.numeroSousChapitre + " : " + props.titre}
      </Typography>
      <Typography sx={{ marginBottom: 4 }}>{props.description}</Typography>
      <SousChapText textes={props.texte} />
    </Box>
  );
};

export default SousChapTitreDescritpion;
