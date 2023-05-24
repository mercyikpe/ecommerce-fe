import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import Login from "../pages/users/Login";

const ProtectedRoute = () => {
 
  const [isLoggedIn, setIsLoggedIn] = useState(useAppSelector((state) => state.user.data.isLoggedIn));

  return isLoggedIn ? <Outlet /> : <Login />;
};

export default ProtectedRoute;
