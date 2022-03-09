import React from "react";
import { Box, Paper, Grid, TextField, Button, Typography } from "@mui/material";

function CadastroUsuario() {
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
      <Paper elevation={3} sx={{ padding: "24px", maxWidth: "70%" }}>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <Typography variant="h6">Cadastro de Usuário</Typography>
            <Typography variant="body2">
              Preencha os campos abaixo para cadastrar um usuário.
            </Typography>
          </Grid>

          <Grid item lg={12}>
            <TextField label="Nome" variant="outlined" fullWidth required />
          </Grid>
          <Grid item lg={6}>
            <TextField label="CPF" variant="outlined" fullWidth required />
          </Grid>
          <Grid item lg={6}>
            <TextField label="Telefone" variant="outlined" fullWidth required />
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            lg={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "24px",
            }}
          >
            <Button variant="contained">Cadastrar</Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default CadastroUsuario;
