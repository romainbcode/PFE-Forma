import React, { useState } from "react";
import { Chatbot } from "../chat-bot/chat-bot";
import axios from "axios";
import { Box, Typography, Button, Link, Paper, Container } from "@mui/material";
import { Loader } from "../components/loader/loader";

export const Homepage = () => {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [isloading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(summary, description);

      const options = {
        method: "post",
        url: "http://localhost:3000/insertGoogleAgenda",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          summary: summary,
          description: description,
        },
      };
      axios(options)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleChangeSummary = (event) => {
    setSummary(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "50%",
        }}
      >
        <Box
          sx={{
            width: "45%",
            position: "inherit",
            left: "12%",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: "bold",
            }}
          >
            Formez vous sur Nom_APP
          </Typography>
          <Typography
            sx={{
              marginTop: 10,
              color: "primary.paragraph",
              fontSize: 20,
              textAlign: "justify",
            }}
          >
            Préparez-vous à l'excellence éducative : notre application
            révolutionnaire offre une IA en temps réel pour répondre à vos
            questions simples et la possibilité d'interagir directement avec des
            professeurs pour des questions plus complexes. Découvrez des
            formations gratuites avec des cours en direct et obtenez des
            certifications en réussissant des quiz. Votre avenir éducatif
            commence ici.
          </Typography>
          <Box sx={{ marginTop: 5, display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                marginLeft: 4,
                marginRight: 4,
                bgcolor: "primary.button_background",
                borderRadius: 3,
                fontWeight: "bold",
                width: "50%",
              }}
            >
              <Link sx={{ textDecoration: "none" }} to="/login">
                Essayer gratuitement
              </Link>
            </Button>
          </Box>
        </Box>
        <Paper
          sx={{
            width: "200px",
            height: "200px",
            position: "absolute",
            top: "0%",
            right: "20%",
            bgcolor: "primary.button_background",
            color: "primary.headLine",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            zIndex: 1,
            transition: "transform 0.3s ease, z-index 0s",
            "&:hover": {
              transform: "scale(1.2)",
              zIndex: 1000,
            },
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            IA
          </Typography>
        </Paper>
        <Paper
          sx={{
            width: "200px",
            height: "200px",
            position: "absolute",
            top: "35%",
            right: "10%",
            bgcolor: "primary.button_background",
            color: "primary.headLine",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            zIndex: 2,
            transition: "transform 0.3s ease, z-index 0s",
            "&:hover": {
              transform: "scale(1.2)",
              zIndex: 1000,
            },
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            Formation
          </Typography>
        </Paper>
        <Paper
          sx={{
            width: "200px",
            height: "200px",
            position: "absolute",
            top: "70%",
            right: "20%",
            bgcolor: "primary.button_background",
            color: "primary.headLine",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            zIndex: 3,
            transition: "transform 0.3s ease, z-index 0s",
            "&:hover": {
              transform: "scale(1.2)",
              zIndex: 1000,
            },
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            Cours en direct
          </Typography>
        </Paper>
      </Box>

      <div style={{ position: "absolute", bottom: 0, right: 0 }}>
        <Chatbot />
      </div>
    </>
  );
};

export default Homepage;
