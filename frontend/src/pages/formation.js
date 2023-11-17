import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { Loader } from "../components/loader/loader";
import { SousChapTitreDescritpion } from "../components/formation-informations/souschap-titre-desc";
import { ChapTitreDescritpion } from "../components/formation-informations/chap-titre-desc";
import { ListeChapitreFormation } from "../components/listeChapitreFormation";
import axios from "axios";

export const Formation = () => {
  const { formation_id, chapitre_id } = useParams();

  const [chapitreById, setChapitreById] = useState([]);
  const [sousChapitres, setSousChapitres] = useState([]);
  const [chapitresFormations, setChapitresFormation] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const getChapitreById = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/formation/" + formation_id + "/" + chapitre_id
      );
      setChapitreById(data.chapitreById);
      setSousChapitres(data.chapitreById.sous_chapitre);
      setChapitresFormation(data.formationById.chapitre);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  });

  const memoizedChapitreById = useMemo(() => getChapitreById, []);

  useEffect(() => {
    setChapitreById(memoizedChapitreById);
  }, [memoizedChapitreById]);

  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translate(0%, -50%)",
          marginLeft: 2,
        }}
      >
        {chapitresFormations &&
          chapitresFormations.map((chapitre, index) => (
            <Link to={`/formation/${formation_id}/${chapitre._id}`}>
              <ListeChapitreFormation chapitre={chapitre} />
            </Link>
          ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ChapTitreDescritpion
          titre={chapitreById.titre_chapitre}
          description={chapitreById.description_chapitre}
        />

        {isloading ? (
          <Loader />
        ) : (
          sousChapitres &&
          sousChapitres.map((sousChapitre, index) => (
            <Box key={index}>
              <SousChapTitreDescritpion
                titre={sousChapitre.titre_sous_chapitre}
                description={sousChapitre.description_sous_chapitre}
                texte={sousChapitre.corps_texte_image}
              />
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default Formation;
