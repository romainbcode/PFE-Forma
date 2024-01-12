import React, { useState } from "react";
import { Box, Typography, Button, TextField, Divider } from "@mui/material";
import { SendHorizontal } from "lucide-react";
import { Bot } from "lucide-react";
import { ChevronsDown } from "lucide-react";
import { ChevronsUp } from "lucide-react";
import { LoaderEcriture } from "./loader-ecriture/loader-ecriture";
import { UserCircle2 } from "lucide-react";
import axios from "axios";

export const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showFullChatbot, setshowFullChatbot] = useState(true);

  const handleSendMessage = async () => {
    if (userInput.trim() !== "") {
      setIsLoading(true);
      const userInputEncode = encodeURIComponent(userInput);
      const reponse = await axios.get(
        "http://127.0.0.1:3003/IA/generateText/" + userInputEncode
      );
      let chatbotResponse = reponse.data.trim();
      chatbotResponse = chatbotResponse.split(" "); // Divise la chaîne en un tableau de mots
      chatbotResponse.shift(); // Supprime le premier élément du tableau
      const chatbotResponseStr = chatbotResponse.join(" "); // Recombine le tableau en une chaîne de caractères
      setMessages([
        ...messages,
        { userMessage: userInput, chatMessage: chatbotResponseStr },
      ]);
      setUserInput("");
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const switchChatbotHeader = () => {
    setshowFullChatbot(!showFullChatbot);
  };

  return (
    <Box
      className="chatbot"
      sx={{
        border: "2px solid",
        borderColor: "primary.button_background",
        borderRadius: "15px 15px 0 0",
        width: "300px",
      }}
    >
      {!showFullChatbot ? (
        <Box sx={{ borderRadius: "12px ", bgcolor: "primary.background" }}>
          <Button
            onClick={switchChatbotHeader}
            sx={{
              textDecoration: "none",
              padding: "0",
              width: "100%",
              bgcolor: "transparent",
            }}
          >
            <Box
              className="chatbot-header"
              sx={{
                borderRadius: "12px 12px 0 0",
                bgcolor: "primary.button_background",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "20px",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  paddingLeft: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Bot />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ fontWeight: "bold" }}>Chat-Bot</Typography>
                <Typography>Modèle llama-2</Typography>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  paddingRight: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ChevronsDown />
              </Box>
            </Box>
          </Button>
          <Typography
            sx={{
              p: 1,
              fontSize: 10,
              color: "primary.paragraph",
              textAlign: "justify",
            }}
          >
            Les réponses de ce chatbot sont uniquement informatives. Pour
            obtenir des informations détaillées, veuillez consulter un
            enseignant disponible sur Google Classroom.
          </Typography>
          <Divider color="white" variant="middle" sx={{ marginBottom: 1 }} />
          {isLoading && (messages.length >= 0 || messages.length === 0) ? (
            <LoaderEcriture />
          ) : (
            messages.map((message, index) => (
              <Box
                sx={{
                  width: "100%",
                  bgcolor: "primary.background",
                }}
                key={index}
              >
                {message.userMessage && (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "right",
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: "10px",
                    }}
                  >
                    <Box
                      className="user-message"
                      sx={{
                        backgroundColor: "primary.secondary",
                        borderRadius: "10px",
                        padding: "5px",
                        margin: "5px",
                        width: "80%",
                        textAlign: "justify",
                        dispay: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      {message.userMessage}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <UserCircle2 />
                    </Box>
                  </Box>
                )}
                {message.chatMessage && (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Bot />
                    </Box>
                    <Box
                      className="chat-message"
                      sx={{
                        backgroundColor: "primary.tertiary",
                        borderRadius: "10px",
                        padding: "5px",
                        margin: "5px",
                        width: "80%",
                        textAlign: "justify",
                      }}
                    >
                      {message.chatMessage}
                    </Box>
                  </Box>
                )}
              </Box>
            ))
          )}
          <Box
            className="chatbot-input"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderTop: "2px solid",
              borderColor: "primary.button_background",
            }}
          >
            <form style={{ width: "80%" }}>
              <TextField
                inputProps={{ style: { color: "#FFFFFE" } }}
                id="outlined-basic"
                label="Une question ?"
                variant="outlined"
                fullWidth
                multiline={true}
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyPress}
                autoComplete="off"
                sx={{
                  margin: "5px 0 5px 5px",
                  "& label": { color: "#FFFFFE" },
                  "& label.Mui-focused": { color: "#FFFFFE" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "2px solid",
                      borderColor: "primary.button_background",
                    },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.button_background",
                    },
                  },
                }}
              />
            </form>
            <Button
              variant="contained"
              onClick={handleSendMessage}
              sx={{
                marginLeft: "10px",
                marginRight: "5px",
                bgcolor: "primary.button_background",
                width: "10%",
                height: "30px",
                borderRadius: 28,
              }}
            >
              <SendHorizontal color="#fffffe" />
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Button
            onClick={switchChatbotHeader}
            sx={{ textDecoration: "none", padding: "0", width: "100%" }}
          >
            <Box
              className="chatbot-header"
              sx={{
                borderRadius: "12px 12px 0 0",
                backgroundColor: "primary.button_background",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "20px",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  paddingLeft: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Bot />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ fontWeight: "bold" }}>Chat-Bot</Typography>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  paddingRight: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ChevronsUp />
              </Box>
            </Box>
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Chatbot;
