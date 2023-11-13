import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { FormationCard } from "../components/formationcard/formationCard";
import axios from "axios";
import { Loader } from "../components/loader/loader";

export const ChoixFormation = () => {
  const [formationsRecentes, setFormationsRecentes] = useState([1, 2, 3]);
  const [isloading, setLoading] = useState(false);

  const getFormationsRecentes = async () => {
    try {
      isloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(formationsRecentes);
    //getFormationsRecentes();
  });

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
                <FormationCard titre="titre" description="description" />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default ChoixFormation;
