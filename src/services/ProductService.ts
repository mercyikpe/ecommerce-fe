import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = process.env.REACT_APP_API;

export const getAllProducts = async (page: number | undefined) => {
    const response = await axios.get(`${baseURL}/api/products/getallproducts?page=${page}`);
    return response.data;
  };

  export const getSearchedProducts = async (searchValue= '' ,searchPage:number | undefined) => {
    const response = await axios.get(`${baseURL}/api/products/search?searchValue=${searchValue}&page=${searchPage}`);
    return response.data;
  };

  export const deleteProduct = async (id : number) => {
    const response = await axios.delete(`${baseURL}/api/products/deleteproduct/${id}`);
    return response.data;
  };

  export const editProduct = async (id : number , data: FormData) => {
    const response = await axios.put(`${baseURL}/api/products/updateproduct/${id}`, data);
    return response.data;
  };

  export const createProduct = async (data: FormData) => {
    const response = await axios.post(`${baseURL}/api/products/` ,data);
    return response.data;
  };

  export const getFilteredProducts = async (checkedCategory: String, checkedPrice: Number[]) => {
    const response = await axios.post(`${baseURL}/api/products/filteredproducts`,{
      checkedCategory , checkedPrice
    });
    return response.data;
  };
