import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  // Fonction pour mettre à jour l'utilisateur
  const updateUser = (userInfo) => {
    setUserInfo(userInfo);
  };

  return (
    <UserContext.Provider value={{ userInfo, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
