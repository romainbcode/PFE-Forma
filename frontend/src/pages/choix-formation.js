import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { FormationCard } from "../components/formationcard/formationCard";
import axios from "axios";
import { Loader } from "../components/loader/loader";

export const ChoixFormation = () => {
  const [formationsRecentes, setFormationsRecentes] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const getFormationsRecentes = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/formations/recente"
      );
      setFormationsRecentes(data.formations);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  });

  const memoizedFormationsRecentes = useMemo(() => getFormationsRecentes, []);

  useEffect(() => {
    setFormationsRecentes(memoizedFormationsRecentes);
  }, [memoizedFormationsRecentes]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
        <Typography>Formations récentes : </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {isloading ? (
            <Loader />
          ) : (
            formationsRecentes &&
            formationsRecentes.map((formationRecente, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <FormationCard
                  titre={formationRecente.titre}
                  description={formationRecente.description}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default ChoixFormation;
