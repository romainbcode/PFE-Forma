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

  const validationSchema = yup.object({});

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
                      placeholder="Titre"
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
                      placeholder="description"
                      label="description du cours"
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
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 1,
                      mb: 2,
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Field
                      sx={textFieldStyles}
                      autoComplete="off"
                      name="heuredebut"
                      placeholder="heuredebut"
                      label="heuredebut"
                      value={values.heuredebut}
                      as={TextField}
                      error={touched.heuredebut && Boolean(errors.heuredebut)}
                      helperText={touched.heuredebut && errors.heuredebut}
                    />
                    <Typography sx={{ marginLeft: 5, marginRight: 5 }}>
                      -
                    </Typography>
                    <Field
                      sx={textFieldStyles}
                      autoComplete="off"
                      name="heurefin"
                      placeholder="heurefin"
                      label="heurefin"
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
