import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../features/userSlice";
import { logoutUser } from "../../services/UserServices";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logo from "../../images/logo.svg";

import sofa from "../../images/icons/sofa.svg";
import terrace from "../../images/icons/terrace.svg";
import bed from "../../images/icons/bed.svg";
import office from "../../images/icons/office.svg";
import outdoorCafe from "../../images/icons/outdoor-cafe.svg";
import bed2 from "../../images/icons/bed-2.svg";
import {
  faBagShopping,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openAdminDashboard, setOpenAdminDashboard] = useState(false);
  const profileAnchorRef = useRef<HTMLButtonElement>(null);
  const adminDashboardAnchorRef = useRef<HTMLButtonElement>(null);

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const handleCloseAdminDashboard = () => {
    setOpenAdminDashboard(false);
  };

  const prevOpenProfile = useRef(openProfile);
  const prevOpenAdminDashboard = useRef(openAdminDashboard);

  React.useEffect(() => {
    if (prevOpenProfile.current === true && openProfile === false) {
      profileAnchorRef.current!.focus();
    }
    prevOpenProfile.current = openProfile;
  }, [openProfile]);

  React.useEffect(() => {
    if (
      prevOpenAdminDashboard.current === true &&
      openAdminDashboard === false
    ) {
      adminDashboardAnchorRef.current!.focus();
    }
    prevOpenAdminDashboard.current = openAdminDashboard;
  }, [openAdminDashboard]);

  const { user, cart } = useAppSelector((state) => state);
  const { isLoggedIn } = user.data;
  const { userData } = user.data;
  const { cartItems } = cart;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const response = await logoutUser();
      dispatch(logout());
      toast(response.message);
      navigate("/shop");
    } catch (error: any) {
      toast(error);
    }
  };

  const handleProfile = () => {
    if (userData.isAdmin) {
      navigate("/dashboard/admin/profile");
    } else {
      navigate("/dashboard/user/profile");
    }
    handleCloseProfile();
  };

  const handleProductsAdmin = () => {
    navigate("/dashboard/admin/products");
    handleCloseAdminDashboard();
  };

  const handleCategoriesAdmin = () => {
    navigate("/dashboard/admin/categories");
    handleCloseAdminDashboard();
  };

  const handleUsersAdmin = () => {
    navigate("/dashboard/admin/users");
    handleCloseAdminDashboard();
  };

  return (
    <>
      <header className="py-4 shadow-sm bg-white">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-32" />
          </Link>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <button
                  className="text-center text-gray-700 hover:text-amber-500 transition relative"
                  onClick={() => navigate("/Cart")}
                >
                  <span className="text-2xl">
                    <FontAwesomeIcon icon={faBagShopping} />
                  </span>
                  <div className="text-xs leading-3">Cart</div>
                  {cartItems && cartItems.length >= 1 && (
                    <span className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-amber-400 text-white text-xs">
                      {cartItems.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={handleLogOut}
                  className="text-center text-gray-700 hover:text-amber-500 transition relative"
                >
                  <div className="text-2xl">
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </div>
                  <div className="text-xs leading-3">Logout</div>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-center text-gray-700 hover:text-amber-500 transition relative"
              >
                <div className="text-2xl">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="text-xs leading-3">Account</div>
              </Link>
            )}
          </div>
        </div>
      </header>

      <nav className="bg-violet-900 text-base">
        <div className="container flex">
          <div className="px-8 py-4 bg-amber-400 flex items-center cursor-pointer relative group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
            >
              <path d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z"></path>
            </svg>
            <span className="capitalize ml-2">All Categories</span>

            {/*dropdown*/}
            <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
              <Link
                to="#/"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img src={sofa} alt="sofa" className="w-5 h-5 object-contain" />
                <span className="ml-6 text-gray-600 text-sm">Sofa</span>
              </Link>
              <Link
                to="#/"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src={terrace}
                  alt="terrace"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Terrace</span>
              </Link>
              <Link
                to="#/"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img src={bed} alt="bed" className="w-5 h-5 object-contain" />
                <span className="ml-6 text-gray-600 text-sm">Bed</span>
              </Link>
              <Link
                to="#/"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src={office}
                  alt="office"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">office</span>
              </Link>
              <Link
                to="#/"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src={outdoorCafe}
                  alt="outdoor"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Outdoor</span>
              </Link>
              <Link
                to="#/"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src={bed2}
                  alt="Mattress"
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Mattress</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between flex-grow pl-12">
            <div className="flex items-center space-x-6 capitalize">
              <NavLink
                to="/"
                className="text-gray-200 hover:text-yellow-400 hover:underline transition"
              >
                Home
              </NavLink>
              <NavLink
                to="/shop"
                className="text-gray-200 hover:text-yellow-400 hover:underline transition"
              >
                Shop
              </NavLink>
              <NavLink
                to="#"
                className="text-gray-200 hover:text-yellow-400 hover:underline transition"
              >
                About us
              </NavLink>
              <NavLink
                to="#"
                className="text-gray-200 hover:text-yellow-400 hover:underline transition"
              >
                Contact us
              </NavLink>
            </div>

            <div className="ml-auto flex gap-4 px-5">
              {isLoggedIn ? (
                <div className="flex items-center space-x-6 capitalize">
                  {userData.isAdmin && (
                    <div className="flex items-center space-x-6 capitalize">
                      <button
                        onClick={handleUsersAdmin}
                        className="text-gray-200 hover:text-yellow-400 hover:underline transition"
                      >
                        Users
                      </button>
                      <button
                        onClick={handleProductsAdmin}
                        className="text-gray-200 hover:text-yellow-400 hover:underline transition"
                      >
                        Products
                      </button>
                      <button
                        onClick={handleCategoriesAdmin}
                        className="text-gray-200 hover:text-yellow-400 hover:underline transition"
                      >
                        Categories
                      </button>
                    </div>
                  )}

                  <button onClick={handleProfile}
                    className="text-center text-white hover:text-amber-500 transition relative"
                  >
                    <div className="text-2xl">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="text-xs leading-3">Account</div>
                  </button>
                </div>
              ) : (
                <>
                  <NavLink
                    className="font-light text-white duration-100 hover:text-yellow-400 hover:underline"
                    to="/login"
                  >
                    Login
                  </NavLink>

                  <span className="text-white">&#124;</span>

                  <NavLink
                    className="font-light text-white duration-100 hover:text-yellow-400 hover:underline"
                    to="register"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
