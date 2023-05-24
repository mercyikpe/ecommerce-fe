import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = process.env.REACT_APP_API;


export const loginUser = async (user: { email: string; password: string }) => {
  const response = await axios.post(`${baseURL}/api/users/loginuser`, user);
  return response.data;
};

export const registerUser = async (newUser: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${baseURL}/api/users/`, newUser);
  return response.data;
};

export const activateUser = async (token: { token: string | undefined }) => {
  const response = await axios.post(`${baseURL}/api/users/activate`, token);
  return response.data;
};

export const getRefreshToken = async () => {
  const response = await axios.get(`${baseURL}/api/users/refreshtoken`);
  return response.data;
};

export const getUserProfile = async (id: string) => {
  const response = await axios.get(`${baseURL}/api/users/getuserprofile/${id}`);
  return response.data;
};

export const updateProfile = async (
  email: String | undefined,
  name: String
) => {
  const response = await axios.put(`${baseURL}/api/users/updateuser/${email}`, {
    name,
  });
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${baseURL}/api/users/getallusers`);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(`${baseURL}/api/users/logout`);
  return response.data;
};

export const forgotPassword = async (email: string, password: string) => {
  const response = await axios.post(`${baseURL}/api/users/forgetpassword`, {
    email,
    password,
  });
  return response.data;
};

export const resetPassword = async (token: { token: string | undefined }) => {
  const response = await axios.post(
    `${baseURL}/api/users/resetpassword`,
    token
  );
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axios.delete(`${baseURL}/api/users/${id}`);
  return response.data;
};

export const banUser = async (id: number) => {
  const response = await axios.get(`${baseURL}/api/users/banuser/${id}`);
  return response.data;
};

export const unbanUser = async (id: number) => {
  const response = await axios.get(`${baseURL}/api/users/unbanuser/${id}`);
  return response.data;
};
