import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ListeChapitreFormation = (props) => {
  const { formation_id, chapitre_foramtion_id } = useParams();

  useEffect(() => {
    console.log(formation_id, "      ", chapitre_foramtion_id);
  });

  return <Box>formationById.titre</Box>;
};

export default ListeChapitreFormation;
