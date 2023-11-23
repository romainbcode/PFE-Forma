import React from "react";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { Erreur404 } from "./pages/erreur-404";
import { ChoixFormation } from "./pages/choix-formation";
import { CreationFormation } from "./pages/professeur/creation-formation";
import { FormationAccueil } from "./pages/formationAccueil";
import { Formation } from "./pages/formation";
import { CreationQuiz } from "./pages/professeur/creation-quiz";
import { BadgesUtilisateur } from "./pages/utilisateur-parametres/badges-utilisateur";
import { InformationsUtilisateur } from "./pages/utilisateur-parametres/informations-utilisateur";
import { ScoresUtilisateur } from "./pages/utilisateur-parametres/scores-utilisateur";
import { FormationInscrite } from "./pages/formationInscrite";
import { AdminDashboard } from "./pages/admin/admin-dashboard";
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
      <Route
        path="/utilisateur/formation/inscrit"
        element={<FormationInscrite />}
      />
      <Route path="/utilisateur/badges" element={<BadgesUtilisateur />} />
      <Route
        path="/utilisateur/informations"
        element={<InformationsUtilisateur />}
      />
      <Route path="/utilisateur/scores" element={<ScoresUtilisateur />} />
      <Route path="/admin/dashboard/formations" element={<AdminDashboard />} />
      <Route path="*" element={<Erreur404 />} />
    </Routes>
  );
};

export default App;
