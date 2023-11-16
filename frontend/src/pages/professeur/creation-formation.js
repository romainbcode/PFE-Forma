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
import * as yup from "yup";

export const CreationFormation = () => {
  const [isloading, setLoading] = useState(false);

  const initialValues = {
    titre: "",
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

  const validationSchema = yup.object({
    titre: yup
      .string()
      .max(
        50,
        "Le titre de votre formation ne doit pas contenir plus de 50 caractères."
      )
      .required("Votre formation doit obligatoirement avoir un titre."),
    description: yup
      .string()
      .max(
        10,
        "La description de votre formation ne doit pas contenir plus de 50 caractères."
      )
      .required("Vous devez obligatoirement ajouter une description."),
    chapitre: yup.array(
      yup.object({
        titre_chapitre: yup
          .string()
          .max(
            50,
            "Les titres de vos chapitres ne doivent pas dépasser 50 caractères."
          )
          .required(
            "Tous les chapitres doivent obligatoirement avoir un titre."
          ),
        description_chapitre: yup
          .string()
          .max(
            400,
            "La description de votre chapitre ne doit pas dépasser 400 caractères."
          )
          .required(
            "Tous les chapitres doivent obligatoirement avoir une description."
          ),
        sous_chapitre: yup
          .array(
            yup.object({
              titre_sous_chapitre: yup
                .string()
                .max(
                  50,
                  "Les titres de vos sous-chapitres ne doivent pas dépasser 50 caractères."
                )
                .required(
                  "Tous les sous-chapitres doivent obligatoirement avoir un titre."
                ),
              description_sous_chapitre: yup
                .string()
                .max(
                  400,
                  "Les descriptions de vos sous-chapitres ne doivent pas dépasser 400 caractères."
                )
                .required(
                  "Tous les sous-chapitres doivent obligatoirement avoir une description."
                ),
              corps_texte_image: yup.array(
                yup.object({
                  texte: yup
                    .string()
                    .max(
                      400,
                      "Les textes ne doivent pas dépasser 400 caractères."
                    )
                    .required(
                      "Un sous-chapitre doit obligatoirement avoir du texte."
                    ),
                  texte_attention: yup
                    .string()
                    .max(
                      400,
                      "Les textes_attentions ne doivent pas dépasser 400 caractères."
                    ),
                  texte_conseil: yup
                    .string()
                    .max(
                      400,
                      "Les textes_conseils ne doivent pas dépasser 400 caractères."
                    ),
                })
              ),
            })
          )
          .min(2, "You must add a minimum of 2 answers"),
      })
    ),
  });

  const createNewFormation = async (values) => {
    try {
      console.log(values);

      const data = await axios.post(
        "http://localhost:3000/addFormation",
        values
      );
      console.log(data);
      toast.success("Création de la formation avec succès !");
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la création de la formation !");
    }
  };
  const onSubmit = (values) => {
    createNewFormation(values);
  };

  useEffect(() => {
    //getFormationsRecentes();
  });

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
                        label="Titre de la formation"
                        value={values.titre}
                        as={TextField}
                        error={touched.titre && Boolean(errors.titre)}
                        helperText={touched.titre && errors.titre}
                      />
                      <Field
                        sx={{
                          mb: 3,
                          width: "50%",
                          fieldset: { borderColor: "primary.themewhite" },
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
                        name="description"
                        placeholder="description"
                        label="Description de la formation"
                        value={values.description}
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
                                    input: {
                                      color: "primary.headLine",
                                    },
                                    "& label": { color: "primary.paragraph" },
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
                                    input: {
                                      color: "primary.headLine",
                                    },
                                    "& label": { color: "primary.paragraph" },
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
                              render={(tabSousChapitre) => (
                                <Box
                                  className="formContainer"
                                  style={{ width: "100%" }}
                                >
                                  {values.chapitre[index].sous_chapitre.map(
                                    (TestCase2, index2) => (
                                      <Box
                                        style={{
                                          width: "90%",
                                          display: "flex",
                                          flexDirection: "column",
                                          float: "right",
                                          marginBottom: "10px",
                                        }}
                                        key={index2}
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
                                            }}
                                            name={`chapitre.${index}.sous_chapitre.${index2}.titre_sous_chapitre`}
                                            placeholder="Answer text"
                                            label={`Chapitre : ${index}, Sous chapitre : ${index2}`}
                                            as={TextField}
                                          />
                                          <Field
                                            sx={{
                                              width: "85%",
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
                                            }}
                                            name={`chapitre.${index}.sous_chapitre.${index2}.description_sous_chapitre`}
                                            placeholder="Answer text"
                                            label={`Chapitre : ${index}, Description sous chapitre : ${index2}`}
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
                                                tabSousChapitre.remove(index2)
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
                                                  <Box
                                                    sx={{
                                                      width: "90%",
                                                      display: "flex",
                                                      flexDirection: "column",
                                                      float: "right",
                                                      marginBottom: "10px",
                                                    }}
                                                    key={index3}
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
                                                          input: {
                                                            color:
                                                              "primary.headLine",
                                                          },
                                                          "& label": {
                                                            color:
                                                              "primary.paragraph",
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
                                                      <Box
                                                        style={{
                                                          width: "31%",
                                                          display: "flex",
                                                          alignItems: "center",
                                                          justifyContent:
                                                            "center",
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
                                                            tabCorpsText.remove(
                                                              index3
                                                            )
                                                          }
                                                          startIcon={<Trash2 />}
                                                        >
                                                          Supprime ce corps de
                                                          texte
                                                        </Button>
                                                      </Box>
                                                    </Box>
                                                    <Box
                                                      sx={{
                                                        width: "100%",
                                                        alignItems: "center",
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        marginTop: 2,
                                                        marginBottom: 2,
                                                      }}
                                                    >
                                                      <Field
                                                        sx={{
                                                          width: "85%",
                                                          fieldset: {
                                                            borderColor:
                                                              "primary.themewhite",
                                                          },
                                                          input: {
                                                            color:
                                                              "primary.headLine",
                                                          },
                                                          "& label": {
                                                            color:
                                                              "primary.paragraph",
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
                                                        name={`chapitre.${index}.sous_chapitre.${index2}.corps_texte_image.${index3}.texte_attention`}
                                                        placeholder="Answer text"
                                                        label={`Chapitre : ${index}, Sous chapitre : ${index2}, texte_attention : ${index3}`}
                                                        as={TextField}
                                                      />
                                                      <Box
                                                        style={{
                                                          width: "31%",
                                                          display: "flex",
                                                          alignItems: "center",
                                                          justifyContent:
                                                            "center",
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
                                                            tabCorpsText.remove(
                                                              index3
                                                            )
                                                          }
                                                          startIcon={<Trash2 />}
                                                        >
                                                          Supprime ce corps de
                                                          texte attention
                                                        </Button>
                                                      </Box>
                                                    </Box>
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
                                                          input: {
                                                            color:
                                                              "primary.headLine",
                                                          },
                                                          "& label": {
                                                            color:
                                                              "primary.paragraph",
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
                                                        name={`chapitre.${index}.sous_chapitre.${index2}.corps_texte_image.${index3}.texte_conseil`}
                                                        placeholder="Answer text"
                                                        label={`Chapitre : ${index}, Sous chapitre : ${index2}, corps text : ${index3}`}
                                                        as={TextField}
                                                      />
                                                      <Box
                                                        style={{
                                                          width: "31%",
                                                          display: "flex",
                                                          alignItems: "center",
                                                          justifyContent:
                                                            "center",
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
                                                            tabCorpsText.remove(
                                                              index3
                                                            )
                                                          }
                                                          startIcon={<Trash2 />}
                                                        >
                                                          Supprime ce corps de
                                                          texte conseil
                                                        </Button>
                                                      </Box>
                                                    </Box>
                                                  </Box>
                                                )
                                              )}
                                              <Button
                                                variant="contained"
                                                onClick={() => {
                                                  tabCorpsText.push({
                                                    texte: "",
                                                    texte_attention: "",
                                                    texte_conseil: "",
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
                                      </Box>
                                    )
                                  )}

                                  <Button
                                    variant="contained"
                                    onClick={() => {
                                      tabSousChapitre.push({
                                        titre_sous_chapitre: "",
                                        description_sous_chapitre: "",
                                        corps_texte_image: [
                                          {
                                            texte: "",
                                            texte_attention: "",
                                            texte_conseil: "",
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
                              titre_chapitre: "",
                              description_chapitre: "",
                              sous_chapitre: [
                                {
                                  titre_sous_chapitre: "",
                                  description_sous_chapitre: "",
                                  corps_texte_image: [
                                    {
                                      texte: "",
                                      texte_attention: "",
                                      texte_conseil: "",
                                    },
                                  ],
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

                  <Button
                    sx={{ mt: 2 }}
                    type="submit"
                    variant="contained"
                    color="success"
                  >
                    Créer la formation
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
