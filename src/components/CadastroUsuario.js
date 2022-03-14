import React, { useState } from "react";
import { Box, Paper, Grid, TextField, Button, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { dataAtualFormatada } from "../utils/DataFormatada";
import { maskCPF, maskPhone } from "../utils/Masks";

function CadastroUsuario() {
  const { enqueueSnackbar } = useSnackbar();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataStorage, setDataStorage] = useState([]);
  const [dataLogStorage, setDataLogStorage] = useState([]);

  const handleChangeNome = (e) => {
    setNome(e);
  };

  const handleChangeCpf = (e) => {
    setCpf(maskCPF(e));
  };

  const handleChangeTelefone = (e) => {
    setTelefone(maskPhone(e));
  };

  const handleCadastrar = () => {
    if (localStorage.getItem("users") === null) {
      dataStorage.push({ nome: nome, cpf: cpf, telefone: telefone });
      let dataStringfy = JSON.stringify(dataStorage);
      localStorage.setItem("users", dataStringfy);
    } else {
      let getDataStorage = JSON.parse(localStorage.getItem("users"));
      getDataStorage.push({ nome: nome, cpf: cpf, telefone: telefone });
      let dataStringfy = JSON.stringify(getDataStorage);
      localStorage.setItem("users", dataStringfy);
    }
    if (localStorage.getItem("logs") === null) {
      dataLogStorage.push({
        acao: `Usuário ${nome} cadastrado.`,
        data: dataAtualFormatada(),
      });
      let dataLogStringfy = JSON.stringify(dataLogStorage);
      localStorage.setItem("logs", dataLogStringfy);
    } else {
      let getDataLogStorage = JSON.parse(localStorage.getItem("logs"));
      getDataLogStorage.push({
        acao: `Usuário ${nome} cadastrado.`,
        data: dataAtualFormatada(),
      });
      let dataLogStringfy = JSON.stringify(getDataLogStorage);
      localStorage.setItem("logs", dataLogStringfy);
    }
    enqueueSnackbar("Cadastro realizado com sucesso!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "top" },
    });
    setNome("");
    setCpf("");
    setTelefone("");
    setDataStorage([]);
    setDataLogStorage([]);
  };

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

          <Grid item lg={12} md={12}>
            <TextField
              label="Nome"
              variant="outlined"
              value={nome}
              onChange={(e) => handleChangeNome(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item lg={6} md={6}>
            <TextField
              label="CPF"
              variant="outlined"
              value={cpf}
              onChange={(e) => handleChangeCpf(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item lg={6} md={6}>
            <TextField
              label="Telefone"
              variant="outlined"
              value={telefone}
              onChange={(e) => handleChangeTelefone(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            lg={12}
            md={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "24px",
            }}
          >
            <Button
              variant="contained"
              onClick={handleCadastrar}
              sx={{ margin: "0 12px" }}
            >
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default CadastroUsuario;
