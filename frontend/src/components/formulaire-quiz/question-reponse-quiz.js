import React from "react";
import { ReponseQuiz } from "./reponse-quiz"; // Assurez-vous d'importer le composant Reponse
import Trash2 from "@mui/icons-material/Delete"; // Remplacez par l'icône appropriée
import { Box, Button, TextField } from "@mui/material";
import { FieldArray } from "formik";

export const QuestionReponseQuiz = ({ index, formik }) => {
  const { values, handleChange, setFieldValue } = formik;

  return (
    <Box
      sx={{
        backgroundColor: "primary.mainGreenLight",
        padding: 3,
        mb: 2,
        borderRadius: "10px",
        boxShadow: "0 3px 10px #000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <TextField
          name={`question_reponse.${index}.question`}
          label={`Question : ${index}`}
          value={values.question_reponse[index].question}
          onChange={handleChange}
          sx={{
            width: "100%",
            fieldset: {
              borderColor: "primary.themewhite",
            },
            input: {
              color: "primary.headLine",
            },
            "& label": { color: "primary.paragraph" },
            "& label.Mui-focused": {
              color: "#FFFFFE",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "2px solid",
                borderColor: "primary.button_background",
              },
              "&:hover fieldset": {
                borderColor: "primary.headLine",
              },
            },
            marginRight: 2,
          }}
        />
        <Button
          variant="contained"
          color="error"
          onClick={() =>
            formik.setFieldValue(
              "question_reponse",
              values.question_reponse.filter((_, qIndex) => qIndex !== index)
            )
          }
          startIcon={<Trash2 />}
        >
          Supprime cette question et ses réponses
        </Button>
      </Box>
      <FieldArray
        name={`question_reponse.${index}.reponse`}
        render={(arrayHelpers) => (
          <div>
            {values.question_reponse[index].reponse.map((_, reponseIndex) => (
              <ReponseQuiz
                key={reponseIndex}
                questionIndex={index}
                reponseIndex={reponseIndex}
                formik={formik}
              />
            ))}
            <Button
              variant="contained"
              onClick={() =>
                arrayHelpers.push({ reponse_texte: "", etat_reponse: false })
              }
            >
              Ajouter une réponse
            </Button>
          </div>
        )}
      />
    </Box>
  );
};

export default QuestionReponseQuiz;
