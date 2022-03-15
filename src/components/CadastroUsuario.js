import React, { useState } from "react";
import { Box, Paper, Grid, Button, Typography, Toolbar } from "@mui/material";
import { useSnackbar } from "notistack";
import { dataAtualFormatada } from "../utils/DataFormatada";
import { maskCPF, maskPhone } from "../utils/Masks";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { cpf } from "cpf-cnpj-validator";
import TextFieldWrapper from "./FormComponents/TextField";

function CadastroUsuario() {
  const { enqueueSnackbar } = useSnackbar();
  const [dataStorage, setDataStorage] = useState([]);
  const [dataLogStorage, setDataLogStorage] = useState([]);

  const validationSchema = Yup.object({
    nome: Yup.string().required("Nome é obrigatório"),
    telefone: Yup.string()
      .required("Telefone é obrigatório")
      .min(14, "Insira um telefone válido!")
      .max(14, "Insira um telefone válido!"),
    cpf: Yup.string()
      .required("CPF é obrigatório")
      .test("validCpf", "Insira um CPF válido", (value) => cpf.isValid(value)),
  });

  const values = {
    nome: "",
    telefone: "",
    cpf: "",
  };

  const handleCadastrar = (values) => {
    if (localStorage.getItem("users") === null) {
      dataStorage.push({
        nome: values.nome,
        cpf: values.cpf,
        telefone: values.telefone,
      });
      let dataStringfy = JSON.stringify(dataStorage);
      localStorage.setItem("users", dataStringfy);
    } else {
      let getDataStorage = JSON.parse(localStorage.getItem("users"));
      getDataStorage.push({
        nome: values.nome,
        cpf: values.cpf,
        telefone: values.telefone,
      });
      let dataStringfy = JSON.stringify(getDataStorage);
      localStorage.setItem("users", dataStringfy);
    }
    if (localStorage.getItem("logs") === null) {
      dataLogStorage.push({
        acao: `Usuário ${values.nome} cadastrado.`,
        data: dataAtualFormatada(),
      });
      let dataLogStringfy = JSON.stringify(dataLogStorage);
      localStorage.setItem("logs", dataLogStringfy);
    } else {
      let getDataLogStorage = JSON.parse(localStorage.getItem("logs"));
      getDataLogStorage.push({
        acao: `Usuário ${values.nome} cadastrado.`,
        data: dataAtualFormatada(),
      });
      let dataLogStringfy = JSON.stringify(getDataLogStorage);
      localStorage.setItem("logs", dataLogStringfy);
    }
    enqueueSnackbar("Cadastro realizado com sucesso!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "top" },
    });
    setDataStorage([]);
    setDataLogStorage([]);
  };

  return (
    <>
      <Formik
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleCadastrar(values);
          resetForm();
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { md: `calc(100% - 250px)` },
                margin: "0 auto",
              }}
            >
              <Toolbar />
              <Paper
                elevation={3}
                sx={{ padding: "24px", margin: "0 auto" }}
              >
                <Grid container spacing={3}>
                  <Grid item lg={12}>
                    <Typography variant="h6">Cadastro de Usuário</Typography>
                    <Typography variant="body2">
                      Preencha os campos abaixo para cadastrar um usuário.
                    </Typography>
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextFieldWrapper name="nome" label="Nome" />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextFieldWrapper
                      name="cpf"
                      label="CPF"
                      onKeyUp={(e) =>
                        setFieldValue("cpf", maskCPF(e.target.value))
                      }
                      inputProps={{ maxLength: 14 }}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextFieldWrapper
                      name="telefone"
                      label="Telefone"
                      onKeyUp={(e) =>
                        setFieldValue("telefone", maskPhone(e.target.value))
                      }
                      inputProps={{ maxLength: 14 }}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "24px",
                    }}
                  >
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ margin: "0 12px" }}
                    >
                      Cadastrar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CadastroUsuario;
