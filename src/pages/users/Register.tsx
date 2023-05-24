import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../../services/UserServices";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await registerUser(value);
      navigate("/activate-info");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.error.message);
      } else {
        toast("An error occurred");
      }
    }
  };

  return (
    <>
      <div className="container py-16 text-base">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">
            Create account
          </h2>
          <p className="text-gray-600 mb-6 text-sm">Welcome !!!</p>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="text-gray-600 mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={value.name}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="mercy ikpe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="text-gray-600 mb-2 block">
                  Email address
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={value.email}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="ikpemercy@gmail.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="text-gray-600 mb-2 block">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={value.password}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="*******"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="block w-full py-2 text-center text-white bg-violet-900 border border-violet-900 rounded hover:bg-transparent hover:text-violet-900 transition uppercase font-roboto font-medium"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-900">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
