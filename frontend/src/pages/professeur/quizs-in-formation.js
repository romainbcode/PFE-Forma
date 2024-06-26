import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  Divider,
  MenuItem,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { Loader } from "../../components/loader/loader";
import { ChapitreDescriptionAccueil } from "../../components/chapitre-description-accueil";
import { format } from "date-fns";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";

const url_back_node = process.env.REACT_APP_BACKNODE;

export const QuizsInFormation = (props) => {
  const [formationById, setFormationById] = useState([]);
  const [chapitresFormation, setChapitresFormation] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [titreQuizs, setTitreQuizs] = useState(
    Array(chapitresFormation.length).fill("")
  );

  const [quizs, setQuizs] = useState([]);

  const { formation_id } = useParams();

  const { user, getAccessTokenSilently } = useAuth0();

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
      setChapitresFormation(data.formationById.chapitre);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  });

  const memoizedFormationById = useMemo(() => getFormationById, []);

  useEffect(() => {
    setFormationById(memoizedFormationById);
  }, [memoizedFormationById]);

  const getQuizsUser = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        url_back_node + "/user/quizs",
        {
          id_user_auth: user.sub,
        },
        config
      );
      setQuizs(data.quizs);
    } catch (error) {
      console.log(error);
    }
  });

  const memoizedQuizs = useMemo(() => getQuizsUser, []);

  useEffect(() => {
    setQuizs(memoizedQuizs);
  }, [memoizedQuizs]);

  const handleChange = (event, index) => {
    const value = event.target.value;
    const newTitreQuizs = [...titreQuizs];
    newTitreQuizs[index] = value;
    setTitreQuizs(newTitreQuizs);
  };

  const addQuizFormation = async (index) => {
    const id_chapitre = chapitresFormation[index]._id;
    const id_formation = formation_id;
    const titreQuizSelection = titreQuizs[index];
    const quiz = quizs.find((q) => q.titre === titreQuizSelection);
    const id_quiz = quiz._id;
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        url_back_node + "/professeur/addQuiz/formation",
        {
          id_formation: id_formation,
          id_quiz: id_quiz,
          id_chapitre: id_chapitre,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={{ pb: 2, color: "primary.headLine" }}>
          Ajoutez des quizs dans votre formation : {formationById.titre}
        </Typography>
        <Typography sx={{ color: "primary.paragraph" }}>
          Vous pouvez ajouter un quiz par chapitre dans une formation.
        </Typography>
        <Divider
          color="white"
          variant="middle"
          sx={{ marginTop: 3, marginBottom: 4 }}
        />
      </Box>

      {isloading ? (
        <Loader />
      ) : (
        Array.isArray(chapitresFormation) &&
        chapitresFormation.map((chapitreFormation, index) => (
          <Box key={index}>
            <ChapitreDescriptionAccueil
              titre={chapitreFormation.titre_chapitre}
              description={chapitreFormation.description_chapitre}
            />
            <Select
              label="Sélectionner un titre"
              value={titreQuizs[index] ? titreQuizs[index] : " "}
              onChange={(event) => handleChange(event, index)}
              defaultValue=""
              sx={{ width: "300px", color: "white", mr: 5 }}
            >
              {Array.isArray(quizs) &&
                quizs.map((quiz, index2) => (
                  <MenuItem key={index2} value={quiz.titre}>
                    {quiz.titre}
                  </MenuItem>
                ))}
            </Select>
            <Button
              variant="contained"
              color="success"
              onClick={() => addQuizFormation(index)}
            >
              Valider l'ajout du quiz à la formation
            </Button>
          </Box>
        ))
      )}
    </Box>
  );
};

export default QuizsInFormation;
