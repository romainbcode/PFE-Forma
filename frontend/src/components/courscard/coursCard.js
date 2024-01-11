import React, { useState } from "react";
import "./coursCard.css";
import { Box, Typography, Button, CardMedia, Card } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Toaster, toast } from "sonner";

const url_back_node = process.env.REACT_APP_BACKNODE;

export const CoursCard = (props) => {
  let dateString = props.dateJour; // au format JJ/MM/AAAA
  let timeString = props.dateDebut; // au format HH:MM
  let offset = "+01:00"; // Décalage horaire souhaité

  // Séparation des composants de la date
  let dateParts = dateString.split("/");
  let day = parseInt(dateParts[0], 10);
  let month = parseInt(dateParts[1], 10) - 1; // Les mois en JavaScript commencent à 0 pour janvier
  let year = parseInt(dateParts[2], 10);

  // Séparation des composants de l'heure
  let timeParts = timeString.split(":");
  let hours = parseInt(timeParts[0], 10);
  let minutes = parseInt(timeParts[1], 10);

  let combinedDateDebut = new Date(Date.UTC(year, month, day, hours, minutes));
  combinedDateDebut = combinedDateDebut.toISOString().replace(".000Z", offset);
  let dateDebutString = combinedDateDebut.toString();

  timeString = props.dateFin;

  timeParts = timeString.split(":");
  hours = parseInt(timeParts[0], 10);
  minutes = parseInt(timeParts[1], 10);

  let combinedDateFin = new Date(Date.UTC(year, month, day, hours, minutes));
  combinedDateFin = combinedDateFin.toISOString().replace(".000Z", offset);
  let dateFinString = combinedDateFin.toString();

  const { getAccessTokenSilently, user } = useAuth0();
  const [tokenAuth, setTokenAuth] = useState();

  const test = async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    const data = await axios.post(
      url_back_node + "/cours/userSubscription",
      {
        id_user_auth: props.id_prof,
        id_cours: props.id,
        id_user_auth_subscription: user.sub,
      },
      config
    );

    //Get Token API Auth0
    const dataTokenAuth = await axios.post(
      url_back_node + "/getTokenAuth"
      //config
    );

    //Get Token google in order to use Google API's
    const dataTokenGoogle = await axios.post(
      url_back_node + "/getTokenGoogle",
      {
        tokenauth: dataTokenAuth.data.token_access,
      }
      //config
    );

    //Récupère l'identifiant de l'agenda stocké dans la BDD
    const getIdGoogleAgenda = await axios.post(
      url_back_node + "/user/getIdGoogleAgenda",
      {
        id_user_auth: props.id_prof,
      },
      config
    );

    //Si il existe déjà, alors pas besoin de le créer
    if (getIdGoogleAgenda.data.user.id_user_agenda !== "") {
      await axios.post(
        url_back_node + "/insertEventInAgenda",
        {
          token_google:
            dataTokenGoogle.data.message[0].identities[0].access_token,
          id_agenda: getIdGoogleAgenda.data.user.id_user_agenda,
          title: props.titre,
          description: props.description,
          dateHeureDebut: dateDebutString,
          dateHeureFin: dateFinString,
        }
        //config
      );
    } else {
      //Créer un calendier dans google agenda
      const dataInsertGoogleAgenda = await axios.post(
        url_back_node + "/insertGoogleAgenda",
        {
          token_google:
            dataTokenGoogle.data.message[0].identities[0].access_token,
          summary: "test",
        }
        //config
      );

      //Ajoute l'id dans la mongodb -> User
      await axios.post(
        url_back_node + "/user/addIdGoogleAgenda",
        {
          id_user_auth: props.id_prof,
          id_user_google_agenda: dataInsertGoogleAgenda.data.message.id,
        },
        config
      );

      await axios.post(
        url_back_node + "/insertEventInAgenda",
        {
          token_google:
            dataTokenGoogle.data.message[0].identities[0].access_token,
          id_agenda: dataInsertGoogleAgenda.data.message.id,
          title: props.titre,
          description: props.description,
          dateHeureDebut: dateDebutString,
          dateHeureFin: dateFinString,
        }
        //config
      );
    }

    //Créer un cours dans GoogleClassRoom
    await axios.post(
      url_back_node + "/insertCourse",
      {
        token_google:
          dataTokenGoogle.data.message[0].identities[0].access_token,
      }
      //config
    );

    if (data.status === 200) {
      toast.error(data.data.message);
    } else if (data.status === 201) {
      toast.success(data.data.message);
    }
  };
  return (
    <>
      <Toaster expand={true} richColors />
      <Box class="card">
        <Box class="card-border-top"></Box>
        <Box>{props.titre}</Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 1,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "60%",
              height: "60%",
              borderRadius: "20%",
              border: "1px solid",
              borderColor: "primary.button_background",
              transitionDuration: "1s",
              "&:hover": {
                cursor: "pointer",
                height: "65%",
                width: "65%",
                transitionDuration: "1s",
              },
              objectFit: "contain",
            }}
            image={props.image}
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography> </Typography>
        </Box>
        <Typography class="job">{props.description} </Typography>
        <Typography class="job">
          {props.dateDebut} - {props.dateFin}
        </Typography>
        <Typography class="job">{props.dateJour} </Typography>

        <Button
          onClick={() => {
            test();
          }}
        >
          S'inscrire
        </Button>
      </Box>
    </>
  );
};

export default CoursCard;
