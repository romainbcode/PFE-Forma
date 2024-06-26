import React from "react";
import { Box, Button, TextField, Divider } from "@mui/material";
import { Field, FieldArray } from "formik";
import SousChapitreFormation from "./sous-chapitre-formation";
import Trash2 from "@mui/icons-material/Delete";
import { PlusSquare } from "lucide-react";

const textFieldStyles = {
  width: "90%",
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

const ChapitreFormation = ({ index, formik }) => {
  return (
    <Box>
      <TextField
        name={`chapitre.${index}.titre_chapitre`}
        label="Titre du Chapitre"
        value={formik.values.chapitre[index].titre_chapitre}
        onChange={formik.handleChange}
        fullWidth
        margin="normal"
        sx={textFieldStyles}
      />
      <TextField
        name={`chapitre.${index}.description_chapitre`}
        label="Description du Chapitre"
        value={formik.values.chapitre[index].description_chapitre}
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
            "chapitre",
            formik.values.chapitre.filter(
              (_, chapitreIndex) => chapitreIndex !== index
            )
          )
        }
        startIcon={<Trash2 />}
      >
        Supprimer ce chapitre
      </Button>
      <Divider
        color="white"
        variant="middle"
        sx={{ marginTop: 3, marginBottom: 2 }}
      />
      <FieldArray
        name={`chapitre.${index}.sous_chapitre`}
        render={(arrayHelpers) => (
          <>
            {formik.values.chapitre[index].sous_chapitre.map(
              (_, sousChapitreIndex) => (
                <SousChapitreFormation
                  key={sousChapitreIndex}
                  chapitreIndex={index}
                  sousChapitreIndex={sousChapitreIndex}
                  formik={formik}
                />
              )
            )}
            <Button
              variant="contained"
              sx={{
                bgcolor: "primary.button_add",
                color: "primary.headLine",
                width: "80%",
              }}
              onClick={() =>
                arrayHelpers.push({
                  titre_sous_chapitre: "",
                  description_sous_chapitre: "",
                  corps_texte_image: [
                    { texte: "", texte_attention: "", texte_conseil: "" },
                  ],
                })
              }
              startIcon={<PlusSquare />}
            >
              Ajouter un sous-chapitre
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

export default ChapitreFormation;
