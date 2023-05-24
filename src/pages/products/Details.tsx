import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { setCart } from "../../features/cartSlice";
import { faArrowLeft, faCartShopping } from "@fortawesome/free-solid-svg-icons";

const ProductDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = location;

  const handleCart = () => {
    dispatch(setCart(state));
  };

  const baseURL = process.env.REACT_APP_API;

  return (
    <div>
      <Helmet>
        <title>Product Details</title>
      </Helmet>

      <nav className="mx-auto mt-4 max-w-[1200px] px-5">
        <ul className="flex items-center">
          <li className="cursor-pointer">
            <Link to="/shop">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-500">&gt;</span>
          </li>

          <li className="text-gray-500">Product Details</li>
        </ul>
      </nav>

      <section className="container mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
        <div className="container mx-auto px-4">
          <img
            className="w-full"
            src={`${baseURL}/${state.image}`}
            alt={state.name}
          />
        </div>

        <div className="mx-auto px-5 lg:px-5">
          <h2 className="pt-3 text-2xl font-bold lg:pt-0 capitalize">
            {state.name}
          </h2>

          <p className="mt-5 font-bold">
            Availability:{" "}
            <span className="text-green-600">
              ({state.countInStock}) In Stock
            </span>
          </p>
          <p className="font-bold">
            Brand: <span className="font-normal">{state.brand}</span>
          </p>
          <p className="font-bold">
            Category: <span className="font-normal">{state.category}</span>
          </p>

          <p className="mt-4 text-4xl font-bold text-violet-900">
            {state.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>

          <p className="pt-5 text-sm leading-5 text-gray-500">
            {state.description}
          </p>

          <div className="mt-7 flex flex-row items-center gap-6">
            <button
              onClick={() => {
                handleCart();
              }}
              className="flex h-12 w-1/3 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800"
            >
              <FontAwesomeIcon icon={faCartShopping} />

              <span className="pl-2">Add to cart</span>
            </button>
            <button
              onClick={() => {
                navigate("/shop");
              }}
              className="flex h-12 w-1/3 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300"
            >
              <FontAwesomeIcon icon={faArrowLeft} />

              <span className="pl-2">Continue shopping</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDescription;
