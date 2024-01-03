import React, { useEffect, useState } from "react";
import { Box, Divider, Typography, IconButton } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Toaster, toast } from "sonner";
import { useAuth0 } from "@auth0/auth0-react";

const url_back_node = process.env.REACT_APP_BACKNODE;

export const AdminDashboard = () => {
  const [formations, setFormations] = useState([]);
  const [quizs, setQuizs] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  const getFormations = async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        url_back_node + "/formations/recente",
        config
      );
      setFormations(data.formations);
    } catch (error) {
      console.log(error);
    }
  };

  const getQuizs = async () => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        url_back_node + "/quizs/recente",
        config
      );
      setQuizs(data.quizs);
    } catch (error) {
      console.log(error);
    }
  };

  const supprimeFormationById = async (e, id) => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    if (window.confirm("Voulez-vous vraiment supprimer cette formation ?")) {
      try {
        await axios.delete(
          url_back_node + `/admin/supprime/formation/${id}`,
          config
        );
        toast.success("Suppresion de la formation avec succès !");
        getFormations();
      } catch (error) {
        toast.error("Echec lors de la suppression de la formation !");
      }
    }
  };

  const supprimeQuizById = async (e, id) => {
    const token = await getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    if (window.confirm("Voulez-vous vraiment supprimer ce quiz ?")) {
      try {
        await axios.delete(
          url_back_node + `/admin/supprime/quiz/${id}`,
          config
        );
        toast.success("Suppresion du quiz avec succès !");
        getQuizs();
      } catch (error) {
        toast.error("Echec lors de la suppression du quiz !");
      }
    }
  };

  useEffect(() => {
    getFormations();
    getQuizs();
  }, []);

  const columnsFormation = [
    {
      field: "_id",
      headerName: "ID formation",
      width: 100,
    },
    {
      field: "Titre",
      headerName: "Titre formation",
      width: 320,
      renderCell: (params) => <label>{params.row.titre} </label>,
    },
    {
      field: "Description",
      headerName: "Description formation",
      width: 150,
      renderCell: (params) => <label>{params.row.description}</label>,
    },

    {
      field: "Actions",
      width: 100,
      renderCell: (value) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <Link to={`/professeur/formation/update/${value.row._id}`}>
            <IconButton aria-label="edit">
              <EditIcon sx={{ color: "#1976d2" }} />
            </IconButton>
          </Link>
          <IconButton
            aria-label="delete"
            onClick={(e) => supprimeFormationById(e, value.row._id)}
          >
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const columnsQuiz = [
    {
      field: "_id",
      headerName: "ID quiz",
      width: 210,
    },
    {
      field: "Titre",
      headerName: "Titre quiz",
      width: 350,
      renderCell: (params) => <label>{params.row.titre} </label>,
    },
    {
      field: "Actions",
      width: 100,
      renderCell: (value) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <Link to={`/professeur/quiz/update`}>
            <IconButton aria-label="edit">
              <EditIcon sx={{ color: "#1976d2" }} />
            </IconButton>
          </Link>
          <IconButton
            aria-label="delete"
            onClick={(e) => supprimeQuizById(e, value.row._id)}
          >
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  function DataGridTitreFormation() {
    return (
      <Box>
        <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color={"primary.headLine"}>
            Formation
          </Typography>
        </Box>
        <Divider color="white" variant="middle" sx={{ marginTop: 1 }} />
      </Box>
    );
  }

  function DataGridTitreQuiz() {
    return (
      <Box>
        <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color={"primary.headLine"}>
            Quiz
          </Typography>
        </Box>
        <Divider color="white" variant="middle" sx={{ marginTop: 1 }} />
      </Box>
    );
  }

  return (
    <>
      <Toaster expand={true} richColors />
      <Box sx={{ display: "flex", mt: 10 }}>
        <Box sx={{ height: 403, width: "50%", mr: 2, ml: 2 }}>
          <DataGrid
            getRowId={(row) => row._id}
            sx={{
              color: "black",
              bgcolor: "primary.button_background",
              borderColor: "primary.headLine",
              [`& .${gridClasses.row}`]: {
                color: "primary.headLine",
                bgcolor: "primary.background",
                borderColor: "transparent",
              },
            }}
            components={{ Toolbar: DataGridTitreFormation }}
            rows={formations}
            columns={columnsFormation}
            pageSize={3}
            rowsPerPageOptions={[3]}
          />
        </Box>
        <Box sx={{ height: 403, width: "50%", mr: 2, ml: 2 }}>
          <DataGrid
            getRowId={(row) => row._id}
            sx={{
              color: "black",
              bgcolor: "primary.button_background",
              borderColor: "primary.headLine",
              [`& .${gridClasses.row}`]: {
                color: "primary.headLine",
                bgcolor: "primary.background",
                borderColor: "transparent",
              },
            }}
            components={{ Toolbar: DataGridTitreQuiz }}
            rows={quizs}
            columns={columnsQuiz}
            pageSize={3}
            rowsPerPageOptions={[3]}
          />
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboard;
