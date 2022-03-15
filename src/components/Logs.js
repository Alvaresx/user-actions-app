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
  Toolbar,
} from "@mui/material";

function Logs() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    let getDataLogStorage = JSON.parse(localStorage.getItem("logs"));
    if (getDataLogStorage !== null) {
      setRows(getDataLogStorage);
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

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 250px)` } }}
    >
      <Toolbar />
      <TableContainer component={Paper} sx={{ margin: "0 auto" }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Ação</TableCell>
              <TableCell align="center">Data/Hora</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow
                key={row.data}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.acao}</TableCell>
                <TableCell align="center">{row.data}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "Todas", value: -1 }]}
                colSpan={2}
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

export default Logs;
