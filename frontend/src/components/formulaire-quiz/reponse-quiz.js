import React from "react";
import Trash2 from "@mui/icons-material/Delete";
import { Box, Button, TextField, Checkbox, Divider } from "@mui/material";

const textFieldStyles = {
  width: "90%",
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

export const ReponseQuiz = ({ questionIndex, reponseIndex, formik }) => {
  const { values, handleChange } = formik;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
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
          sx={textFieldStyles}
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
      </Box>
      <Box>
        <Button
          variant="contained"
          color="error"
          sx={{ marginTop: 2, width: "90%" }}
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
        <Divider
          color="white"
          variant="middle"
          sx={{ marginTop: 2, marginBottom: 2 }}
        />
      </Box>
    </Box>
  );
};

export default ReponseQuiz;
