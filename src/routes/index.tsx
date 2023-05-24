import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/users/Login";
import Register from "../pages/users/Register";
import Activate from "../pages/users/Activate";

// import Users from "../pages/admin/Users";
import Navbar from "../components/layout/Navbar";
import ProductDescription from "../pages/products/Details";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminRoute from "./AdminRoute";
import AdminDashboardUsers from "../pages/admin/AdminDashboardUsers";
import AdminDashboardCategories from "../pages/admin/AdminDashboardCategories";
import Cart from "../pages/products/Cart";
import AdminProfile from "../pages/admin/AdminProfile";
import ResetPassword from "../pages/users/ResetPassword";
import UserProfile from "../pages/users/UserProfile";
import Footer from "../components/layout/Footer";
import ActivateInfo from "../pages/users/ActivateInfo";
import Shop from "../pages/Shop";
import Notfound from "../pages/NotFound";

const Index = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="min-h-screen flex flex-col">
        <header>
          <Navbar />
        </header>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/api/users/activate/:token" element={<Activate />} />
            <Route path="activate-info" element={<ActivateInfo />} />

            <Route path="/shop" element={<Shop />} />
            <Route
              path="/api/users/reset-password/:token"
              element={<ResetPassword />}
            />

            {/* <Route path="/listallusers" element={<Users />} /> */}
            <Route
              path="/productdescription/:id"
              element={<ProductDescription />}
            />
            <Route path="/cart" element={<Cart />} />

            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route path="user/profile" element={<UserProfile />} />
            </Route>

            <Route path="/dashboard" element={<AdminRoute />}>
              <Route path="admin/products" element={<AdminDashboard />} />
              <Route path="admin/users" element={<AdminDashboardUsers />} />
              <Route
                path="admin/categories"
                element={<AdminDashboardCategories />}
              />
              <Route path="admin/profile" element={<AdminProfile />} />
            </Route>

            {/* wildcat */}
            <Route path="/*" element={<Notfound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Index;
