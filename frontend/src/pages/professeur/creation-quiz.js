import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Stack,
  TextField,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, FieldArray } from "formik";
import { Trash2 } from "lucide-react";
import { PlusSquare } from "lucide-react";
import { Toaster, toast } from "sonner";
import * as yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import { QuestionReponseQuiz } from "../../components/formulaire-quiz/question-reponse-quiz";

export const CreationQuiz = () => {
  const { user } = useAuth0();

  const initialValues = {
    titre: "",
    question_reponse: [
      {
        question: "",
        reponse: [
          {
            reponse_texte: "",
            etat_reponse: false,
          },
        ],
      },
    ],
  };

  const validationSchema = yup.object({
    question_reponse: yup.array(
      yup.object({
        question: yup
          .string()
          .max(100, "La question ne doit pas dépasser 100 caractères.")
          .required("Il doit forcemment y avoir une question."),

        reponse: yup.array(
          yup.object({
            reponse_texte: yup
              .string()
              .max(200, "La question ne doit pas dépasser 200 caractères.")
              .required(
                "Il doit forcemment y avoir une réponse à une question."
              ),
            etat_reponse: yup
              .bool()
              .required(
                "Une réponse doit forcemment avoir un état de réponse."
              ),
          })
        ),
        //.min(2, "You must add a minimum of 2 answers"),
      })
    ),
  });

  const createNewQuiz = async (values) => {
    try {
      values["id_user_auth"] = user.sub;
      await axios.post("/api-node/addQuiz", values);
      toast.success("Création du quiz avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la création du quiz !");
    }
  };
  const onSubmit = (values) => {
    createNewQuiz(values);
  };

  return (
    <>
      <Toaster expand={true} richColors />
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        //Permet de ne pas faire la vérification quand on quitte le focus d'un élement
        validateOnBlur={false}
        //Permet de ne pas faire la vérification à chaque changement
        validateOnChange={false}
      >
        {(formik) => {
          const { values, errors, touched } = formik;
          return (
            <Form>
              <Box
                sx={{
                  bgcolor: "primary.greenLight",
                  height: "100vh",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  pt: 3,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    paddingLeft: 3,
                    paddingRight: 3,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ pb: 4, color: "primary.headLine" }}
                  >
                    Créer son quiz
                  </Typography>
                  <Box>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                      <Field
                        sx={{
                          mb: 3,
                          width: "50%",
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
                        }}
                        autoComplete="off"
                        name="titre"
                        placeholder="Titre"
                        label="Titre du quiz"
                        value={values.titre}
                        as={TextField}
                        error={touched.titre && Boolean(errors.titre)}
                        helperText={touched.titre && errors.titre}
                      />
                    </Stack>
                  </Box>

                  <FieldArray
                    name="question_reponse"
                    render={(arrayHelpers) => (
                      <div>
                        {formik.values.question_reponse.map((_, index) => (
                          <QuestionReponseQuiz
                            key={index}
                            index={index}
                            formik={formik}
                          />
                        ))}
                        <Button
                          variant="contained"
                          onClick={() =>
                            arrayHelpers.push({
                              question: "",
                              reponse: [
                                { reponse_texte: "", etat_reponse: false },
                              ],
                            })
                          }
                          sx={{
                            width: "25%",
                            height: "50%",
                            bgcolor: "#dad7cd",
                          }}
                          endIcon={<PlusSquare />}
                        >
                          Ajouter une question
                        </Button>
                      </div>
                    )}
                  />

                  <Button
                    sx={{ mt: 2 }}
                    type="submit"
                    variant="contained"
                    color="success"
                  >
                    Créer le quiz
                  </Button>
                </Box>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CreationQuiz;
