import React, { useContext } from "react";
import { Box } from "@mui/material";
import { ListeMenuInfosUtilisateur } from "../../components/listeMenuInfosUtilisateur";
import { UserContext } from "../../userContexte";

export const InformationsUtilisateur = () => {
  const { userInfo } = useContext(UserContext);

  return (
    <Box>
      <ListeMenuInfosUtilisateur />
      {userInfo.role === 3
        ? "Compte Administrateur"
        : userInfo.role === 2
        ? "Compte Professeur"
        : "Compteur Utilisateur"}
      infos
    </Box>
  );
};

export default InformationsUtilisateur;
