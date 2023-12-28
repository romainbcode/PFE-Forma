import React, { useEffect, useState, useCallback } from "react";
import { Modal, Box, Button, Typography, Divider } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const url_back_node = process.env.REACT_APP_BACKNODE;

export const PopUpValidationReponsesQuiz = ({
  open,
  onClose,
  quiz_id,
  reponses,
  chapitre_id,
}) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [compteur, setCompteur] = useState(0);
  const [compteurTotal, setCompteurTotal] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const getTrueReponsesQuiz = useCallback(async () => {
    if (!loaded) {
      const token = await getAccessTokenSilently();
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      try {
        const { data } = await axios.post(
          url_back_node + "/getTrueReponse",
          {
            id_quiz: quiz_id,
          },
          config
        );
        setLoaded(true);
        const reponses_id = Object.values(reponses).map(
          (rep) => rep.reponse_id
        );
        let comp = 0;
        for (let i = 0; i < reponses_id.length; i++) {
          for (let j = 0; j < data.trueReponses.length; j++) {
            if (reponses_id[i] === data.trueReponses[j]) {
              comp += 1;
            }
          }
        }
        setCompteurTotal(reponses_id.length);
        setCompteur(comp);
      } catch (error) {
        console.log(error);
      }
    }
  });

  useEffect(() => {
    if (open) {
      getTrueReponsesQuiz();
    } else {
      setLoaded(false);
    }
  }, [open, getTrueReponsesQuiz]);

  const clickButton = async (req, res, next) => {
    if ((compteur / compteurTotal) * 100 >= 75) {
      const token = await getAccessTokenSilently();
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      try {
        const { data } = await axios.post(
          url_back_node + "/user/addScoreQuiz",
          {
            id_user_auth: user.sub,
            id_quiz: quiz_id,
            id_chapitre: chapitre_id,
            scores_pourcentage: (compteur / compteurTotal) * 100,
          },
          config
        );
      } catch (error) {
        console.log(error);
      }
      try {
        const { data } = await axios.post(
          url_back_node + "/quiz/addNote",
          {
            id_quiz: quiz_id,
            id_user_auth: user.sub,
            id_chapitre: chapitre_id,
            score_pourcentage: (compteur / compteurTotal) * 100,
          },
          config
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Votre score doit être supérieur à 75% !");
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
      disableEscapeKeyDown
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "primary.background",
          color: "primary.headLine",
          boxShadow: 24,
          p: 4,
          borderRadius: 5,
          border: "1px solid",
          borderColor: (compteur / compteurTotal) * 100 > 75 ? "green" : "red",
        }}
      >
        <Typography sx={{ textAlign: "center" }} variant="h5">
          Voici vos résultats :{" "}
        </Typography>
        <Divider
          color="white"
          variant="middle"
          sx={{ marginTop: 2, marginBottom: 2 }}
        />
        <Typography>
          Vous avez eu {(compteur / compteurTotal) * 100}% de réussite !
        </Typography>
        {(compteur / compteurTotal) * 100 > 75 ? (
          <Typography sx={{ mt: 2, mb: 2, textAlign: "justify" }}>
            Ce chapitre est validé !{" "}
          </Typography>
        ) : (
          <Typography sx={{ mt: 2, mb: 2, textAlign: "justify" }}>
            Ce chapitre n'est pas validé. Vous pouvez le recommencer !
          </Typography>
        )}

        <Button variant="contained" color="error" onClick={() => clickButton()}>
          Fermer
        </Button>
      </Box>
    </Modal>
  );
};

export default PopUpValidationReponsesQuiz;
