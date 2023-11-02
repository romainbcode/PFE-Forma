import { useAuth0 } from "@auth0/auth0-react";
import React, {useState} from "react";

export const LogoutButton = () => {
  const color_headLine = "#fffffe"
  const color_buttonBackground = "#ff8906"

  const [hovered, setHovered] = useState(false);

  const { logout } = useAuth0();

  const handleLogout = () => {
    logout();
  };

  return (
    <button className="button__logout" onClick={handleLogout}
      style={{backgroundColor: 'transparent',
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
      Log Out
    </button>
  );
};

export default LogoutButton;