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
import { Loader } from "../../components/loader/loader";
import { Formik, Form, Field, FieldArray } from "formik";
import { Trash2 } from "lucide-react";
import { PlusSquare } from "lucide-react";
import { Toaster, toast } from "sonner";

export const CreationFormation = () => {
  const [isloading, setLoading] = useState(false);

  const initialValues = {
    title: "",
    description: "",
    chapitre: [
      {
        titre_chapitre: "",
        description_chapitre: "",
        sous_chapitre: [
          {
            titre_sous_chapitre: "",
            description_sous_chapitre: "",
            corps_texte_image: [
              { texte: "", texte_attention: "", texte_conseil: "" },
            ],
          },
        ],
      },
    ],
    avis: [{ note_sur5: 0 }],
  };

  const createNewFormation = async (values) => {
    try {
      //const data = await axios.post("/addFormation", values);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = (values) => {
    //createNewFormation(values);

    toast.success("ok");
    toast.error("ma");
  };

  useEffect(() => {
    //getFormationsRecentes();
  });

  return (
    <>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
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
                    bgcolor: "primary.mainGreenDark",
                    height: "fit-content",
                    width: "85%",
                    mb: 2,
                    padding: 5,
                    borderRadius: "10px",
                    boxShadow: "0 3px 10px #000",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ pb: 4, color: "primary.themewhite" }}
                  >
                    Créer sa formation
                  </Typography>
                  <Box sx={{ mt: 1, mb: 2 }} component="form">
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                      <Field
                        sx={{
                          mb: 3,
                          width: "50%",
                          "& label": { color: "primary.headLine" },
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
                        name="title"
                        placeholder="title"
                        label="Titre de la formation"
                        value={values.title}
                        as={TextField}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                      />
                      <Field
                        sx={{
                          mb: 3,
                          width: "50%",
                          fieldset: { borderColor: "primary.themewhite" },
                          "& label": { color: "primary.headLine" },
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
                        name="description"
                        placeholder="description"
                        label="Description de la formation"
                        as={TextField}
                        error={
                          touched.description && Boolean(errors.description)
                        }
                        helperText={touched.description && errors.description}
                      />
                    </Stack>
                  </Box>
                  <FieldArray
                    type="chapitre"
                    name="chapitre"
                    id="chapitre"
                    value={values.chapitre}
                    render={(tabChapitre) => (
                      <Box
                        className="formContainer"
                        sx={{
                          backgroundColor: "primary.mainGreenLight",
                          padding: 3,
                          mb: 2,
                          borderRadius: "10px",
                          boxShadow: "0 3px 10px #000",
                        }}
                      >
                        {values.chapitre.map((tabMapChapitre, index) => (
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
                                    "& label": { color: "primary.headLine" },
                                    "& label.Mui-focused": { color: "#FFFFFE" },
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
                                  name={`chapitre.${index}.titre_chapitre`}
                                  placeholder="Titre chapitre"
                                  label={`Chapitre : ${index}`}
                                  as={TextField}
                                />
                                <Field
                                  sx={{
                                    width: "100%",
                                    fieldset: {
                                      borderColor: "primary.themewhite",
                                    },
                                    "& label": { color: "primary.headLine" },
                                    "& label.Mui-focused": { color: "#FFFFFE" },
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
                                  }}
                                  name={`chapitre.${index}.description_chapitre`}
                                  placeholder="Description chapitre"
                                  label={`Description du chapitre : ${index}`}
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
                                  onClick={() => tabChapitre.remove(index)}
                                  startIcon={<Trash2 />}
                                >
                                  Supprime ce chapitre
                                </Button>
                              </Box>
                            </Box>

                            <FieldArray
                              type={`chapitre.${index}.sous_chapitre`}
                              name={`chapitre.${index}.sous_chapitre`}
                              id={`chapitre.${index}.sous_chapitre`}
                              value={values.chapitre[index].sous_chapitre}
                              render={(arrayAnswer) => (
                                <Box
                                  className="formContainer"
                                  style={{ width: "100%" }}
                                >
                                  {values.chapitre[index].sous_chapitre.map(
                                    (TestCase2, index2) => (
                                      <div
                                        style={{
                                          width: "90%",
                                          display: "flex",
                                          flexDirection: "column",
                                          float: "right",
                                          marginBottom: "10px",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            width: "100%",
                                            alignItems: "center",
                                            display: "flex",
                                            flexDirection: "row",
                                          }}
                                        >
                                          <Field
                                            sx={{
                                              width: "85%",
                                              fieldset: {
                                                borderColor:
                                                  "primary.themewhite",
                                              },
                                              "& label": {
                                                color: "primary.headLine",
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
                                            }}
                                            name={`chapitre.${index}.sous_chapitre.${index2}.titre_sous_chapitre`}
                                            placeholder="Answer text"
                                            label={`Chapitre : ${index}, Sous chapitre : ${index2}`}
                                            as={TextField}
                                          />
                                          <Box
                                            style={{
                                              width: "31%",
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
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
                                                arrayAnswer.remove(index2)
                                              }
                                              startIcon={<Trash2 />}
                                            >
                                              Supprime ce sous-chapitre
                                            </Button>
                                          </Box>
                                        </Box>
                                        <FieldArray
                                          type={`chapitre.${index}.sous_chapitre.${index2}.corps_texte_image`}
                                          name={`chapitre.${index}.sous_chapitre.${index2}.corps_texte_image`}
                                          id={`chapitre.${index}.sous_chapitre.${index2}.corps_texte_image`}
                                          value={
                                            values.chapitre[index]
                                              .sous_chapitre[index2]
                                              .corps_texte_image
                                          }
                                          render={(tabCorpsText) => (
                                            <Box
                                              className="formContainer"
                                              style={{
                                                width: "100%",
                                                marginTop: 10,
                                              }}
                                            >
                                              {values.chapitre[
                                                index
                                              ].sous_chapitre[
                                                index2
                                              ].corps_texte_image.map(
                                                (TestCase3, index3) => (
                                                  <Box>
                                                    <Box
                                                      sx={{
                                                        width: "100%",
                                                        alignItems: "center",
                                                        display: "flex",
                                                      }}
                                                    >
                                                      <Field
                                                        sx={{
                                                          width: "85%",
                                                          fieldset: {
                                                            borderColor:
                                                              "primary.themewhite",
                                                          },
                                                          "& label": {
                                                            color:
                                                              "primary.headLine",
                                                          },
                                                          "& label.Mui-focused":
                                                            {
                                                              color: "#FFFFFE",
                                                            },
                                                          "& .MuiOutlinedInput-root":
                                                            {
                                                              "& fieldset": {
                                                                border:
                                                                  "2px solid",
                                                                borderColor:
                                                                  "primary.button_background",
                                                              },
                                                              "&:hover fieldset":
                                                                {
                                                                  borderColor:
                                                                    "primary.headLine",
                                                                },
                                                            },
                                                        }}
                                                        name={`chapitre.${index}.sous_chapitre.${index2}.corps_texte_image.${index3}.texte`}
                                                        placeholder="Answer text"
                                                        label={`Chapitre : ${index}, Sous chapitre : ${index2}, corps text : ${index3}`}
                                                        as={TextField}
                                                      />
                                                    </Box>
                                                  </Box>
                                                )
                                              )}
                                            </Box>
                                          )}
                                        />
                                      </div>
                                    )
                                  )}

                                  <Button
                                    variant="contained"
                                    onClick={() => {
                                      arrayAnswer.push({
                                        answerText: "",
                                        stateAnswer: false,
                                      });
                                    }}
                                    sx={{
                                      width: "25%",
                                      height: "50%",
                                      bgcolor: "#dad7cd",
                                    }}
                                    endIcon={<PlusSquare />}
                                  >
                                    Ajouter un sous-chapitre
                                  </Button>
                                </Box>
                              )}
                            />
                          </div>
                        ))}
                        <Button
                          variant="contained"
                          onClick={() => {
                            tabChapitre.push({
                              question: "",
                              answer: [
                                {
                                  answerText: "",
                                  stateAnswer: false,
                                },
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
                          Ajouter un chapitre
                        </Button>
                      </Box>
                    )}
                  />

                  <Toaster expand={true} richColors />
                  <button
                    onClick={() =>
                      toast.success("Formation créée avec succès !")
                    }
                  >
                    Créer sa formation
                  </button>
                  <Button
                    sx={{ mt: 2 }}
                    type="submit"
                    variant="contained"
                    color="success"
                  >
                    Add this quiz
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

export default CreationFormation;
