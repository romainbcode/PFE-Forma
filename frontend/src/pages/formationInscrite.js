import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { FormationCard } from "../components/formationcard/formationCard";
import axios from "axios";
import { Loader } from "../components/loader/loader";
import { useAuth0 } from "@auth0/auth0-react";

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
        "/api-node/user/getFormations",
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
      }}
    >
      <Box>
        <Typography sx={{ marginBottom: 4 }}>Formations en cours : </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {isloading ? (
            <Loader />
          ) : (
            formationsInscrit &&
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
