import { ListeMenuInfosUtilisateur } from "../../../components/listeMenuInfosUtilisateur";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { FormationCard } from "../../../components/formationcard/formationCard";
import axios from "axios";
import { Loader } from "../../../components/loader/loader";
import { useAuth0 } from "@auth0/auth0-react";

const url_back_node = process.env.REACT_APP_BACKNODE;

export const ScoresUtilisateur = () => {
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
        // Si FormationsInscrit est vide, appel à nouveau la fonction
        await memoizedFormationsInscrit();
      }
    };
    fetchData();
  }, [formationsInscrit, memoizedFormationsInscrit]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <Box sx={{ width: "15%" }}>
        <ListeMenuInfosUtilisateur />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
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
              Cliquez sur une formation pour consulter son état d'avancement en
              observant les pourcentages de réussite de vos quiz.
            </Typography>
            <Divider
              color="white"
              variant="middle"
              sx={{ marginTop: 3, marginBottom: 6 }}
            />
          </Box>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {isloading ? (
              <Loader />
            ) : (
              Array.isArray(formationsInscrit) &&
              formationsInscrit.map((formationRecente, index) => (
                <Link to={`/utilisateur/scores/${formationRecente._id}`}>
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
    </Box>
  );
};

export default ScoresUtilisateur;
