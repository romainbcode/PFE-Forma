import React from "react";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { Profile } from "./pages/profile";
import { Erreur404 } from "./pages/erreur-404";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Erreur404 />} />
    </Routes>
  );
};

export default App;
