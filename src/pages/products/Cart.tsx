import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { deleteCartItem, removeAllCartItems } from "../../features/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useAppSelector((state: any) => state);
  const { cartItems } = cart;

  const handleDeleteFromCart = (id: string) => {
    dispatch(deleteCartItem(id));
  };
  const emptyCart = () => {
    dispatch(removeAllCartItems());
  };
  const totalPrice = () => {
    let totalPrice = 0;
    cartItems &&
      cartItems.map(
        (cartItem: { price: number }) => (totalPrice += cartItem.price)
      );
    return totalPrice;
  };

  const baseURL = process.env.REACT_APP_API;

  return (
    <>
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

      {cartItems.length === 0 ? (
        <>
          <h3 className="text-lg text-center mt-10">Your cart is empty.</h3>

          <div className="flex justify-center mt-10">
            <Link
              to="/shop"
              className="w-auto bg-violet-900 px-5 py-2 text-white"
            >
              Back to Shop
            </Link>
          </div>
        </>
      ) : (
        <section className="container">
          <div className="container mx-auto min-h-screen max-w-[1200px] border-b py-5 lg:flex lg:flex-row lg:py-10">
            <article className="w-2/3 max-w-[1200px] px-5 pb-10">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                          <tr>
                            <th scope="col" className="px-6 py-4">
                              ITEM
                            </th>
                            <th scope="col" className="px-6 py-4">
                              NAME
                            </th>
                            <th scope="col" className="px-6 py-4">
                              PRICE
                            </th>
                            <th scope="col" className="px-6 py-4"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem: any, index: number) => (
                            <tr
                              key={index}
                              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                <img
                                  className="w-[100px]"
                                  src={`${baseURL}/${cartItem.image}`}
                                  alt="bedroom"
                                />
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 capitalize text-lg">
                                {cartItem.name}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-lg">
                                {cartItem.price.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })}
                              </td>
                              <td
                                className="whitespace-nowrap px-6 py-4"
                                onClick={() =>
                                  handleDeleteFromCart(cartItem._id)
                                }
                              >
                                <FontAwesomeIcon icon={faTrashAlt} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => emptyCart()}
                className="w-auto bg-yellow-500 px-5 py-2 text-black mt-8 "
              >
                Empty Cart
              </button>
            </article>

            <div className="mx-auto w-1/3 px-4">
              <div className="">
                <div className="border py-5 px-4 shadow-md">
                  <p className="font-bold">ORDER SUMMARY</p>

                  <div className="flex justify-between border-b py-5">
                    <p>Shipping</p>
                    <p>Free</p>
                  </div>

                  <div className="flex justify-between py-5">
                    <p>Total</p>
                    <p>
                      {totalPrice().toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/checkout");
                    }}
                    className="w-full bg-violet-900 px-5 py-2 text-white"
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
