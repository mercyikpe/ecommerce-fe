import React, { useState } from "react";
import { Outlet} from "react-router-dom";

import { useAppSelector } from "../redux/hooks";
import Login from '../pages/users/Login'

const AdminRoute = () => {

  const [isAdmin, setIsAdmin] = useState(useAppSelector((state) => state.user.data.userData.isAdmin));

  return isAdmin ? <Outlet /> :<Login />   ;
};

export default AdminRoute;