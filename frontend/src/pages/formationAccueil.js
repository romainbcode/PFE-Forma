import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { Loader } from "../components/loader/loader";
import { ChapitreDescriptionAccueil } from "../components/chapitre-description-accueil";
import { format } from "date-fns";

import axios from "axios";

export const FormationAccueil = (props) => {
  const [formationById, setFormationById] = useState([]);
  const [chapitresFormation, setChapitresFormation] = useState([]);
  const [dateCreation, setDateCreation] = useState();
  const [idPremierChapitre, setIdPremierChapitre] = useState("");
  const [isloading, setIsLoading] = useState(true);

  const { formation_id } = useParams();
  const getFormationById = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/formation/" + formation_id
      );
      setFormationById(data.formationById);
      const date = new Date(data.formationById.createdAt);
      const dateformatted = format(date, "dd/MM/yyyy");
      setDateCreation(dateformatted);
      setChapitresFormation(data.formationById.chapitre);
      setIdPremierChapitre(data.formationById.chapitre[0]._id);
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
    <Box>
      {formationById.titre + " date de création : "}
      {dateCreation}
      {isloading ? (
        <Loader />
      ) : (
        chapitresFormation &&
        chapitresFormation.map((chapitreFormation, index) => (
          <Box key={index}>
            <ChapitreDescriptionAccueil
              titre={chapitreFormation.titre_chapitre}
              description={chapitreFormation.description_chapitre}
            />
          </Box>
        ))
      )}
      <Link to={`/formation/${formationById._id}/${idPremierChapitre}`}>
        <Button>Commencer la formation</Button>
      </Link>
    </Box>
  );
};

export default FormationAccueil;
