import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CadastroUsuario from "./components/CadastroUsuario";
import ListaUsuarios from "./components/ListaUsuarios";
import EnvioSMS from "./components/EnvioSMS";
import Logs from "./components/Logs";

const MyRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route element={<CadastroUsuario />} path="/"></Route>
                <Route element={<ListaUsuarios />} path="/listaUsuarios"></Route>
                <Route element={<EnvioSMS />} path="/envioSMS"></Route>
                <Route element={<Logs />} path="/logs"></Route>
            </Routes>
        </Router>
    )
}

export default MyRoutes;