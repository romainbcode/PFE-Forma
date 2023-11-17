import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { SousChapText } from "./souschap-text";
import axios from "axios";

export const SousChapTitreDescritpion = (props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        sx={{
          fontStyle: "italic",
          textDecoration: "underline",
          marginBottom: 2,
        }}
      >
        {props.titre}
      </Typography>
      <Typography sx={{ marginBottom: 4 }}>{props.description}</Typography>
      <SousChapText textes={props.texte} />
    </Box>
  );
};

export default SousChapTitreDescritpion;
