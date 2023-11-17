import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ChapTitreDescritpion = (props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 5 }}>
        {props.titre}
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 5 }}>
        {props.description}
      </Typography>
    </Box>
  );
};

export default ChapTitreDescritpion;
