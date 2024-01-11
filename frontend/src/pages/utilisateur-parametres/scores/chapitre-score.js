import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Typography, Divider, LinearProgress } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { Loader } from "../../../components/loader/loader";
import { ChapitreDescriptionAccueil } from "../../../components/chapitre-description-accueil";
import { format } from "date-fns";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";

const url_back_node = process.env.REACT_APP_BACKNODE;

export const ChapitreScore = (props) => {
  const [formationById, setFormationById] = useState([]);
  const [chapitresFormation, setChapitresFormation] = useState([]);
  const [dateCreation, setDateCreation] = useState();
  const [formationScore, setFormationScore] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const { formation_id } = useParams();

  const { getAccessTokenSilently, user } = useAuth0();

  const getFormationById = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        url_back_node + "/formation/" + formation_id,
        config
      );
      setFormationById(data.formationById);
      const date = new Date(data.formationById.createdAt);
      const dateformatted = format(date, "dd/MM/yyyy");
      setDateCreation(dateformatted);
      setChapitresFormation(data.formationById.chapitre);
      const data_scores = await axios.post(
        url_back_node + "/user/getAllScores",
        {
          id_user_auth: user.sub,
        },
        config
      );
      const chapitre_formation = data.formationById.chapitre;
      const formation_score = data_scores.data.formation_scores;

      let tableauChapitres = [
        // Votre premier tableau de chapitres
      ];

      let tableauScores = [
        // Votre deuxième tableau avec des scores
      ];

      // Étape 1 : Remplir la Map avec les chapitres du premier tableau
      let mapChapitres = new Map();
      chapitre_formation.forEach((chapitre) => {
        mapChapitres.set(chapitre._id, {
          titre: chapitre.titre_chapitre,
          description: chapitre.description_chapitre,
          scoreMax: 0,
        });
      });

      // Étape 2 : Parcourir le deuxième tableau et mettre à jour les scores
      formation_score.forEach((score) => {
        if (mapChapitres.has(score.id_chapitre)) {
          let chapitre = mapChapitres.get(score.id_chapitre);
          if (score.scores_pourcentage > chapitre.scoreMax) {
            chapitre.scoreMax = score.scores_pourcentage;
            mapChapitres.set(score.id_chapitre, chapitre);
          }
        }
      });

      // Étape 3 : Récupérer les résultats finaux
      let resultatsFinaux = Array.from(mapChapitres.values());
      console.log("resultats", resultatsFinaux);
      setFormationScore(resultatsFinaux);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  });

  const memoizedFormationById = useMemo(() => getFormationById, []);

  useEffect(() => {
    setFormationById(memoizedFormationById);
  }, [memoizedFormationById]);

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={{ pb: 2, color: "primary.headLine" }}>
          {formationById.titre}
        </Typography>
        <Typography sx={{ color: "primary.paragraph" }}>
          Vous avez la possibilité de suivre votre progression dans cette
          formation. Pour chaque quiz, le pourcentage le plus élevé atteint est
          indiqué. Un quiz est considéré comme réussi et apparaîtra en vert si
          vous obtenez plus de 75 %. Un quiz raté sera affiché en rouge, tandis
          qu'un quiz auquel vous n'avez pas encore participé sera indiqué en
          bleu.
        </Typography>
        <Divider
          color="white"
          variant="middle"
          sx={{ marginTop: 3, marginBottom: 2 }}
        />
      </Box>
      {isloading ? (
        <Loader />
      ) : (
        Array.isArray(formationScore) &&
        formationScore.map((formation, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <ChapitreDescriptionAccueil
              titre={formation.titre}
              description={formation.description}
              color_border={
                formation.scoreMax === 0
                  ? "blue"
                  : formation.scoreMax >= 75
                  ? "green"
                  : "red"
              }
            />
            <Box
              sx={{
                position: "relative",
                width: "100%",
                "& > * + *": {
                  marginTop: 2,
                },
              }}
            >
              <LinearProgress
                variant="determinate"
                value={Number(formation.scoreMax)}
                sx={{ p: 0.5, mt: 3 }}
                color={
                  formation.scoreMax === 0
                    ? "info"
                    : formation.scoreMax > 75
                    ? "success"
                    : "error"
                }
                title="Pourcentage de validation"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  top: -16,
                  left: "75%",
                }}
              >
                <Box
                  sx={{
                    width: 2,
                    height: 12,
                    backgroundColor: "black",
                  }}
                />
                <Box sx={{ color: "primary.headLine" }}>75%</Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  top: -35,
                  left: formation.scoreMax + "%",
                }}
              >
                <Box
                  sx={{
                    color:
                      formation.scoreMax === 0
                        ? "#87CEFA"
                        : formation.scoreMax >= 75
                        ? "green"
                        : "red",
                  }}
                >
                  {formation.scoreMax}%
                </Box>
                <Box
                  sx={{
                    width: 2,
                    height: 12,
                    backgroundColor: "black",
                  }}
                />
              </Box>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default ChapitreScore;
