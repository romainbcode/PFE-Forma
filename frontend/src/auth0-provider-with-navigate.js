import { Auth0Provider } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  const domain = process.env.REACT_APP_DOMAINE
  const clientId = process.env.REACT_APP_CLIENT_ID
  const redirectUri = process.env.REACT_APP_REDIRECT_URI
  const audience = process.env.REACT_APP_AUDIENCE

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        screen_hint: "signup",
        audience: audience,
        prompt: 'consent'
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;