import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = process.env.REACT_APP_API;


export const loginUser = async (user: { email: string; password: string }) => {
  const response = await axios.post(`${baseURL}/users/loginuser`, user);
  return response.data;
};

export const registerUser = async (newUser: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${baseURL}/users/`, newUser);
  return response.data;
};

export const activateUser = async (token: { token: string | undefined }) => {
  const response = await axios.post(`${baseURL}/users/activate`, token);
  return response.data;
};

export const getRefreshToken = async () => {
  const response = await axios.get(`${baseURL}/users/refreshtoken`);
  return response.data;
};

export const getUserProfile = async (id: string) => {
  const response = await axios.get(`${baseURL}/users/getuserprofile/${id}`);
  return response.data;
};

export const updateProfile = async (
  email: String | undefined,
  name: String
) => {
  const response = await axios.put(`${baseURL}/users/updateuser/${email}`, {
    name,
  });
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${baseURL}/users/getallusers`);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(`${baseURL}/users/logout`);
  return response.data;
};

export const forgotPassword = async (email: string, password: string) => {
  const response = await axios.post(`${baseURL}/users/forgetpassword`, {
    email,
    password,
  });
  return response.data;
};

export const resetPassword = async (token: { token: string | undefined }) => {
  const response = await axios.post(
    `${baseURL}/users/resetpassword`,
    token
  );
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axios.delete(`${baseURL}/users/${id}`);
  return response.data;
};

export const banUser = async (id: number) => {
  const response = await axios.get(`${baseURL}/users/banuser/${id}`);
  return response.data;
};

export const unbanUser = async (id: number) => {
  const response = await axios.get(`${baseURL}/users/unbanuser/${id}`);
  return response.data;
};
