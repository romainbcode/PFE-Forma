import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Field, FieldArray } from "formik";
import ContenuTexteFormation from "./contenu-texte-formation";
import PlusSquare from "@mui/icons-material/Add";

const textFieldStyles = {
  width: "80%",
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

const SousChapitreFormation = ({
  chapitreIndex,
  sousChapitreIndex,
  formik,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        name={`chapitre.${chapitreIndex}.sous_chapitre.${sousChapitreIndex}.titre_sous_chapitre`}
        label="Titre du Sous-Chapitre"
        value={
          formik.values.chapitre[chapitreIndex].sous_chapitre[sousChapitreIndex]
            .titre_sous_chapitre
        }
        onChange={formik.handleChange}
        fullWidth
        margin="normal"
        sx={textFieldStyles}
      />
      <TextField
        name={`chapitre.${chapitreIndex}.sous_chapitre.${sousChapitreIndex}.description_sous_chapitre`}
        label="Description du Sous-Chapitre"
        value={
          formik.values.chapitre[chapitreIndex].sous_chapitre[sousChapitreIndex]
            .description_sous_chapitre
        }
        onChange={formik.handleChange}
        fullWidth
        margin="normal"
        sx={textFieldStyles}
      />
      <FieldArray
        name={`chapitre.${chapitreIndex}.sous_chapitre.${sousChapitreIndex}.corps_texte_image`}
        render={(arrayHelpers) => (
          <>
            {formik.values.chapitre[chapitreIndex].sous_chapitre[
              sousChapitreIndex
            ].corps_texte_image.map((_, texteIndex) => (
              <ContenuTexteFormation
                key={texteIndex}
                chapitreIndex={chapitreIndex}
                sousChapitreIndex={sousChapitreIndex}
                texteIndex={texteIndex}
                formik={formik}
              />
            ))}
            <Button
              onClick={() =>
                arrayHelpers.push({
                  texte: "",
                  texte_attention: "",
                  texte_conseil: "",
                })
              }
              startIcon={<PlusSquare />}
            >
              Ajouter du contenu
            </Button>
          </>
        )}
      />
    </Box>
  );
};

export default SousChapitreFormation;
