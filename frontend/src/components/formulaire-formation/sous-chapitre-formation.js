import React from "react";
import { Box, Button, TextField, Divider } from "@mui/material";
import { Field, FieldArray } from "formik";
import ContenuTexteFormation from "./contenu-texte-formation";
import { PlusSquare } from "lucide-react";
import Trash2 from "@mui/icons-material/Delete";

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
    <Box>
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
      <Button
        variant="contained"
        color="error"
        sx={{ width: "80%" }}
        onClick={() =>
          formik.setFieldValue(
            `chapitre.${chapitreIndex}.sous_chapitre`,
            formik.values.chapitre[chapitreIndex].sous_chapitre.filter(
              (_, ctIndex) => ctIndex !== sousChapitreIndex
            )
          )
        }
        startIcon={<Trash2 />}
      >
        Supprimer ce sous-chapitre
      </Button>
      <Divider
        color="white"
        variant="middle"
        sx={{ marginTop: 3, marginBottom: 2 }}
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
              variant="contained"
              sx={{
                bgcolor: "primary.button_add",
                color: "primary.headLine",
                width: "60%",
              }}
              onClick={() =>
                arrayHelpers.push({
                  texte: "",
                  texte_attention: "",
                  texte_conseil: "",
                })
              }
              startIcon={<PlusSquare />}
            >
              Ajouter des textes
            </Button>
            <Divider
              color="white"
              variant="middle"
              sx={{ marginTop: 2, marginBottom: 2 }}
            />
          </>
        )}
      />
    </Box>
  );
};

export default SousChapitreFormation;
