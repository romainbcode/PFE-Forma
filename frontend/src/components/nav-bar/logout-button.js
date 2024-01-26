import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import React from "react";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout();
  };

  return (
    <Button
      className="button__logout"
      onClick={handleLogout}
      sx={{
        bgcolor: "transparent",
        borderRadius: "5px",
        padding: "5px 20px",
        transition: "background-color 0.3s",
        fontWeight: "bold",
        "&:hover": {
          color: "primary.button_background",
        },
      }}
    >
      Deconnexion
    </Button>
  );
};

export default LogoutButton;
