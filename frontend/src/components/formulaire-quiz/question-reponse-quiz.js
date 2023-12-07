import React from "react";
import { ReponseQuiz } from "./reponse-quiz";
import Trash2 from "@mui/icons-material/Delete";
import { Box, Button, TextField, Divider } from "@mui/material";
import { FieldArray } from "formik";
import { PlusSquare } from "lucide-react";
const textFieldStyles = {
  marginBottom: 2,
  width: "100%",
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

export const QuestionReponseQuiz = ({ index, formik }) => {
  const { values, handleChange, setFieldValue } = formik;

  return (
    <Box>
      <TextField
        name={`question_reponse.${index}.question`}
        label={`Question : ${index}`}
        value={values.question_reponse[index].question}
        onChange={handleChange}
        sx={textFieldStyles}
      />
      <Button
        variant="contained"
        color="error"
        sx={{ width: "100%" }}
        onClick={() =>
          formik.setFieldValue(
            "question_reponse",
            values.question_reponse.filter((_, qIndex) => qIndex !== index)
          )
        }
        startIcon={<Trash2 />}
      >
        Supprimez cette question et ses réponses
      </Button>
      <Divider
        color="white"
        variant="middle"
        sx={{ marginTop: 3, marginBottom: 2 }}
      />
      <FieldArray
        name={`question_reponse.${index}.reponse`}
        render={(arrayHelpers) => (
          <Box sx={{ width: "100%" }}>
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
              sx={{
                bgcolor: "primary.button_add",
                color: "primary.headLine",
                width: "90%",
              }}
              startIcon={<PlusSquare />}
            >
              Ajouter une réponse
            </Button>
          </Box>
        )}
      />
      <Divider
        color="white"
        variant="middle"
        sx={{ marginTop: 3, marginBottom: 2 }}
      />
    </Box>
  );
};

export default QuestionReponseQuiz;
