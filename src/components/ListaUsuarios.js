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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Toolbar,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { dataAtualFormatada } from "../utils/DataFormatada";

function ListaUsuarios() {
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dataLogStorage, setDataLogStorage] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");

  useEffect(() => {
    let getDataStorage = JSON.parse(localStorage.getItem("users"));
    if (getDataStorage !== null) {
      setRows(getDataStorage);
    } else {
      setRows([]);
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDeleteDialog = (cpf, nome) => {
    setOpenDeleteDialog(true);
    setNome(nome);
    setCpf(cpf);
  };

  const handleDeleteUser = () => {
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
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 250px)` } }}
      >
        <Toolbar />
        <TableContainer component={Paper} sx={{ margin: "0 auto" }}>
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
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
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
                      <IconButton
                        onClick={() =>
                          handleOpenDeleteDialog(row.cpf, row.nome)
                        }
                      >
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
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    { label: "Todas", value: -1 },
                  ]}
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

      {/* DIALOG DE EXCLUSÃO DO USUÁRIO */}
      <Dialog
        onClose={() => setOpenDeleteDialog(false)}
        open={openDeleteDialog}
      >
        <DialogTitle>Excluir usuário</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir este usuário?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleDeleteUser}>Excluir</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ListaUsuarios;
