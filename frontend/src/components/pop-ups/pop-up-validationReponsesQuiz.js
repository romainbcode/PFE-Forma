import React, { useEffect, useState, useMemo, useCallback } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const PopUpValidationReponsesQuiz = ({
  open,
  onClose,
  quiz_id,
  reponses,
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
          "/api-node/getTrueReponse",
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
          "/api-node/user/addScoreQuiz",
          {
            id_user_auth: user.sub,
            id_quiz: quiz_id,
            scores_pourcentage: (compteur / compteurTotal) * 100,
          },
          config
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("pas ok");
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "primary.button_background",
          boxShadow: 24,
          p: 4,
          borderRadius: 5,
        }}
      >
        <h2>Voici vos résultats : </h2>
        <p>Vous avez eu {(compteur / compteurTotal) * 100}% de réussite !</p>
        <Button variant="contained" color="error" onClick={() => clickButton()}>
          Fermer
        </Button>
      </Box>
    </Modal>
  );
};

export default PopUpValidationReponsesQuiz;
