import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const PopUpValidationReponsesQuiz = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "red",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h2>Voici vos résultats : </h2>
        <p>blabla</p>
        <Button onClick={onClose}>Fermer</Button>
      </Box>
    </Modal>
  );
};

export default PopUpValidationReponsesQuiz;
