import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { FormationCard } from "../../../components/formationcard/formationCard";
import axios from "axios";
import { Loader } from "../../../components/loader/loader";
import { useAuth0 } from "@auth0/auth0-react";

const url_back_node = process.env.REACT_APP_BACKNODE;

export const FormationProfesseurUpdate = () => {
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
        url_back_node + "/professeur/formations",
        {
          id_user_auth: user.sub,
        },
        config
      );
      setFormationsProfesseur(data.formationByProfesseur);
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
        p: 2,
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
            Choisissez la formation que vous souhaitez modifier
          </Typography>
          <Typography sx={{ color: "primary.paragraph" }}>
            Sélectionnez la formation à modifier, puis vous pourrez ajouter,
            supprimer ou encore modifier le contenu de celle-ci.
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
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {isloading ? (
            <Loader />
          ) : (
            Array.isArray(formationsProfesseur) &&
            formationsProfesseur.map((formationRecente, index) => (
              <Link to={`/professeur/formation/update/${formationRecente._id}`}>
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

export default FormationProfesseurUpdate;
