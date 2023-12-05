import React from "react";
import Trash2 from "@mui/icons-material/Delete";
import { Box, Button, TextField, Checkbox } from "@mui/material";

export const ReponseQuiz = ({ questionIndex, reponseIndex, formik }) => {
  const { values, handleChange } = formik;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 3,
        marginTop: 3,
        marginLeft: 8,
      }}
    >
      <TextField
        name={`question_reponse.${questionIndex}.reponse.${reponseIndex}.reponse_texte`}
        label={`Réponse : ${reponseIndex}`}
        value={
          values.question_reponse[questionIndex].reponse[reponseIndex]
            .reponse_texte
        }
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
        }}
      />
      <Checkbox
        name={`question_reponse.${questionIndex}.reponse.${reponseIndex}.etat_reponse`}
        checked={
          values.question_reponse[questionIndex].reponse[reponseIndex]
            .etat_reponse
        }
        onChange={handleChange}
        sx={{ marginRight: 2, marginLeft: 2 }}
      />
      <Button
        variant="contained"
        color="error"
        onClick={() =>
          formik.setFieldValue(
            `question_reponse.${questionIndex}.reponse`,
            values.question_reponse[questionIndex].reponse.filter(
              (_, rIndex) => rIndex !== reponseIndex
            )
          )
        }
        startIcon={<Trash2 />}
      >
        Supprimez cette réponse
      </Button>
    </Box>
  );
};

export default ReponseQuiz;