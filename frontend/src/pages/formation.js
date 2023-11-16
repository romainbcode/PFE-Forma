import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Formation = (props) => {
  const [formationById, setFormationById] = useState([]);
  const { formation_id } = useParams();
  const getFormationById = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/formation/" + formation_id
      );
      setFormationById(data.formationById);
    } catch (error) {
      console.log(error);
    }
  });

  const memoizedFormationById = useMemo(() => getFormationById, []);

  useEffect(() => {
    setFormationById(memoizedFormationById);
  }, [memoizedFormationById]);

  return <Box>{formationById.titre}</Box>;
};

export default Formation;
