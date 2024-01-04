import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Divider,
} from "@mui/material";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { Toaster, toast } from "sonner";
import * as yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "react-day-picker/dist/style.css";
const url_back_node = process.env.REACT_APP_BACKNODE;

const textFieldStyles = {
  width: "100%",
  input: {
    color: "primary.headLine",
  },
  marginTop: 5,
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

const textFieldStyles2 = {
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

export const CreationCours = () => {
  const { user, getAccessTokenSilently } = useAuth0();

  const initialValues = {
    titre: "",
    description: "",
    date: "",
    heuredebut: "",
    heurefin: "",
    image: null,
  };

  const validationSchema = yup.object({
    titre: yup
      .string()
      .required("Votre cours doit avoir un titre !")
      .max(50, "Le titre doit contenir moins de 50 caractères"),
    description: yup
      .string()
      .required("Votre cours doit avoir une description !")
      .max(50, "La description doit contenir moins de 50 caractères"),
    heuredebut: yup
      .string()
      .required(
        "Votre formation doit obligatoirement commencer à une certaine heure."
      )
      .matches(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "L'heure de début doit être au format HH:mm."
      ),
    heurefin: yup
      .string()
      .required(
        "Votre formation doit obligatoirement terminer à une certaine heure."
      )
      .matches(
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "L'heure de fin doit être au format HH:mm."
      ),
    image: yup.mixed().required("Vous devez mettre une image !"),
  });

  const createNewCours = async (values) => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      values["id_user_auth"] = user.sub;
      await axios.post(
        url_back_node + "/professeur/create/cours",
        values,
        config
      );
      toast.success("Création du cours avec succès !");
    } catch (error) {
      toast.error(
        "Erreur lors de la création du cours ! (Possiblement une image de trop grande qualité)"
      );
    }
  };
  const onSubmit = (values) => {
    if (selected) {
      values["date"] = format(selected, "dd/MM/yyyy");
      createNewCours(values);
    } else {
      toast.error("Vous devez obligatoirement choisir une date !");
    }
  };
  const [selected, setSelected] = useState(false);

  let footer = <Typography>Vous devez sélectionner un jour</Typography>;
  if (selected) {
    footer = (
      <Typography>
        Jour sélectionné : {format(selected, "dd/MM/yyyy")}
      </Typography>
    );
  }

  return (
    <>
      <Toaster expand={true} richColors />
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        //Permet de ne pas faire la vérification à chaque changement
        validateOnChange={false}
      >
        {(formik) => {
          const { values, errors, touched } = formik;
          return (
            <Form>
              <Box
                sx={{
                  height: "100vh",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  pt: 3,
                  pb: 10,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    paddingLeft: 3,
                    paddingRight: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "left",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ pb: 2, color: "primary.headLine" }}
                    >
                      Créez votre cours
                    </Typography>
                    <Typography sx={{ color: "primary.paragraph" }}>
                      Vous pouvez choisir n'importe quel jour pour vos cours.
                      Ceux-ci se feront en direct sur Google Classroom.
                    </Typography>
                    <Divider
                      color="white"
                      variant="middle"
                      sx={{ marginTop: 3, marginBottom: 4 }}
                    />
                  </Box>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    sx={{ marginBottom: 3 }}
                  >
                    <Field
                      sx={textFieldStyles}
                      autoComplete="off"
                      name="titre"
                      placeholder="Titre du cours"
                      label="Titre du cours"
                      value={values.titre}
                      as={TextField}
                      error={touched.titre && Boolean(errors.titre)}
                      helperText={touched.titre && errors.titre}
                    />
                  </Stack>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    sx={{ marginBottom: 3 }}
                  >
                    <Field
                      sx={textFieldStyles}
                      autoComplete="off"
                      name="description"
                      placeholder="Description du cours"
                      label="Description du cours"
                      value={values.description}
                      as={TextField}
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Stack>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      ".rdp-day_selected": {
                        backgroundColor: "primary.button_background",
                        color: "primary.headLine",
                      },
                      ".rdp-nav_icon": {
                        color: "primary.button_background",
                      },
                    }}
                  >
                    <DayPicker
                      mode="single"
                      selected={selected}
                      onSelect={setSelected}
                      footer={footer}
                      locale={fr}
                      style={{
                        boxShadow: "0 3px 10px #000",
                        padding: "30px",
                        borderRadius: 10,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      mb: 2,
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <Field
                      sx={textFieldStyles2}
                      autoComplete="off"
                      name="heuredebut"
                      placeholder="Heure de début"
                      label="Heure de début"
                      value={values.heuredebut}
                      as={TextField}
                      error={touched.heuredebut && Boolean(errors.heuredebut)}
                      helperText={touched.heuredebut && errors.heuredebut}
                    />
                    <Typography sx={{ marginLeft: 5, marginRight: 5 }}>
                      -
                    </Typography>
                    <Field
                      sx={textFieldStyles2}
                      autoComplete="off"
                      name="heurefin"
                      placeholder="Heure de fin"
                      label="Heure de fin"
                      value={values.heurefin}
                      as={TextField}
                      error={touched.heurefin && Boolean(errors.heurefin)}
                      helperText={touched.heurefin && errors.heurefin}
                    />
                  </Box>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: "10px",
                      boxShadow: "0 3px 10px #000",
                      border: "2px dashed",
                      borderColor: "primary.button_background",
                    }}
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      //maxFiles={3}
                      onDrop={(acceptedFiles) => {
                        acceptedFiles.map((file, index) => {
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onloadend = () => {
                            formik.setFieldValue("image", reader.result);
                          };
                        });
                      }}
                    >
                      {({ getRootProps, getInputProps, isDragActive }) => (
                        <Box
                          {...getRootProps()}
                          p="1rem"
                          sx={{
                            "&:hover": { cursor: "pointer" },
                          }}
                        >
                          <input name="banner" {...getInputProps()} />
                          {isDragActive ? (
                            <>
                              <p style={{ textAlign: "center" }}>
                                <CloudUploadIcon
                                  sx={{
                                    color: "primary.button_background",
                                    mr: 2,
                                  }}
                                />
                              </p>
                              <Typography
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                Déposer ici !
                              </Typography>
                            </>
                          ) : values.image === null ? (
                            <>
                              <p style={{ textAlign: "center" }}>
                                <CloudUploadIcon
                                  sx={{
                                    color: "primary.button_background",
                                    mr: 2,
                                  }}
                                />
                              </p>
                              <Typography
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                Glissez déposer votre image ici ou cliquer pour
                                choisir dans vos dossiers
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                  alignItems: "center",
                                }}
                              >
                                <Box>
                                  <img
                                    style={{ maxWidth: "100px" }}
                                    src={values.image}
                                    alt=""
                                  />
                                </Box>
                              </Box>
                            </>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                  <Button
                    sx={{ mt: 2 }}
                    type="submit"
                    variant="contained"
                    color="success"
                  >
                    Créer son cours
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

export default CreationCours;
