import React from "react";
import "./formationCard.css";
import { Box, Typography, Link } from "@mui/material";

export const FormationCard = (props) => {
  return (
    <Box className="flip-card">
      <Box className="flip-card-inner">
        <Box
          className="flip-card-front"
          sx={{
            color: "primary.headLine",
            background:
              "linear-gradient(135deg, #ff8906 70%, #f25f4c 90%, #e53170 100%)",
          }}
        >
          <Typography class="title">{props.titre}</Typography>
        </Box>

        <Box
          className="flip-card-back"
          sx={{
            color: "primary.headLine",
            background:
              "linear-gradient(135deg, #ff8906 70%, #f25f4c 90%, #e53170 100%)",
          }}
        >
          <Typography>{props.description}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FormationCard;
