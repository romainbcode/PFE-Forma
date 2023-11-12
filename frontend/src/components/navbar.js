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
import { BookCopy, Home } from "lucide-react";
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
  const { logout, isAuthenticated } = useAuth0();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    logout();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
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
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disableRipple>
                <EditIcon />
                Edit
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <FileCopyIcon />
                Duplicate
              </MenuItem>

              <Divider sx={{ my: 1 }} />

              <MenuItem onClick={handleClose} disableRipple>
                <ArchiveIcon />
                Archive
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <MoreHorizIcon />
                More
              </MenuItem>
            </StyledMenu>

            <Home color="#ff8906" style={{ marginLeft: 5, marginRight: 5 }} />

            <Button
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
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
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disableRipple>
                <EditIcon />
                Edit
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <FileCopyIcon />
                Duplicate
              </MenuItem>

              <Divider sx={{ my: 1 }} />

              <MenuItem onClick={handleClose} disableRipple>
                <ArchiveIcon />
                Archive
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
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
                <Tooltip title="Informations utilisateur">
                  <IconButton onClick={handleOpenUserMenu}>
                    <UserCircle2 color="#ff8906" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "35px" }}
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
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "#000",
                          fontWeight: "bold",
                        }}
                        to="/user/information"
                      >
                        Information
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "#000",
                          fontWeight: "bold",
                        }}
                        to="/user/securite"
                      >
                        Sécurité
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "#000",
                          fontWeight: "bold",
                        }}
                        onClick={handleLogout}
                      >
                        Deconnexion
                      </Link>
                    </Typography>
                  </MenuItem>
                </Menu>
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
