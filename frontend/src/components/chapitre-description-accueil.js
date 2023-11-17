import React from "react";
import { Typography, Card, CardContent } from "@mui/material";

export const ChapitreDescriptionAccueil = (props) => {
  return (
    <Card
      variant="outlined"
      style={{
        margin: 15,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {props.titre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ChapitreDescriptionAccueil;
