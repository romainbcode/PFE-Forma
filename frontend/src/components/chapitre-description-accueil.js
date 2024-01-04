import React from "react";
import { Typography, Card, CardContent } from "@mui/material";

export const ChapitreDescriptionAccueil = (props) => {
  return (
    <Card
      variant="outlined"
      style={{
        margin: 15,
      }}
      sx={{
        bgcolor: "primary.background",
        border: "2px solid",
        borderColor: props.color_border,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{ color: "primary.headLine" }}
        >
          {props.titre}
        </Typography>
        <Typography sx={{ color: "primary.paragraph" }}>
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ChapitreDescriptionAccueil;
