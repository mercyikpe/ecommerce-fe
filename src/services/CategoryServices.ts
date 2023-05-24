import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = process.env.REACT_APP_API;

export const getAllCategories = async () => {
    const response = await axios.get(`${baseURL}/categories/`);
    return response.data;
  };

  export const deleteCategory = async (slug : String) => {
    const response = await axios.delete(`${baseURL}/categories/${slug}`);
    return response.data;
  };

  export const createCategory = async (name : String) => {
    const response = await axios.post(`${baseURL}/categories/`,{name :name});
    return response.data;
  };

  export const editCategory = async (slug : String , name : String ) => {
    const response = await axios.put(`${baseURL}/categories/${slug}`,{name :name});
    return response.data;
  };