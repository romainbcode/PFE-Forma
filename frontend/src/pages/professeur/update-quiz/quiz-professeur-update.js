import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Stack,
  TextField,
  InputLabel,
  FormControl,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Formik, Form, Field, FieldArray } from "formik";
import { PlusSquare } from "lucide-react";
import { Toaster, toast } from "sonner";
import { QuestionReponseQuiz } from "../../../components/formulaire-quiz/question-reponse-quiz";

const url_back_node = process.env.REACT_APP_BACKNODE;

const textFieldStyles = {
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

export const QuizProfesseurUpdate = () => {
  const [isloading, setIsLoading] = useState(true);

  const { user, getAccessTokenSilently } = useAuth0();
  const [titreQuizs, setTitreQuizs] = useState([]);
  const [titre, setTitre] = useState("");
  const [question_reponse, setQuestion_reponse] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [quizList, setQuizList] = useState([]);

  const initialValues = {
    titre,
    question_reponse,
  };

  const getQuizsUser = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        url_back_node + "/user/quizs",
        {
          id_user_auth: user.sub,
        },
        config
      );
      setQuizList(data.quizs);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (user.sub) {
      getQuizsUser();
    }
  }, [user.sub]);

  const handleQuizSelect = (event) => {
    const newSelectedQuizId = event.target.value;
    const newSelectedQuiz = quizList.find(
      (quiz) => quiz._id === newSelectedQuizId
    );
    if (newSelectedQuiz) {
      setSelectedQuiz(newSelectedQuiz._id);
      setTitre(newSelectedQuiz.titre);
      setQuestion_reponse(newSelectedQuiz.question_reponse);
    } else {
      setSelectedQuiz("");
      setTitre("");
      setQuestion_reponse([]);
    }
  };

  const updateQuiz = async (values) => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      values["quiz_id"] = selectedQuiz;
      await axios.post(
        url_back_node + "/professeur/update/quiz",
        values,
        config
      );
      toast.success("Modification du quiz avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la modification du quiz !");
    }
  };

  const onSubmit = (values) => {
    updateQuiz(values);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" sx={{ pb: 2, color: "primary.headLine" }}>
            Choisissez le quiz que vous souhaitez modifier
          </Typography>
          <Typography sx={{ color: "primary.paragraph" }}>
            Sélectionnez le quiz à modifier, puis vous pourrez ajouter,
            supprimer ou encore modifier le contenu de celui-ci.
          </Typography>
          <Divider
            color="white"
            variant="middle"
            sx={{ marginTop: 3, marginBottom: 3 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormControl>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: "primary.paragraph" }}
            >
              Quiz à modifier
            </InputLabel>
            <Select
              label="Quiz à modifier"
              value={selectedQuiz}
              onChange={handleQuizSelect}
              defaultValue=""
              sx={{
                width: "300px",
                color: "red",

                "&.MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "primary.button_background",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.headLine",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.headLine",
                  },
                },
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {Array.isArray(quizList) &&
                quizList.map((quiz, index) => (
                  <MenuItem key={index} value={quiz._id}>
                    {quiz.titre}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
        <Divider
          color="white"
          variant="middle"
          sx={{
            marginTop: 3,
            marginBottom: 2,
          }}
        />
        <Toaster expand={true} richColors />
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          enableReinitialize={true}
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
                    }}
                  >
                    <Box>
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
                        <Box
                          sx={{
                            backgroundColor: "primary.mainGreenLight",
                            padding: 3,
                            borderRadius: "10px",
                            boxShadow: "0 3px 10px #000",
                          }}
                        >
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
                              bgcolor: "primary.button_add",
                              color: "primary.headLine",
                              width: "100%",
                            }}
                            startIcon={<PlusSquare />}
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
                      Modifier le quiz
                    </Button>
                  </Box>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default QuizProfesseurUpdate;
