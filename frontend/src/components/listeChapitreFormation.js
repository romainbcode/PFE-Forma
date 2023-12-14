import React from "react";
import { Box } from "@mui/material";

export const ListeChapitreFormation = (props) => {
  return (
    <Box>
      {"Chapitre " +
        props.numeroChapitre +
        " : " +
        props.chapitre.titre_chapitre}
    </Box>
  );
};

export default ListeChapitreFormation;
