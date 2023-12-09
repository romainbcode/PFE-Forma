import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { FormationCard } from "../components/formationcard/formationCard";
import axios from "axios";
import { Loader } from "../components/loader/loader";
import { useAuth0 } from "@auth0/auth0-react";

export const ChoixFormation = () => {
  const [formationsRecentes, setFormationsRecentes] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  const getFormationsRecentes = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const { data } = await axios.get("/api-node/formations/recente", config);
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
        <Typography sx={{ marginBottom: 4 }}>Formations récentes : </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {isloading ? (
            <Loader />
          ) : (
            formationsRecentes &&
            formationsRecentes.map((formationRecente, index) => (
              <Link to={`/formation/${formationRecente._id}`}>
                <Grid
                  item
                  xs={2}
                  sm={4}
                  md={4}
                  key={index}
                  sx={{ marginLeft: 2, marginRight: 2 }}
                >
                  <FormationCard
                    titre={formationRecente.titre}
                    description={formationRecente.description}
                  />
                </Grid>
              </Link>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default ChoixFormation;
