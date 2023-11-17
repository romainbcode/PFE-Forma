import React from "react";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { Erreur404 } from "./pages/erreur-404";
import { ChoixFormation } from "./pages/choix-formation";
import { CreationFormation } from "./pages/professeur/creation-formation";
import { FormationAccueil } from "./pages/formationAccueil";
import { Formation } from "./pages/formation";
import { CreationQuiz } from "./pages/professeur/creation-quiz";
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/formations" element={<ChoixFormation />} />
      <Route path="/formations/create" element={<CreationFormation />} />
      <Route path="/quizs/create" element={<CreationQuiz />} />
      <Route path="/formation/:formation_id" element={<FormationAccueil />} />
      <Route
        path="/formation/:formation_id/:chapitre_id"
        element={<Formation />}
      />
      <Route path="*" element={<Erreur404 />} />
    </Routes>
  );
};

export default App;
