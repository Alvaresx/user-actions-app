import React, { useEffect, useState } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Delete, Sms } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { dataAtualFormatada } from "../utils/DataFormatada";

function ListaUsuarios() {
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dataLogStorage, setDataLogStorage] = useState([]);

  useEffect(() => {
    let getDataStorage = JSON.parse(localStorage.getItem("users"));
    setRows(getDataStorage);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteUser = (cpf, nome) => {
    let getDataStorage = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < getDataStorage.length; i++) {
      if (getDataStorage[i].cpf === cpf) {
        getDataStorage.splice(i, 1);
      }
    }
    if (localStorage.getItem("logs") === null) {
      dataLogStorage.push({
        acao: `Usuário ${nome} excluído.`,
        data: dataAtualFormatada(),
      });
      let dataLogStringfy = JSON.stringify(dataLogStorage);
      localStorage.setItem("logs", dataLogStringfy);
    } else {
      let getDataLogStorage = JSON.parse(localStorage.getItem("logs"));
      getDataLogStorage.push({
        acao: `Usuário ${nome} excluído.`,
        data: dataAtualFormatada(),
      });
      let dataLogStringfy = JSON.stringify(getDataLogStorage);
      localStorage.setItem("logs", dataLogStringfy);
    }
    setRows(getDataStorage);
    let dataStringfy = JSON.stringify(getDataStorage);
    localStorage.setItem("users", dataStringfy);
    enqueueSnackbar("Usuário excluído com sucesso!", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "top" },
    });
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
      <TableContainer component={Paper} sx={{ maxWidth: "70%" }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">CPF</TableCell>
              <TableCell align="center">Telefone</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow
                key={row.nome}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.nome}</TableCell>
                <TableCell align="center">{row.cpf}</TableCell>
                <TableCell align="center">{row.telefone}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Excluir" placement="left">
                    <IconButton onClick={() => handleDeleteUser(row.cpf, row.nome)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                  {/* <Tooltip title="Enviar SMS" placement="right">
                    <Link to="/envioSMS" state={{ nome: row.nome, telefone: row.telefone }}>
                      <IconButton>
                        <Sms />
                      </IconButton>
                    </Link>
                  </Tooltip> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "Todas", value: -1 }]}
                colSpan={4}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage="Linhas por página:"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} de ${count}`
                }
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ListaUsuarios;
