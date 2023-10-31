import { useAuth0 } from "@auth0/auth0-react";
import React, {useState} from "react";
import { LoginButton } from "./login-button";
import { LogoutButton } from "./logout-button";
import axios from 'axios'

export const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const [tokenAuth, setTokenAuth] = useState("")

  const callAPIGoogle = async () => {
  
    try {
      

      const options = {
          method: 'GET',
          url: 'http://localhost:3000/getTokenGoogle/'+tokenAuth,
          headers: {
              'Content-Type': 'application/json',
          },
          
        };
        axios(options)
      .then(response => {
          console.log(response);
      })
      .catch(error => {
          console.log(error);
      });

    } catch (e) {
      console.log(e.message);
    }

    
  };

  const callAPI = async () => {
  
    try {
      

      const options = {
          method: 'POST',
          url: 'http://localhost:3000/getTokenAuth',
          headers: {
              'Content-Type': 'application/json',
          },
          
        };
        axios(options)
      .then(response => {
        setTokenAuth(response.data.token_access)
          console.log(response.data.token_access);
      })
      .catch(error => {
          console.log(error);
      });

    } catch (e) {
      console.log(e.message);
    }

    
  };

  return (
    <div className="nav-bar__buttons">
        <button onClick={callAPI} style={{width:'100px', height:'50px'}}>TEST API AUTH</button>
        <button onClick={callAPIGoogle} style={{width:'100px', height:'50px'}}>TEST API GOOGLE</button>
      {!isAuthenticated && (
        <>
          <LoginButton />
        </>
      )}
      {isAuthenticated && (
        <>
          <LogoutButton />
        </>
      )}
    </div>
    
  );
};

export default Navbar