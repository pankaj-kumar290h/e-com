import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import AdminRoutes from "./auth/helper/AdminRoutes";
import AddCategory from "./admin/AddCategory";
/////
import Home from "./core/Home";
function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/user/dashboard" element={<UserDashBoard />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/admin/dashboard" element={<AdminDashBoard />} />
          <Route path="/admin/create/category" element={<AddCategory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
