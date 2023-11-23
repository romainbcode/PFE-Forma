import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography, IconButton } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Toaster, toast } from "sonner";

export const AdminDashboard = () => {
  const [formations, setFormations] = useState([]);

  const getFormations = async () => {
    try {
      const { data } = await axios.get("/api-node/formations/recente");
      setFormations(data.formations);
    } catch (error) {
      console.log(error);
    }
  };

  const supprimeFormationById = async (e, id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      console.log(id);
      try {
        console.log(id);
        await axios.delete(`/api-node/admin/supprime/formation/${id}`);
        console.log(id);
        toast.success("Suppresion de la formation avec succès !");
        getFormations();
      } catch (error) {
        toast.error("Echec de la suppression de la formation !");
      }
    }
  };

  useEffect(() => {
    getFormations();
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "Post ID",
      width: 150,
      editable: true,
    },
    {
      field: "Titre",
      headerName: "Titre",
      width: 150,
      renderCell: (params) => <label>{params.row.titre}</label>,
    },
    {
      field: "Description",
      headerName: "Description",
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
          <Link to={`/admin/quiz/edit/${value.row._id}`}>
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

  return (
    <>
      <Toaster expand={true} richColors />
      <Paper sx={{ bgcolor: "white", display: "flex", mt: 10 }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            sx={{
              "& .MuiTablePagination-displayedRows": {
                color: "black",
              },
              color: "black",
              bgcolor: "#FE3104",
              [`& .${gridClasses.row}`]: {
                bgcolor: "white",
              },
            }}
            rows={formations}
            columns={columns}
            pageSize={3}
            rowsPerPageOptions={[3]}
          />
        </Box>
      </Paper>
    </>
  );
};

export default AdminDashboard;
