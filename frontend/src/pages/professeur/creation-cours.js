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
import { Formik, Form, Field, FieldArray } from "formik";
import { PlusSquare } from "lucide-react";
import { Toaster, toast } from "sonner";
import * as yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
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
  const [dateCours, setDateCours] = useState("");

  const initialValues = {
    titre: "",
    description: "",
    date: "",
    heuredebut: "",
    heurefin: "",
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
    date: yup.string().required("Vous devez choisir un jour !"),
    heuredebut: yup
      .number()
      .min(0, "Impossible de mettre une heure négative.")
      .max(24, "Impossible de mettre une heure supérieur à 24.")
      .required(
        "Votre formation doit obligatoirement commencer à une certaine heure."
      ),
    heurefin: yup
      .number()
      .min(0, "Impossible de mettre une heure négative.")
      .max(24, "Impossible de mettre une heure supérieur à 24.")
      .required(
        "Votre formation doit obligatoirement terminer à une certaine heure."
      ),
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
      toast.error("Erreur lors de la création du cours !");
    }
  };
  const onSubmit = (values) => {
    values["date"] = format(selected, "dd/MM/yyyy");
    console.log(values);

    createNewCours(values);
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
                  <Typography
                    variant="h5"
                    sx={{ pb: 4, color: "primary.headLine" }}
                  >
                    Créer un créneau pour son cours
                  </Typography>

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
