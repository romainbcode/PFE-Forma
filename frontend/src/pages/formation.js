import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Divider, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { Loader } from "../components/loader/loader";
import { SousChapTitreDescritpion } from "../components/formation-informations/souschap-titre-desc";
import { ChapTitreDescritpion } from "../components/formation-informations/chap-titre-desc";
import { ListeChapitreFormation } from "../components/listeChapitreFormation";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { AffichageQuiz } from "../components/formation-informations/affichage-quiz.js";
import { Toaster, toast } from "sonner";
import { PopUpValidationReponsesQuiz } from "../components/pop-ups/pop-up-validationReponsesQuiz.js";

const url_back_node = process.env.REACT_APP_BACKNODE;

export const Formation = () => {
  const { formation_id, chapitre_id } = useParams();

  const [chapitreById, setChapitreById] = useState([]);
  const [sousChapitres, setSousChapitres] = useState([]);
  const [chapitresFormations, setChapitresFormation] = useState([]);
  const [quizId, setQuizId] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const { user, getAccessTokenSilently } = useAuth0();

  const getChapitreById = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        url_back_node + "/formation/" + formation_id + "/" + chapitre_id,
        config
      );
      setChapitreById(data.chapitreById);
      setQuizId(data.chapitreById.Quiz);
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

  const addFormationInscription = async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      await axios.post(
        url_back_node + "/user/addFormationInscription",
        {
          id_user_auth: user.sub,
          id_formation: formation_id,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    addFormationInscription();
  });

  const getQuizById = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        url_back_node + "/quiz",
        {
          id_quiz: quizId,
        },
        config
      );
      setQuiz(data.quiz.question_reponse);
    } catch (error) {
      console.log("ERREUR", error);
    }
  });

  const memoizedQuiz = useMemo(() => getQuizById, [getQuizById]);

  useEffect(() => {
    const fetchData = async () => {
      if (quiz.length === 0) {
        await memoizedQuiz();
      }
    };
    fetchData();
  }, [quiz, memoizedQuiz]);

  const [reponses, setReponses] = useState({});
  const [openPopUp, setOpenPopUp] = useState(false);

  const handleOpenPopUp = () => {
    setOpenPopUp(true);
  };

  const handleClosePopUp = () => {
    setOpenPopUp(false);
  };

  const handleQuizClick = (index, question_id, reponse) => {
    // Mettre à jour la réponse pour un indice spécifique
    setReponses({
      ...reponses,
      [index]: { question_id: question_id, reponse_id: reponse },
    });
  };

  const onSubmit = async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      await axios.post(
        url_back_node + "/user/questionReponse/sendReponses",
        {
          id_user_auth: user.sub,
          quiz_id: quizId,
          reponses: reponses,
        },
        config
      );
      toast.success("Vos réponses au quiz ont bien été enregistré !");
      handleOpenPopUp();
    } catch (error) {
      toast.error("Vos réponses au quiz n'ont pas bien été enregistré !");
    }
  };

  return (
    <Box>
      <Toaster expand={true} richColors />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: 4,
        }}
      >
        <Box sx={{ width: "25%", marginLeft: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "fixed",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              width: "15%",
              margin: 2,
            }}
          >
            {chapitresFormations &&
              chapitresFormations.map((chapitre, index) => (
                <Link
                  reloadDocument
                  to={`/formation/${formation_id}/${chapitre._id}`}
                  style={{
                    textDecoration: "none",
                  }}
                  key={index}
                >
                  <Box
                    sx={{
                      color: "primary.headLine",
                      fontWeight: "bold",
                      textDecoration: "underline",
                      marginTop: 2,
                    }}
                  >
                    <ListeChapitreFormation
                      chapitre={chapitre}
                      numeroChapitre={index + 1}
                    />
                  </Box>
                </Link>
              ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box>
            <ChapTitreDescritpion
              titre={chapitreById.titre_chapitre}
              description={chapitreById.description_chapitre}
            />
            <Divider
              color="white"
              variant="middle"
              sx={{ marginTop: 2, marginBottom: 2 }}
            />
          </Box>

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
                  numeroSousChapitre={index + 1}
                />
              </Box>
            ))
          )}
          <Box>
            {isloading ? (
              <Loader />
            ) : (
              Array.isArray(quiz) &&
              quiz.map((q, index) => (
                <Box key={index}>
                  <AffichageQuiz
                    question={q.question}
                    answers={q.reponse}
                    numQuestion={index + 1}
                    onQuizClick={(reponse) =>
                      handleQuizClick(index, q._id, reponse)
                    }
                  />
                </Box>
              ))
            )}
            <Button
              variant="contained"
              color="success"
              onClick={() => onSubmit()}
            >
              Valider le quiz
            </Button>

            <PopUpValidationReponsesQuiz
              open={openPopUp}
              onClose={handleClosePopUp}
              quiz_id={quizId}
              reponses={reponses}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Formation;
