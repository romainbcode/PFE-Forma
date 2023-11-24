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
                    type="question_reponse"
                    name="question_reponse"
                    id="question_reponse"
                    value={values.question_reponse}
                    render={(QuestionReponse) => (
                      <Box
                        sx={{
                          backgroundColor: "primary.mainGreenLight",
                          padding: 3,
                          mb: 2,
                          borderRadius: "10px",
                          boxShadow: "0 3px 10px #000",
                        }}
                      >
                        {values.question_reponse.map(
                          (mapQuestionReponse, index) => (
                            <div
                              className="formContainer"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                marginBottom: "20px",
                              }}
                              key={index}
                            >
                              <Box
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  flexDirection: "row",
                                  height: "100%",
                                  marginBottom: "10px",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                  }}
                                >
                                  <Field
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
                                          borderColor:
                                            "primary.button_background",
                                        },
                                        "&:hover fieldset": {
                                          borderColor: "primary.headLine",
                                        },
                                      },
                                      marginRight: 2,
                                    }}
                                    name={`question_reponse.${index}.question`}
                                    placeholder="Question"
                                    label={`Question : ${index}`}
                                    as={TextField}
                                  />
                                </Box>
                                <Box
                                  style={{
                                    marginLeft: 10,
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    color="error"
                                    sx={{ width: "100%", height: "75%" }}
                                    onClick={() =>
                                      QuestionReponse.remove(index)
                                    }
                                    startIcon={<Trash2 />}
                                  >
                                    Supprime cette question et ses réponses
                                  </Button>
                                </Box>
                              </Box>
                              <FieldArray
                                type={`question_reponse.${index}.reponse`}
                                name={`question_reponse.${index}.reponse`}
                                id={`question_reponse.${index}.reponse`}
                                value={values.question_reponse[index].reponse}
                                render={(Reponse) => (
                                  <Box
                                    sx={{
                                      backgroundColor: "primary.mainGreenLight",
                                      padding: 3,
                                      mb: 2,
                                      borderRadius: "10px",
                                      boxShadow: "0 3px 10px #000",
                                    }}
                                  >
                                    {values.question_reponse[index].reponse.map(
                                      (mapReponse, index2) => (
                                        <div
                                          className="formContainer"
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            marginBottom: "20px",
                                          }}
                                          key={index2}
                                        >
                                          <Box
                                            style={{
                                              width: "100%",
                                              display: "flex",
                                              flexDirection: "row",
                                              height: "100%",
                                              marginBottom: "10px",
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                width: "100%",
                                              }}
                                            >
                                              <Field
                                                sx={{
                                                  width: "100%",
                                                  fieldset: {
                                                    borderColor:
                                                      "primary.themewhite",
                                                  },
                                                  input: {
                                                    color: "primary.headLine",
                                                  },
                                                  "& label": {
                                                    color: "primary.paragraph",
                                                  },
                                                  "& label.Mui-focused": {
                                                    color: "#FFFFFE",
                                                  },
                                                  "& .MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                      border: "2px solid",
                                                      borderColor:
                                                        "primary.button_background",
                                                    },
                                                    "&:hover fieldset": {
                                                      borderColor:
                                                        "primary.headLine",
                                                    },
                                                  },
                                                  marginRight: 2,
                                                }}
                                                name={`question_reponse.${index}.reponse.${index2}.reponse_texte`}
                                                placeholder="Question"
                                                label={`Question : ${index}, Reponse : ${index2}`}
                                                as={TextField}
                                              />
                                            </Box>
                                            <Box
                                              style={{
                                                marginLeft: "10px",
                                                marginRight: "10px",
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "center",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Field
                                                sx={{
                                                  height: "20px",
                                                  width: "20px",
                                                  alignItems: "center",
                                                  mr: 1,
                                                  color: "primary.themewhite",
                                                }}
                                                name={`question_reponse.${index}.reponse.${index2}.etat_reponse`}
                                                as={Checkbox}
                                              />
                                              True/False
                                            </Box>
                                            <Box
                                              style={{
                                                marginLeft: 10,
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Button
                                                variant="contained"
                                                color="error"
                                                sx={{
                                                  width: "100%",
                                                  height: "75%",
                                                }}
                                                onClick={() =>
                                                  Reponse.remove(index2)
                                                }
                                                startIcon={<Trash2 />}
                                              >
                                                Supprimez cette réponse
                                              </Button>
                                            </Box>
                                          </Box>
                                        </div>
                                      )
                                    )}
                                    <Button
                                      variant="contained"
                                      onClick={() => {
                                        Reponse.push({
                                          reponse_texte: "",
                                          etat_reponse: false,
                                        });
                                      }}
                                      sx={{
                                        width: "55%",
                                        height: "50%",
                                        bgcolor: "#dad7cd",
                                      }}
                                      endIcon={<PlusSquare />}
                                    >
                                      Ajouter une réponse
                                    </Button>
                                  </Box>
                                )}
                              />
                            </div>
                          )
                        )}
                        <Button
                          variant="contained"
                          onClick={() => {
                            QuestionReponse.push({
                              question: "",
                              reponse: [
                                { reponse_texte: "", etat_reponse: false },
                              ],
                            });
                          }}
                          sx={{
                            width: "25%",
                            height: "50%",
                            bgcolor: "#dad7cd",
                          }}
                          endIcon={<PlusSquare />}
                        >
                          Ajouter une question
                        </Button>
                      </Box>
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
