import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { Loader } from "../components/loader/loader";
import { ChapitreDescriptionAccueil } from "../components/chapitre-description-accueil";
import { format } from "date-fns";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";

const url_back_node = process.env.REACT_APP_BACKNODE;

export const FormationAccueil = (props) => {
  const [formationById, setFormationById] = useState([]);
  const [chapitresFormation, setChapitresFormation] = useState([]);
  const [dateCreation, setDateCreation] = useState();
  const [idPremierChapitre, setIdPremierChapitre] = useState("");
  const [isloading, setIsLoading] = useState(true);
  const [etatEnvoieMail, setEtatEnvoieMail] = useState(false);

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

  const mailUtilisateur = async () => {
    try {
      await axios.post("http://localhost:3002/mail", {
        nomUser: user.name,
        emailUser: user.email,
        nomFormation: formationById.titre,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          {formationById.titre} créé le {dateCreation}
        </Typography>
        <Typography sx={{ color: "primary.paragraph" }}>
          Consultez ci-dessous la liste de tous les chapitres avec leur
          description.
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
        Array.isArray(chapitresFormation) &&
        chapitresFormation.map((chapitreFormation, index) => (
          <Box key={index}>
            <ChapitreDescriptionAccueil
              titre={chapitreFormation.titre_chapitre}
              description={chapitreFormation.description_chapitre}
              color_border={"primary.button_background"}
            />
          </Box>
        ))
      )}
      <Link to={`/formation/${formationById._id}/${idPremierChapitre}`}>
        <Button onClick={mailUtilisateur()} variant="contained" color="success">
          Commencer la formation
        </Button>
      </Link>
    </Box>
  );
};

export default FormationAccueil;
