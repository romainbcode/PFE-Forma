import React, { useContext, useState, useEffect } from "react";
import { ListeMenuInfosUtilisateur } from "../../components/listeMenuInfosUtilisateur";
import { UserContext } from "../../userContexte";
import axios from "axios";
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth0 } from "@auth0/auth0-react";
import logo_google from "../../assets/google_logo.png";
import logo_auth0 from "../../assets/auth0_logo.png";

const color_headLine = "#fffffe";
const color_buttonBackground = "#ff8906";
const url_back_node = process.env.REACT_APP_BACKNODE;

export const InformationsUtilisateur = () => {
  const { userInfo } = useContext(UserContext);
  const { user, getAccessTokenSilently } = useAuth0();
  const [dateInscription, setDateInscription] = useState("");

  const getDateInscriptionUser = async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        url_back_node + "/user/dateInscription",
        {
          id_user_auth: user.sub,
        },
        config
      );
      setDateInscription(data.dateCreation);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDateInscriptionUser();
  });

  let info_compte = "";
  if (user.sub.includes("google-oauth2")) {
    info_compte = "Google";
  } else {
    info_compte = "Auth0";
  }

  console.log(user);
  return (
    <>
      <ListeMenuInfosUtilisateur />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 5,
          height: "70vh",
        }}
      >
        <Box
          sx={{
            width: "70%",
            boxShadow: "0 8px 14px 0 rgba(0, 0, 0, 0.2)",
            borderRadius: "20px",
            p: 2,
          }}
        >
          <Box>
            <Grid container>
              <Grid
                item
                xs={6}
                sx={{
                  p: 2,
                  borderRight: 2,
                  borderColor: "divider",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Avatar
                    sx={{ width: 100, height: 100, margin: "auto", mb: 2 }}
                    src={user.picture}
                  />
                  <Typography sx={{ mb: 2 }} variant="h4">
                    {user.name}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                    {userInfo.role === 3
                      ? "Compte Administrateur"
                      : userInfo.role === 2
                      ? "Compte Professeur"
                      : "Compteur Utilisateur"}{" "}
                    créé le {new Date(dateInscription).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>

              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <List component="nav">
                  <ListItem>
                    <ListItemIcon>
                      {info_compte === "Google" ? (
                        <img width={30} height={30} src={logo_google} />
                      ) : (
                        <img width={35} height={28} src={logo_auth0} />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={`Connecté avec ${info_compte}`} />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon sx={{ color: "primary.button_background" }} />
                    </ListItemIcon>
                    <ListItemText primary={user.email} />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default InformationsUtilisateur;
