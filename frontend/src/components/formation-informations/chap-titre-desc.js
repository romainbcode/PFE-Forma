import React from "react";
import { Box, Typography } from "@mui/material";

export const ChapTitreDescritpion = (props) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 3 }}>
        {props.titre}
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        {props.description}
      </Typography>
    </Box>
  );
};

export default ChapTitreDescritpion;
