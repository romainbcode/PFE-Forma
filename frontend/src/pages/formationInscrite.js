import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { FormationCard } from "../components/formationcard/formationCard";
import axios from "axios";
import { Loader } from "../components/loader/loader";
import { useAuth0 } from "@auth0/auth0-react";

const url_back_node = process.env.REACT_APP_BACKNODE;

export const FormationInscrite = () => {
  const [formationsInscrit, setFormationsInscrit] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const { user, getAccessTokenSilently } = useAuth0();

  const getIdsFormationsInscrit = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    try {
      const { data } = await axios.post(
        url_back_node + "/user/getFormations",
        {
          id_user_auth: user.sub,
        },
        config
      );
      setFormationsInscrit(data.formationsInscrit);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  });

  const memoizedFormationsInscrit = useMemo(
    () => getIdsFormationsInscrit,
    [getIdsFormationsInscrit]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (formationsInscrit.length === 0) {
        // Si FormationsInscrit est vide, appelez à nouveau la fonction
        await memoizedFormationsInscrit();
      }
    };
    fetchData();
  }, [formationsInscrit, memoizedFormationsInscrit]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={{ pb: 2, color: "primary.headLine" }}>
          Formations commencées
        </Typography>
        <Typography sx={{ color: "primary.paragraph" }}>
          Sélectionnez l'une des formations en cours là où vous l'aviez laissée.
          Les résultats des quizs sont accessibles dans la partie "Scores" de
          l'utilisateur.
        </Typography>
        <Divider
          color="white"
          variant="middle"
          sx={{ marginTop: 3, marginBottom: 6 }}
        />
      </Box>
      <Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {isloading ? (
            <Loader />
          ) : (
            Array.isArray(formationsInscrit) &&
            formationsInscrit.map((formationRecente, index) => (
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

export default FormationInscrite;
