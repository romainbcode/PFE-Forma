import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";

export const SousChapText = (props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {props.textes &&
        props.textes.map((texte, index) => (
          <Box key={index} sx={{ marginBottom: 5 }}>
            {texte.texte}
          </Box>
        ))}
    </Box>
  );
};

export default SousChapText;
