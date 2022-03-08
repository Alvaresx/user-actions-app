import React from "react";
import MyRoutes from "./Routes";
import Drawer from "./components/Drawer";
import "./App.css";

function App() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Drawer />
        <MyRoutes />
      </div>
    </>
  );
}

export default App;
