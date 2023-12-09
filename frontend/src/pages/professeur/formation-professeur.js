import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { FormationCard } from "../../components/formationcard/formationCard";
import axios from "axios";
import { Loader } from "../../components/loader/loader";
import { useAuth0 } from "@auth0/auth0-react";

export const FormationProfesseur = () => {
  const [formationsProfesseur, setFormationsProfesseur] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const { user, getAccessTokenSilently } = useAuth0();

  const getFormationsProfesseur = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        "/api-node/professeur/formations",
        {
          id_user_auth: user.sub,
        },
        config
      );
      setFormationsProfesseur(data.formationByProfesseur);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  });

  const memoizedFormationsProfesseur = useMemo(
    () => getFormationsProfesseur,
    []
  );

  useEffect(() => {
    setFormationsProfesseur(memoizedFormationsProfesseur);
  }, [memoizedFormationsProfesseur]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
        <Typography sx={{ marginBottom: 4 }}>Mes formations : </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {isloading ? (
            <Loader />
          ) : (
            Array.isArray(formationsProfesseur) &&
            formationsProfesseur.map((formationRecente, index) => (
              <Link
                to={`/professeur/formation/quiz-in/${formationRecente._id}`}
              >
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

export default FormationProfesseur;
