import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

import AllRoutes from "./AllRoutes";
import Menu from "./core/Menu";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AllRoutes />
  </React.StrictMode>
);
