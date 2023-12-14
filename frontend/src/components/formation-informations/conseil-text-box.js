import React from "react";
import { Box } from "@mui/material";
import { Lightbulb } from "lucide-react";

export const ConseilBox = ({ children }) => {
  const style = {
    backgroundColor: "#3E77B6",
    color: "white",
    borderRadius: "10px",
    padding: "20px",
    position: "relative",
    margin: "10px",
  };

  const labelStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    color: "black",
  };

  return (
    <Box sx={style}>
      <Box sx={labelStyle}>
        <Lightbulb />
      </Box>
      {children}
    </Box>
  );
};

export default ConseilBox;
