import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAutheticated } from "./index";

function PrivateRoutes() {
  const auth = isAutheticated();
  return auth ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoutes;
