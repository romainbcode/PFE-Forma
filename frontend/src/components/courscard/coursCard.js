import React from "react";
import "./coursCard.css";
import { Box, Typography, Link, Button } from "@mui/material";

export const CoursCard = (props) => {
  return (
    <Box class="card">
      <Box class="card-border-top"></Box>
      <Box class="img"></Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography> Person</Typography>
      </Box>
      <Typography class="job"> {props.titre}</Typography>
      <Button> S'inscrire</Button>
    </Box>
  );
};

export default CoursCard;
