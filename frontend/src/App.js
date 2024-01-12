import React, { useEffect, useContext } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { Erreur404 } from "./pages/erreur-404";
import { ChoixFormation } from "./pages/choix-formation";
import { CreationFormation } from "./pages/professeur/creation-formation";
import { FormationAccueil } from "./pages/formationAccueil";
import { Formation } from "./pages/formation";
import { CreationQuiz } from "./pages/professeur/creation-quiz";
import { InformationsUtilisateur } from "./pages/utilisateur-parametres/informations-utilisateur";
import { ScoresUtilisateur } from "./pages/utilisateur-parametres/scores/scores-utilisateur";
import { FormationInscrite } from "./pages/formationInscrite";
import { AdminDashboard } from "./pages/admin/admin-dashboard";
import { FormationProfesseur } from "./pages/professeur/formation-professeur";
import { QuizsInFormation } from "./pages/professeur/quizs-in-formation";
import { FormationProfesseurUpdate } from "./pages/professeur/update-formation/formation-professeur-update";
import { UpdateFormation } from "./pages/professeur/update-formation/update-formation";
import { QuizProfesseurUpdate } from "./pages/professeur/update-quiz/quiz-professeur-update";
import { CoursDisponible } from "./pages/cours/cours-disponible";
import { CreationCours } from "./pages/professeur/creation-cours";
import { ChapitreScore } from "./pages/utilisateur-parametres/scores/chapitre-score";
import { Unauthorized } from "./pages/unauthorized";

import { UserContext } from "./userContexte";

function PrivateRoute({ element: Element, roles }) {
  const { userInfo } = useContext(UserContext);
  const location = useLocation();

  if (!userInfo || !roles.includes(userInfo.role)) {
    // Rediriger si l'utilisateur n'est pas connecté ou n'a pas le rôle requis
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // Renvoyer l'élément si l'utilisateur a le rôle requis
  return Element;
}

export const App = () => {
  useEffect(() => {
    console.log("APP.js");
  });
  return (
    <Routes>
      <Route
        path="/"
        element={<PrivateRoute element={<Homepage />} roles={[1, 2, 3]} />}
      />
      <Route
        path="/formations"
        element={
          <PrivateRoute element={<ChoixFormation />} roles={[1, 2, 3]} />
        }
      />

      <Route
        path="/formation/:formation_id"
        element={
          <PrivateRoute element={<FormationAccueil />} roles={[1, 2, 3]} />
        }
      />
      <Route
        path="/formation/:formation_id/:chapitre_id"
        element={<Formation />}
      />
      <Route
        path="/utilisateur/formation/inscrit"
        element={
          <PrivateRoute element={<FormationInscrite />} roles={[1, 2, 3]} />
        }
      />
      <Route
        path="/utilisateur/informations"
        element={
          <PrivateRoute
            element={<InformationsUtilisateur />}
            roles={[1, 2, 3]}
          />
        }
      />
      <Route
        path="/utilisateur/scores"
        element={
          <PrivateRoute element={<ScoresUtilisateur />} roles={[1, 2, 3]} />
        }
      />
      <Route
        path="/utilisateur/scores/:formation_id"
        element={<PrivateRoute element={<ChapitreScore />} roles={[1, 2, 3]} />}
      />

      <Route
        path="/cours/disponible"
        element={
          <PrivateRoute element={<CoursDisponible />} roles={[1, 2, 3]} />
        }
      />
      <Route
        path="/professeur/formations"
        element={
          <PrivateRoute element={<FormationProfesseur />} roles={[2, 3]} />
        }
      />
      <Route
        path="/professeur/list/formations/update"
        element={
          <PrivateRoute
            element={<FormationProfesseurUpdate />}
            roles={[2, 3]}
          />
        }
      />
      <Route
        path="/professeur/formation/update/:formation_id"
        element={<PrivateRoute element={<UpdateFormation />} roles={[2, 3]} />}
      />
      <Route
        path="/professeur/quiz/update"
        element={
          <PrivateRoute element={<QuizProfesseurUpdate />} roles={[2, 3]} />
        }
      />
      <Route
        path="/professeur/formation/quiz-in/:formation_id"
        element={<PrivateRoute element={<QuizsInFormation />} roles={[2, 3]} />}
      />
      <Route
        path="/formations/create"
        element={
          <PrivateRoute element={<CreationFormation />} roles={[2, 3]} />
        }
      />
      <Route
        path="/quizs/create"
        element={<PrivateRoute element={<CreationQuiz />} roles={[2, 3]} />}
      />
      <Route
        path="/cours/creation"
        element={<PrivateRoute element={<CreationCours />} roles={[2, 3]} />}
      />

      <Route
        path="/admin/dashboard/formations"
        element={<PrivateRoute element={<AdminDashboard />} roles={[3]} />}
      />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Erreur404 />} />
    </Routes>
  );
};

export default App;
