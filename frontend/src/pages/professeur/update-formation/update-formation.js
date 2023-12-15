import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, FieldArray } from "formik";
import { PlusSquare } from "lucide-react";
import { Toaster, toast } from "sonner";
import * as yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import ChapitreFormation from "../../../components/formulaire-formation/chapitre-formation";

const url_back_node = process.env.REACT_APP_BACKNODE;

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

export const UpdateFormation = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [chapitre, setChapitre] = useState([]);
  const [isloading, setLoading] = useState(false);

  const { formation_id } = useParams();

  const getFormationById = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        url_back_node + "/formation/" + formation_id,
        config
      );
      setTitre(data.formationById.titre);
      setDescription(data.formationById.description);
      setChapitre(data.formationById.chapitre);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getFormationById();
  }, []);

  const initialValues = {
    titre,
    description,
    chapitre,
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

  const updateFormation = async (values) => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      values["formation_id"] = formation_id;
      await axios.post(
        url_back_node + "/professeur/update/quiz",
        values,
        config
      );
      toast.success("Modification de la formation avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la modification de la formation !");
    }
  };
  const onSubmit = (values) => {
    updateFormation(values);
  };

  return (
    <>
      <Toaster expand={true} richColors />
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
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
                  padding: 3,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ pb: 4, color: "primary.headLine" }}
                >
                  Créer sa formation
                </Typography>
                <Box
                  sx={{
                    mt: 1,
                    mb: 2,
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Field
                    sx={{
                      width: "50%",
                      marginRight: 5,
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
                    }}
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
                    <Box
                      sx={{
                        backgroundColor: "primary.mainGreenLight",
                        padding: 3,
                        borderRadius: "10px",
                        boxShadow: "0 3px 10px #000",
                      }}
                    >
                      {formik.values.chapitre.map((_, index) => (
                        <ChapitreFormation
                          key={index}
                          index={index}
                          formik={formik}
                        />
                      ))}
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "primary.button_add",
                          color: "primary.headLine",
                          width: "100%",
                        }}
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
                  sx={{
                    mt: 2,
                    display: "flex",
                    alignItems: "right",
                  }}
                >
                  Modifier la formation
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpdateFormation;
