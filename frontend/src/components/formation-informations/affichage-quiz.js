import React, { useState } from "react";
import { Typography, List, ListItem, Box, Divider } from "@mui/material";

export const AffichageQuiz = (props) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answer) => {
    props.onQuizClick(answer._id);
    setSelectedAnswer(answer._id);
    if (selectedAnswer != null) {
      setSelectedAnswer(answer._id);
    }
  };

  return (
    <Box elevation={3} sx={{ margin: 4 }}>
      <Typography variant="h5" style={{ marginBottom: 20 }}>
        {"Question " + props.numQuestion + " " + props.question}
      </Typography>
      <Divider
        color="white"
        variant="middle"
        sx={{ marginTop: 2, marginBottom: 3 }}
      />
      <List style={{ padding: 0 }}>
        {props.answers.map((answer, index) => (
          <ListItem
            key={index}
            onClick={() => handleAnswerClick(answer)}
            button
            style={{
              width: "80%",
              padding: 10,
              marginBottom: 10,
              border: "1px solid #FFF",
              borderRadius: 10,
              backgroundColor:
                selectedAnswer === answer._id ? "#ff8906" : "inherit",
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
