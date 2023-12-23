import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { Loader } from "../../components/loader/loader";
import { useAuth0 } from "@auth0/auth0-react";
import { CoursCard } from "../../components/courscard/coursCard";

const url_back_node = process.env.REACT_APP_BACKNODE;

export const CoursDisponible = () => {
  const [formationsRecentes, setFormationsRecentes] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      COURS DISPO
      <CoursCard titre="TEST titre" />
    </Box>
  );
};

export default CoursDisponible;
