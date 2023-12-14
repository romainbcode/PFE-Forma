import React from "react";
import { Box, Divider } from "@mui/material";
import { AttentionBox } from "./attention-text-box";
import { ConseilBox } from "./conseil-text-box";

export const SousChapText = (props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {props.textes &&
        props.textes.map((texte, index) => (
          <Box key={index}>
            <Box sx={{ marginBottom: 5 }}>{texte.texte}</Box>
            <Box>
              <AttentionBox>{texte.texte_attention}</AttentionBox>
            </Box>
            <Box>
              <ConseilBox>{texte.texte_conseil}</ConseilBox>
            </Box>
            <Divider
              color="white"
              variant="middle"
              sx={{ marginTop: 2, marginBottom: 2 }}
            />
          </Box>
        ))}
    </Box>
  );
};

export default SousChapText;
