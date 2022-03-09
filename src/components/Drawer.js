import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Grid,
  Typography,
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
            backgroundColor: "#fff",
          },
        }}
        open={true}
      >
        <Grid
          container
          sx={{
            height: "50px",
            backgroundColor: "#1976d2",
            alignItems: "center",
          }}
        >
          <Grid item lg={12}>
            <Typography
              sx={{
                color: "#ddd",
                fontWeight: "100",
                marginLeft: "20px",
                fontSize: "large",
              }}
            >
              Usuários
            </Typography>
          </Grid>
        </Grid>
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
