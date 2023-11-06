import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const Erreur404 = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <h1>404 Error</h1>
      <h1>Page Not Found</h1>
      <Link to="/" style={{ color: "#FFFFFE" }}>
        {" "}
        Go to Home{" "}
      </Link>
    </Box>
  );
};

export default Erreur404;
