import React from "react";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { Erreur404 } from "./pages/erreur-404";
import { ChoixFormation } from "./pages/choix-formation";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/formations" element={<ChoixFormation />} />
      <Route path="*" element={<Erreur404 />} />
    </Routes>
  );
};

export default App;
