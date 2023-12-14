import React from "react";
import { Box } from "@mui/material";
import { AlertTriangle } from "lucide-react";

export const AttentionBox = ({ children }) => {
  const style = {
    backgroundColor: "#e2504c",
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
        <AlertTriangle />
      </Box>
      {children}
    </Box>
  );
};

export default AttentionBox;
