import React from "react";
import { Box, Button, TextField } from "@mui/material";
import Trash2 from "@mui/icons-material/Delete";
const textFieldStyles = {
  width: "60%",
  fieldset: {
    borderColor: "primary.themewhite",
  },
  input: {
    color: "primary.headLine",
  },
  "& label": { color: "primary.paragraph" },
  "& label.Mui-focused": { color: "#FFFFFE" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "2px solid",
      borderColor: "primary.button_background",
    },
    "&:hover fieldset": {
      borderColor: "primary.headLine",
    },
  },
};

const ContenuTexteFormation = ({
  chapitreIndex,
  sousChapitreIndex,
  texteIndex,
  formik,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        name={`chapitre.${chapitreIndex}.sous_chapitre.${sousChapitreIndex}.corps_texte_image.${texteIndex}.texte`}
        label="Texte"
        value={
          formik.values.chapitre[chapitreIndex].sous_chapitre[sousChapitreIndex]
            .corps_texte_image[texteIndex].texte
        }
        onChange={formik.handleChange}
        fullWidth
        margin="normal"
        sx={textFieldStyles}
      />
      <TextField
        name={`chapitre.${chapitreIndex}.sous_chapitre.${sousChapitreIndex}.corps_texte_image.${texteIndex}.texte_attention`}
        label="Texte d'Attention"
        value={
          formik.values.chapitre[chapitreIndex].sous_chapitre[sousChapitreIndex]
            .corps_texte_image[texteIndex].texte_attention
        }
        onChange={formik.handleChange}
        fullWidth
        margin="normal"
        sx={textFieldStyles}
      />
      <TextField
        name={`chapitre.${chapitreIndex}.sous_chapitre.${sousChapitreIndex}.corps_texte_image.${texteIndex}.texte_conseil`}
        label="Texte Conseil"
        value={
          formik.values.chapitre[chapitreIndex].sous_chapitre[sousChapitreIndex]
            .corps_texte_image[texteIndex].texte_conseil
        }
        onChange={formik.handleChange}
        fullWidth
        margin="normal"
        sx={textFieldStyles}
      />
      <Button
        onClick={() =>
          formik.setFieldValue(
            `chapitre.${chapitreIndex}.sous_chapitre.${sousChapitreIndex}.corps_texte_image`,
            formik.values.chapitre[chapitreIndex].sous_chapitre[
              sousChapitreIndex
            ].corps_texte_image.filter((_, ctIndex) => ctIndex !== texteIndex)
          )
        }
        startIcon={<Trash2 />}
      >
        Supprimer ce contenu
      </Button>
    </Box>
  );
};

export default ContenuTexteFormation;
