import React, { useState } from "react";
import { Box, Typography, Button, TextField, Slide } from "@mui/material";
import { SendHorizontal } from "lucide-react";
import { Bot } from "lucide-react";
import { ChevronsDown } from "lucide-react";
import { ChevronsUp } from "lucide-react";

export const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showHeader, setShowHeader] = useState(true);

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      const chatbotResponse = "C'est une réponse du chatbot.";
      setMessages([
        ...messages,
        { userMessage: userInput, chatMessage: chatbotResponse },
      ]);
      console.log(messages);
      setUserInput("");
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const switchChatbotHeader = () => {
    setShowHeader(!showHeader);
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
      {showHeader ? (
        <Box>
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
          {messages.map((message, index) => (
            <Box key={index}>
              {message.userMessage && (
                <Box
                  className="user-message"
                  sx={{
                    backgroundColor: "primary.secondary",
                    borderRadius: "10px",
                    padding: "5px",
                    margin: "5px",
                    width: "80%",
                  }}
                >
                  {message.userMessage}
                </Box>
              )}
              {message.chatMessage && (
                <Box
                  className="chat-message"
                  sx={{
                    backgroundColor: "primary.tertiary",
                    borderRadius: "10px",
                    padding: "5px",
                    margin: "5px",
                    width: "80%",
                  }}
                >
                  {message.chatMessage}
                </Box>
              )}
            </Box>
          ))}
          <Box
            className="chatbot-input"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form style={{ width: "80%" }}>
              <TextField
                inputProps={{ style: { color: "#FFFFFE" } }}
                id="outlined-basic"
                label="Une question ?"
                variant="outlined"
                fullWidth
                value={userInput}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
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
