import React, { useState } from "react";
import { Navbar } from "../components/navbar";
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

  const createNewFormation = async () => {
    try {
      const options = {
        method: "post",
        url: "http://localhost:3000/addFormation",
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios(options)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const createNewUser = async () => {
    try {
      const options = {
        method: "post",
        url: "http://localhost:3000/addUser",
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios(options)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const createNewQuiz = async () => {
    try {
      const options = {
        method: "post",
        url: "http://localhost:3000/addQuiz",
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios(options)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
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
                paddingLeft: 4,
                paddingRight: 4,
                bgcolor: "primary.button_background",
                borderRadius: 3,
                fontWeight: "bold",
              }}
            >
              <Link sx={{ textDecoration: "none" }} to="/login">
                Essayer gratuitement
              </Link>
            </Button>
          </Box>
        </Box>
        <Box sx={{ position: "inherit", right: "12%", width: "50%" }}>
          <Container
            sx={{
              display: "flex",
              justifyContent: "flex-end", // Aligner les composants sur le côté droit
              height: "100vh", // 100% de la hauteur de la vue
              alignItems: "flex-start",
            }}
          >
            <Paper
              sx={{
                width: "200px",
                height: "200px",
                position: "absolute",
                top: "0%",
                left: "60%",
                bgcolor: "primary.button_background",
                color: "primary.headLine",

                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
                top: "19%",
                left: "78%",
                bgcolor: "primary.button_background",
                color: "primary.headLine",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
                top: "34%",
                left: "61%",
                bgcolor: "primary.button_background",
                color: "primary.headLine",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
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
          </Container>
        </Box>
      </Box>
      {/*<div className="page-layout">
        <div className="page-layout__content" />
        dede
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            summary
            <input type="text" value={summary} onChange={handleChangeSummary} />
          </label>
          <label>
            description
            <input
              type="text"
              value={description}
              onChange={handleChangeDescription}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>*/}

      {/*
      <Button sx={{ bgcolor: "red" }} onClick={createNewFormation}>
        Add FORMATION
      </Button>
      <Button sx={{ bgcolor: "green" }} onClick={createNewUser}>
        Add USER
      </Button>
      <Button sx={{ bgcolor: "cyan" }} onClick={createNewQuiz}>
        Add Quiz
      </Button>
          {isloading ? <Loader /> : <div>C'est chargé</div>}
          */}

      <div style={{ position: "absolute", bottom: 0, right: 0 }}>
        <Chatbot />
      </div>
    </>
  );
};

export default Homepage;
