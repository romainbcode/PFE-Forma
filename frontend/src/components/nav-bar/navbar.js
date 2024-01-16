import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { BookCopy, Home } from "lucide-react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import { LoginButton } from "./login-button";
import { LogoutButton } from "./logout-button";
import { UserCircle2 } from "lucide-react";
import logo_app from "../../assets/logo_app.png";

import { useAuth0 } from "@auth0/auth0-react";

import { MenuFormation } from "./menu/menu-formation";
import { MenuUser } from "./menu/menu-user";

import { UserContext, UserProvider } from "../../userContexte";

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

  const [tokenAuth, setTokenAuth] = React.useState("");
  const { userInfo, updateUser } = React.useContext(UserContext);

  const getRoleUserAPI = async (id_user_auth) => {
    try {
      const options = {
        method: "POST",
        url: "http://localhost:3000/getRoleUser2",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          id_user_auth: id_user_auth,
          idtoken: tokenAuth,
        },
      };
      axios(options)
        .then((response) => {
          if (response.data[0].name === "student") {
            updateUser({
              id_user_auth: id_user_auth,
              role: 1,
            });
          } else if (response.data[0].name === "teacher") {
            updateUser({
              id_user_auth: id_user_auth,
              role: 2,
            });
          } else {
            updateUser({
              id_user_auth: id_user_auth,
              role: 3,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  const getTokenAuthAPI = async () => {
    try {
      const options = {
        method: "POST",
        url: "http://localhost:3000/getTokenAuth",
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios(options)
        .then((response) => {
          setTokenAuth(response.data.token_access);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  React.useEffect(() => {
    if (userInfo === null || userInfo === "") {
      console.log("pas de role");
      if (isAuthenticated) {
        getTokenAuthAPI();
        if (tokenAuth) {
          getRoleUserAPI(user.sub);
        }
      } else {
        console.log("pas auth");
      }
    } else {
      console.log("Role de : ", userInfo.id_user_auth, " est ", userInfo.role);
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
            {isAuthenticated && userInfo ? (
              <Box>
                <Button
                  id="demo-customized-buttonFormation"
                  aria-controls={
                    openMenuFormation
                      ? "demo-customized-menuFormation"
                      : undefined
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

                <MenuFormation
                  anchorEl={anchorMenuFormation}
                  open={openMenuFormation}
                  onClose={handleCloseMenuFormation}
                  roleUser={userInfo.role}
                />
              </Box>
            ) : (
              <></>
            )}

            <Link to="/">
              <Button
                sx={{
                  bgcolor: "transparent",
                  color: color_buttonBackground,
                  fontWeight: "bold",
                  ":hover": {
                    color: color_headLine,
                    bgcolor: "transparent",
                  },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Home />
              </Button>
            </Link>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <img width={75} height={75} src={logo_app} alt="logo_app" />

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
              EduVolution
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
            {isAuthenticated ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
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
                  sx={{
                    bgcolor: "transparent",
                    color: color_buttonBackground,
                    fontWeight: "bold",
                    ":hover": {
                      color: color_headLine,
                      bgcolor: "transparent",
                    },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <UserCircle2 />
                </Button>
                <MenuUser
                  anchorEl={anchorMenuUtilisateur}
                  open={openMenuUtilisateur}
                  onClose={handleCloseMenuUtilisateur}
                />
                <MenuItem onClick={handleCloseUserMenu}>
                  <LogoutButton />
                </MenuItem>
              </Box>
            ) : (
              <>
                <MenuItem onClick={handleCloseUserMenu}>
                  <LoginButton />
                </MenuItem>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
