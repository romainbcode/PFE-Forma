import { useAuth0 } from "@auth0/auth0-react";
import { Box } from '@mui/material';
import React, {useState} from "react";

export const LoginButton = () => {
  const color_headLine = "#fffffe"
  const color_buttonBackground = "#ff8906"

  const [hovered, setHovered] = useState(false);
  
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  return (
      <button className="button__login" onClick={handleLogin} 
        style={{backgroundColor: hovered ? color_headLine : color_buttonBackground,
        color: hovered ? color_buttonBackground : color_headLine,
        borderRadius: '5px',
        cursor: hovered ? 'pointer' : 'default',
        padding: '10px 20px',
        transition: 'background-color 0.3s, color 0.3s',
        border:'none',
        fontWeight:'bold',
        fontSize:'15px'
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Log In
      </button>
  );
};

export default LoginButton;