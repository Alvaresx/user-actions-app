import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Paper, Grid, TextField, Button, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

function EnvioSMS() {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [mensagem, setMensagem] = useState("");

  const handleEnviarSMS = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token_auth", "token para autenticação");

    var raw = JSON.stringify({
      celular: location.state.telefone,
      msg: mensagem,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api.nvoip.com.br/v1/sms", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        enqueueSnackbar("SMS enviado com sucesso!", {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
        setMensagem("");
      })
      .catch((error) => {
        enqueueSnackbar("Erro ao enviar SMS. Tente novamente!", {
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
      });
  };

  const handleChangeMensagem = (e) => {
    setMensagem(e);
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
            <Typography variant="h6">Enviar SMS</Typography>
            <Typography variant="body2">
              Digite no campo abaixo a mensagem que deseja enviar.
            </Typography>
            <Typography variant="body2">
              Mensagem sendo enviada para o usuário:{" "}
              <b>{location.state.nome}</b>
            </Typography>
          </Grid>

          <Grid item lg={12} md={12}>
            <TextField
              label="Mensagem"
              variant="outlined"
              value={mensagem}
              onChange={(e) => handleChangeMensagem(e.target.value)}
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
              onClick={handleEnviarSMS}
              sx={{ margin: "0 12px" }}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default EnvioSMS;
