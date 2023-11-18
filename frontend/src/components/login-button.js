import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import React from "react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  return (
    <Button
      className="button__login"
      onClick={handleLogin}
      sx={{
        bgcolor: "primary.button_background",
        borderRadius: "5px",
        padding: "5px 20px",
        transition: "background-color 0.3s",
        fontWeight: "bold",
      }}
    >
      Log In
    </Button>
  );
};

export default LoginButton;
