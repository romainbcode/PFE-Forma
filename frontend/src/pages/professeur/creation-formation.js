import React, { useCallback, useMemo, useEffect, useState } from "react";
import { Box, Typography, Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../../components/loader/loader";
import { Formik, Form, Field, FieldArray } from "formik";
import { Trash2 } from "lucide-react";
import { PlusSquare } from "lucide-react";
import { Toaster, toast } from "sonner";
import * as yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import ChapitreFormation from "../../components/formulaire-formation/chapitre-formation";

const textFieldStyles = {
  width: "50%",
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

export const CreationFormation = () => {
  const [isloading, setLoading] = useState(false);
  const { user } = useAuth0();

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
        50,
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
        sous_chapitre: yup.array(
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
        ),
        //.min(2, "You must add a minimum of 2 answers"),
      })
    ),
  });

  const navigate = useNavigate();

  const createNewFormation = async (values) => {
    try {
      values["id_user_auth"] = user.sub;
      await axios.post("/api-node/addFormation", values);
      toast.success("Création de la formation avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la création de la formation !");
    }
  };
  const onSubmit = (values) => {
    createNewFormation(values);
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
        {(formik) => (
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
                <Box sx={{ mt: 1, mb: 2 }}>
                  <Field
                    sx={textFieldStyles}
                    autoComplete="off"
                    name="titre"
                    placeholder="Titre"
                    label="Titre de la formation"
                    value={formik.values.titre}
                    as={TextField}
                    error={formik.touched.titre && Boolean(formik.errors.titre)}
                    helperText={formik.touched.titre && formik.errors.titre}
                  />
                  <Field
                    sx={textFieldStyles}
                    autoComplete="off"
                    name="description"
                    placeholder="description"
                    label="Description de la formation"
                    value={formik.values.description}
                    as={TextField}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </Box>
                <FieldArray
                  name="chapitre"
                  render={(arrayHelpers) => (
                    <Box>
                      {formik.values.chapitre.map((_, index) => (
                        <ChapitreFormation
                          key={index}
                          index={index}
                          formik={formik}
                        />
                      ))}
                      <Button
                        variant="contained"
                        onClick={() =>
                          arrayHelpers.push({
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
                          })
                        }
                        startIcon={<PlusSquare />}
                      >
                        Ajouter un chapitre
                      </Button>
                    </Box>
                  )}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ mt: 2 }}
                >
                  Créer la formation
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreationFormation;
