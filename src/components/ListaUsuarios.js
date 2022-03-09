import React from "react";
import { Box } from "@mui/material";

function ListaUsuarios() {
  return (
    <Box
      sx={{
        backgroundColor: "#f8fafc",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ backgroundColor: "white" }}>Lista de usuários</div>
    </Box>
  );
}

export default ListaUsuarios;
