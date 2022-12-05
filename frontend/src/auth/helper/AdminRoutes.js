import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAutheticated } from "./index";

function AdminRoutes() {
  const auth = isAutheticated();
  console.log(auth.user.role);

  return auth.user.role ? <Outlet /> : <Navigate to="/signin" />;
}

export default AdminRoutes;
