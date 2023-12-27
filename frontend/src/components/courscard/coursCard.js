import React from "react";
import "./coursCard.css";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Toaster, toast } from "sonner";

const url_back_node = process.env.REACT_APP_BACKNODE;

export const CoursCard = (props) => {
  const { getAccessTokenSilently, user } = useAuth0();

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
