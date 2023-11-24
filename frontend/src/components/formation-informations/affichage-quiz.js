import React, { useState } from "react";
import { Typography, List, ListItem, Box } from "@mui/material";

export const AffichageQuiz = (props) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer.reponse_texte);
  };

  return (
    <Box elevation={3} sx={{ margin: 5 }}>
      <Typography variant="h5" style={{ marginBottom: 20 }}>
        {"Question " + props.numQuestion + " " + props.question}
      </Typography>
      <List style={{ padding: 0 }}>
        {props.answers.map((answer, index) => (
          <ListItem
            key={index}
            button
            onClick={() => handleAnswerClick(answer)}
            style={{
              padding: 10,
              marginBottom: 10,
              border: "1px solid #ddd",
              backgroundColor:
                selectedAnswer === answer.reponse_texte ? "blue" : "inherit",
            }}
          >
            {answer.reponse_texte}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AffichageQuiz;
