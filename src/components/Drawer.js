import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  PersonAddAlt1,
  FormatListBulleted,
  FindInPage,
} from "@mui/icons-material";

function Drawer() {
  const itemsList = [
    {
      text: "Cadastro de usuário",
      icon: <PersonAddAlt1 />,
      path: "/",
    },
    {
      text: "Lista de usuários",
      icon: <FormatListBulleted />,
      path: "/listaUsuarios",
    },
    {
      text: "Logs",
      icon: <FindInPage />,
      path: "/logs",
    },
  ];
  return (
    <>
      <MUIDrawer
        variant="persistent"
        anchor="left"
        sx={{
          width: "250px",
          "& .MuiDrawer-paper": {
            width: "250px",
            boxSizing: "border-box",
          },
        }}
        open={true}
      >
        <List>
          {itemsList.map((item) => (
            <Link
              to={item.path}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <ListItem button key={item.text} onClick={item.onClick}>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </MUIDrawer>
    </>
  );
}

export default Drawer;
