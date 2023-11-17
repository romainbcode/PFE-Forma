import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";

export const SousChapText = (props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {props.textes &&
        props.textes.map((texte, index) => (
          <Box key={index}>
            <Box sx={{ marginBottom: 5 }}>{texte.texte}</Box>
            <Box sx={{ marginBottom: 5, bgcolor: "red" }}>
              <Typography>{texte.texte_attention}</Typography>
            </Box>
            <Box sx={{ marginBottom: 5, bgcolor: "blue" }}>
              <Typography>{texte.texte_conseil}</Typography>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default SousChapText;
