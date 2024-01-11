import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import axios from "axios";
import { Loader } from "../../components/loader/loader";
import { useAuth0 } from "@auth0/auth0-react";
import { CoursCard } from "../../components/courscard/coursCard";

const url_back_node = process.env.REACT_APP_BACKNODE;

export const CoursDisponible = () => {
  const [allCours, setAllCours] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  const getAllCours = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const { data } = await axios.get(url_back_node + "/getAllCours", config);
      setAllCours(data.allCours);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  });

  const memoizedAllCours = useMemo(() => getAllCours, []);

  useEffect(() => {
    setAllCours(memoizedAllCours);
  }, [memoizedAllCours]);

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
          Cours disponibles
        </Typography>
        <Typography sx={{ color: "primary.paragraph" }}>
          En cliquant sur le bouton "S'inscrire", le créneau du cours va
          automatiquement s'ajouter à votre compte calendrier Google.
        </Typography>
        <Divider
          color="white"
          variant="middle"
          sx={{ marginTop: 3, marginBottom: 4 }}
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
            Array.isArray(allCours) &&
            allCours.map((coursByProf, index) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                {Array.isArray(coursByProf.cours) &&
                  coursByProf.cours.map((cours, index) => (
                    <Box sx={{ m: 2 }}>
                      <CoursCard
                        id_prof={coursByProf.id_user_auth}
                        titre={cours.titre}
                        description={cours.description}
                        dateDebut={cours.dateHeureDebut}
                        dateFin={cours.dateHeureFin}
                        dateJour={cours.dateJour}
                        id={cours._id}
                        image={cours.image ? cours.image.url : ""}
                      />
                    </Box>
                  ))}
              </Box>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default CoursDisponible;
