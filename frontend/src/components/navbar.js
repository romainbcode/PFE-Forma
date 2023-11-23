/*import { useAuth0 } from "@auth0/auth0-react";
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

export default Navbar*/

import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { BookCopy, Home, BookText } from "lucide-react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import { LoginButton } from "./login-button";
import { LogoutButton } from "./logout-button";
import { UserCircle2 } from "lucide-react";

import { useAuth0 } from "@auth0/auth0-react";

const color_headLine = "#fffffe";
const color_buttonBackground = "#ff8906";
const color_paragraphe = "#a7a9be";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 20,
    //marginTop: theme.spacing(1),
    minWidth: 180,
    color: "black",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "0",
    },

    "& .MuiMenuItem-root": {
      //Logos quand le menu s'ouvre
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: color_paragraphe,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
      //Hover quand des sous-menus quand menu est ouvert
      "&:hover": {
        backgroundColor: "red",
      },
    },
  },
}));

export const Navbar = () => {
  const { logout, isAuthenticated, user } = useAuth0();
  const handleLogout = () => {
    logout();
  };

  const [anchorMenuFormation, setAnchorMenuFormation] = React.useState(null);
  const openMenuFormation = Boolean(anchorMenuFormation);

  const handleClickMenuFormation = (event) => {
    setAnchorMenuFormation(event.currentTarget);
  };
  const handleCloseMenuFormation = () => {
    setAnchorMenuFormation(null);
  };

  const [anchorMenuContactez, setAnchorMenuContactez] = React.useState(null);
  const openMenuContactez = Boolean(anchorMenuContactez);

  const handleClickMenuContactez = (event) => {
    setAnchorMenuContactez(event.currentTarget);
  };
  const handleCloseMenuContactez = () => {
    setAnchorMenuContactez(null);
  };

  const [anchorMenuUtilisateur, setAnchorMenuUtilisateur] =
    React.useState(null);
  const openMenuUtilisateur = Boolean(anchorMenuUtilisateur);

  const handleClickMenuUtilisateur = (event) => {
    setAnchorMenuUtilisateur(event.currentTarget);
  };
  const handleCloseMenuUtilisateur = () => {
    setAnchorMenuUtilisateur(null);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const createNewUser = async (value) => {
    try {
      const data = await axios.post("/api-node/addUser", {
        id_user_auth: value,
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      createNewUser(user.sub);
    } else {
      console.log("pas auth");
    }
  });

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: "primary.background", color: "primary.headLine" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translate(-50%, 0%)",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
              id="demo-customized-buttonFormation"
              aria-controls={
                openMenuFormation ? "demo-customized-menuFormation" : undefined
              }
              aria-haspopup="true"
              aria-expanded={openMenuFormation ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClickMenuFormation}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                bgcolor: "transparent",
                color: color_headLine,
                fontWeight: "bold",
                ":hover": {
                  bgcolor: color_buttonBackground,
                  color: color_headLine,
                },
              }}
            >
              Formation
            </Button>
            <StyledMenu
              id="demo-customized-menuFormation"
              MenuListProps={{
                "aria-labelledby": "demo-customized-buttonFormation",
              }}
              anchorEl={anchorMenuFormation}
              open={openMenuFormation}
              onClose={handleCloseMenuFormation}
            >
              <Divider sx={{ my: 1 }}>Utilisateur</Divider>
              <MenuItem onClick={handleCloseMenuFormation} disableRipple>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/formations"
                >
                  <BookText />
                  Formations
                </Link>
              </MenuItem>
              <Divider sx={{ my: 1 }}>Professeur</Divider>
              <MenuItem onClick={handleCloseMenuFormation} disableRipple>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/formations/create"
                >
                  <BookText />
                  Créer une formation
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseMenuFormation} disableRipple>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/quizs/create"
                >
                  <BookText />
                  Créer un quiz
                </Link>
              </MenuItem>
            </StyledMenu>
            <Link
              style={{
                textDecoration: "none",
              }}
              to="/"
            >
              <Home color="#ff8906" style={{ marginLeft: 5, marginRight: 5 }} />
            </Link>

            <Button
              id="demo-customized-buttonContatez"
              aria-controls={
                openMenuContactez ? "demo-customized-menuContactez" : undefined
              }
              aria-haspopup="true"
              aria-expanded={openMenuContactez ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClickMenuContactez}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                bgcolor: "transparent",
                color: color_headLine,
                fontWeight: "bold",
                ":hover": {
                  bgcolor: color_buttonBackground,
                  color: color_headLine,
                },
              }}
            >
              Contactez
            </Button>
            <StyledMenu
              id="demo-customized-menuContactez"
              MenuListProps={{
                "aria-labelledby": "demo-customized-buttonContactez",
              }}
              anchorEl={anchorMenuContactez}
              open={openMenuContactez}
              onClose={handleCloseMenuContactez}
            >
              <MenuItem onClick={handleCloseMenuContactez} disableRipple>
                <EditIcon />
                Edit
              </MenuItem>
              <MenuItem onClick={handleCloseMenuContactez} disableRipple>
                <FileCopyIcon />
                Duplicate
              </MenuItem>

              <Divider sx={{ my: 1 }} />

              <MenuItem onClick={handleCloseMenuContactez} disableRipple>
                <ArchiveIcon />
                Archive
              </MenuItem>
              <MenuItem onClick={handleCloseMenuContactez} disableRipple>
                <MoreHorizIcon />
                More
              </MenuItem>
            </StyledMenu>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <BookCopy color="#fffffe" />

            <Typography
              variant="h6"
              noWrap
              sx={{
                ml: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
              }}
            >
              Nom_APP
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            ></IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              position: "absolute",
              right: 0,
            }}
          >
            {!isAuthenticated ? (
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                }}
              >
                <Button
                  id="demo-customized-buttonUtilisateur"
                  aria-controls={
                    openMenuContactez
                      ? "demo-customized-menuUtilisateur"
                      : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={openMenuUtilisateur ? "true" : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClickMenuUtilisateur}
                  endIcon={<UserCircle2 color="#ff8906" />}
                  sx={{
                    bgcolor: "transparent",
                    color: color_headLine,
                    fontWeight: "bold",
                    ":hover": {
                      bgcolor: "red",
                    },
                  }}
                ></Button>
                <StyledMenu
                  id="demo-customized-menuUtilisateur"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-buttonUtilisateur",
                  }}
                  anchorEl={anchorMenuUtilisateur}
                  open={openMenuUtilisateur}
                  onClose={handleCloseMenuUtilisateur}
                >
                  <MenuItem onClick={handleCloseMenuUtilisateur} disableRipple>
                    <EditIcon />
                    Information
                  </MenuItem>
                  <MenuItem onClick={handleCloseMenuUtilisateur} disableRipple>
                    <FileCopyIcon />
                    Sécurité
                  </MenuItem>

                  <MenuItem onClick={handleCloseMenuUtilisateur} disableRipple>
                    <ArchiveIcon />
                    Deconnexion
                  </MenuItem>
                </StyledMenu>
              </Box>
            ) : (
              <></>
            )}
            <MenuItem onClick={handleCloseUserMenu}>
              <LogoutButton />
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <LoginButton />
            </MenuItem>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              ></IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            ></Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
