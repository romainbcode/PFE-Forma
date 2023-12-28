import React, { useState } from "react";
import { Chatbot } from "../chat-bot/chat-bot";
import axios from "axios";
import { Box, Typography, Button, Link, Paper } from "@mui/material";
import logo_robot from "../assets/robot.png";
import logo_direct from "../assets/diffusion-en-direct.png";
import logo_formation from "../assets/education.png";

export const Homepage = () => {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [hoverChatbot, setHoverChatbot] = useState(false);
  const [hoverFormation, setHoverFormation] = useState(false);
  const [hoverCoursDirect, setHoverCoursDirect] = useState(false);

  const handleMouseEnter = (setter) => {
    setter(true);
  };

  const handleMouseLeave = (setter) => {
    setter(false);
  };

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
          onMouseEnter={() => handleMouseEnter(setHoverChatbot)}
          onMouseLeave={() => handleMouseLeave(setHoverChatbot)}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "25px",
            }}
          >
            IA
          </Typography>
          {!hoverChatbot ? (
            <Box
              sx={{
                marginLeft: 2,
                marginRight: 2,
                marginBottom: 2,
                textAlign: "center",
              }}
            >
              <img
                src={logo_robot}
                alt="Description de l'image"
                style={{ maxWidth: "80%", maxHeight: "80%" }}
              />
            </Box>
          ) : (
            <Typography
              sx={{
                marginLeft: 2,
                marginRight: 2,
                marginBottom: 2,
                textAlign: "justify",
                fontSize: "12px",
              }}
            >
              Rencontrez notre chatbot intelligent, disponible 24/7 pour
              répondre à vos questions sur nos formations. Rapide, efficace et
              toujours prêt à aider, il rend votre expérience sur notre
              plateforme plus facile et interactive.
            </Typography>
          )}
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
          onMouseEnter={() => handleMouseEnter(setHoverFormation)}
          onMouseLeave={() => handleMouseLeave(setHoverFormation)}
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
          {!hoverFormation ? (
            <Box
              sx={{
                marginLeft: 2,
                marginRight: 2,
                marginBottom: 2,
                textAlign: "center",
              }}
            >
              <img
                src={logo_formation}
                alt="Description de l'image"
                style={{ maxWidth: "80%", maxHeight: "80%" }}
              />
            </Box>
          ) : (
            <Typography
              sx={{
                marginLeft: 2,
                marginRight: 2,
                marginBottom: 2,
                textAlign: "justify",
                fontSize: "12px",
              }}
            >
              Explorez une vaste gamme de formations conçues par des experts.
              Apprenez à votre rythme avec des ressources de qualité, adaptées à
              tous les niveaux et besoins. Votre parcours d'apprentissage
              personnalisé commence ici.
            </Typography>
          )}
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
          onMouseEnter={() => handleMouseEnter(setHoverCoursDirect)}
          onMouseLeave={() => handleMouseLeave(setHoverCoursDirect)}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            Cours en direct
          </Typography>
          {!hoverCoursDirect ? (
            <Box
              sx={{
                marginLeft: 2,
                marginRight: 2,
                marginBottom: 2,
                marginTop: 1,
                textAlign: "center",
              }}
            >
              <img
                src={logo_direct}
                alt="Description de l'image"
                style={{ maxWidth: "80%", maxHeight: "80%" }}
              />
            </Box>
          ) : (
            <Typography
              sx={{
                marginLeft: 2,
                marginRight: 2,
                marginBottom: 2,
                textAlign: "justify",
                fontSize: "12px",
              }}
            >
              Participez à nos cours en direct sur Google Classroom pour une
              expérience d'apprentissage interactive. Échangez en temps réel
              avec des enseignants et des apprenants du monde entier, et
              bénéficiez d'une rétroaction instantanée.
            </Typography>
          )}
        </Paper>
      </Box>

      <div style={{ position: "absolute", bottom: 0, right: 0 }}>
        <Chatbot />
      </div>
    </>
  );
};

export default Homepage;
