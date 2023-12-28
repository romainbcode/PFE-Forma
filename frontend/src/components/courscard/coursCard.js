import React, { useState } from "react";
import "./coursCard.css";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Toaster, toast } from "sonner";

const url_back_node = process.env.REACT_APP_BACKNODE;

export const CoursCard = (props) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [tokenAuth, setTokenAuth] = useState();
  const getTokenAuthAPI = async () => {
    try {
      const options = {
        method: "POST",
        url: "http://localhost:3000/getTokenAuth",
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios(options)
        .then((response) => {
          setTokenAuth(response.data.token_access);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  const testGETGoogleToken = async (event, config) => {
    try {
      console.log("ok");
      const data = await axios.post(
        url_back_node + "/getTokenGoogle",
        {
          tokenauth: tokenAuth,
        },
        config
      );
      console.log("data", data);
    } catch (e) {
      console.log(e.message);
    }
  };

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
        <Box class="img"></Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography> </Typography>
        </Box>
        <Typography class="job">{props.description} </Typography>
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
