import React, { ChangeEventHandler, useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
} from "../../services/ProductService";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
  InputBase,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { getAllCategories } from "../../services/CategoryServices";
import axios from "axios";
import { ProductT } from "../../types/ProductTypes";
import { CategoryT } from "../../types/CategoryTypes";
import { faTrashAlt, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminDashboard = () => {
  const [products, setProducts] = useState<ProductT[]>([]);
  const [addProduct, setAddProduct] = useState<Boolean>(false);
  const [categories, setCategories] = useState<CategoryT[]>([]);
  const [openState, setOpenState] = useState<{ [key: number]: boolean }>({});

  const [editData, setEditData] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    category: "",
    countInStock: "",
    image: "",
  });

  const handleClose = (id: number) => {
    setOpenState((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };
  const handleClickOpen = (id: number) => {
    setOpenState((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const [name, setName] = useState("");
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };
  const [brand, setBrand] = useState("");
  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setBrand(value);
  };
  const [category, setCategory] = useState("");
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setCategory(value);
  };
  const [description, setDescription] = useState("");
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setDescription(value);
  };
  const [price, setPrice] = useState("");
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPrice(value);
  };
  const [image, setImage] = useState<File | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      // const selectedImage = files[0];
      // const imageUrl = URL.createObjectURL(selectedImage);
      setImage(files[0]);
    }
  };

  const [countInStock, setCountInStock] = useState("");
  const handleCountInStockChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setCountInStock(value);
  };

  const fetchAllCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.message);
      } else {
        toast("An error occurred");
      }
    }
  };
  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllProducts = async (page?: number) => {
    try {
      const response = await getAllProducts(page);
      setProducts(response.data.products);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.message);
      } else {
        toast("An error occurred");
      }
    }
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);


  const handleDelete = async (id: number) => {
    try {
      const response = await deleteProduct(id);
      toast(response.message);
      fetchAllProducts(1);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.error.message);
      } else {
        toast("An error occurred");
      }
    }
  };

  const handleProductNameEdit = async (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    if (event.target instanceof HTMLInputElement) {
      // Handle Input change event
      const { value, files, name } = event.target;
      setEditData((prevState) => ({
        ...prevState,
        [name]: files ? files[0] : value,
      }));
    } else {
      // Handle Select change event
      const { name, value } = event.target;
      setEditData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const updatedProduct = new FormData();
      if (editData.name) updatedProduct.append("name", editData.name);
      if (editData.brand) updatedProduct.append("brand", editData.brand);
      if (editData.description)
        updatedProduct.append("description", editData.description);
      if (editData.price) updatedProduct.append("price", editData.price);
      if (editData.image) updatedProduct.append("image", editData.image);
      if (editData.category)
        updatedProduct.append("category", editData.category);
      if (editData.countInStock)
        updatedProduct.append("countInStock", editData.countInStock);
      const response = await editProduct(id, updatedProduct);
      setOpenState({ [id]: false });
      fetchAllProducts(1);
      setEditData({
        name: "",
        description: "",
        price: "",
        brand: "",
        category: "",
        countInStock: "",
        image: "",
      });
      toast(response.message);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.message);
      } else {
        toast("An error occurred");
      }
    }
  };

  const handleCreate = async (event: any) => {
    try {
      event.preventDefault();
      const newProduct = new FormData();
      newProduct.append("name", name);
      newProduct.append("brand", brand);
      newProduct.append("description", description);
      newProduct.append("price", price);
      if (image) newProduct.append("image", image);
      newProduct.append("category", category);
      newProduct.append("countInStock", countInStock);
      const response = await createProduct(newProduct);
      fetchAllProducts(1);
      setName("");
      setBrand("");
      setDescription("");
      setPrice("");
      setImage(null);
      setCategory("");
      setCountInStock("");
      toast(response.message);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.error.message);
      } else {
        toast("An error occurred");
      }
    }
  };

  return (
    <article className="w-5/6 mx-auto max-w-[1200px] px-5 pb-10">
      <div className="overflow-hidden my-10">
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded-sm"
          onClick={() => setAddProduct((prevState) => !prevState)}
        >
          Create New Product
        </button>
        {addProduct && (
          <form onSubmit={handleCreate}>
            <FormGroup>
              <FormControl>
                <Input
                  id="name"
                  aria-describedby="name1"
                  onChange={handleNameChange}
                  value={name}
                  sx={{ width: "250px" }}
                />
                <FormHelperText id="name1">Name</FormHelperText>
              </FormControl>
              <FormControl>
                <InputBase
                  type="file"
                  id="image"
                  aria-describedby="image1"
                  onChange={handleImageChange}
                />
                <FormHelperText id="image1">Image</FormHelperText>
              </FormControl>
              <FormControl>
                <Input
                  id="brand"
                  aria-describedby="brand1"
                  onChange={handleBrandChange}
                  value={brand}
                  sx={{ width: "250px" }}
                />
                <FormHelperText id="brand1">Brand</FormHelperText>
              </FormControl>
              <FormControl>
                <Select
                  labelId="select-label"
                  id="select"
                  value={category}
                  onChange={handleCategoryChange}
                  sx={{ width: "250px" }}
                >
                  {categories.map((category: any) => {
                    return (
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText id="category1">Category</FormHelperText>
              </FormControl>
              <FormControl>
                <Input
                  id="description"
                  aria-describedby="description1"
                  onChange={handleDescriptionChange}
                  value={description}
                  sx={{ width: "250px" }}
                  inputProps={{ maxLength: 200 }}
                />
                <FormHelperText id="description1">Description</FormHelperText>
              </FormControl>
              <FormControl>
                <Input
                  id="price"
                  aria-describedby="price1"
                  onChange={handlePriceChange}
                  value={price}
                  sx={{ width: "250px" }}
                />
                <FormHelperText id="price1">Price</FormHelperText>
              </FormControl>
              <FormControl>
                <Input
                  id="countinstock"
                  aria-describedby="countinstock1"
                  onChange={handleCountInStockChange}
                  value={countInStock}
                  sx={{ width: "250px" }}
                />
                <FormHelperText id="countinstock1">CountInStock</FormHelperText>
              </FormControl>
              <div style={{ textAlign: "left" }}>
                <Button type="submit">Submit</Button>
              </div>
            </FormGroup>
          </form>
        )}

        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">
                #
              </th>
              <th scope="col" className="px-6 py-4">
                Name
              </th>
              <th scope="col" className="px-6 py-4">
                id
              </th>
              <th scope="col" className="px-6 py-4"></th>
              <th scope="col" className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any, index: number) => (
              <tr
                key={product._id}
                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100"
              >
                <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-4">{product.name}</td>

                <td className="whitespace-nowrap px-6 py-4">{product._id}</td>

                <td
                  className="whitespace-nowrap px-6 py-4"
                  onClick={() => handleDelete(product._id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </td>

                <td
                  className="whitespace-nowrap px-6 py-4"
                  onClick={() => handleClickOpen(product._id)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </td>

                <span>
                  <Dialog
                    open={openState[product._id]}
                    onClose={() => handleClose(product._id)}
                    sx={{ "& .MuiDialog-paper": { width: "800px" } }}
                  >
                    <DialogContent sx={{ p: 6 }}>
                      <DialogContentText>
                        Please enter the new product name:
                      </DialogContentText>
                      <Box sx={{ p: 2 }}>
                        <Input
                          autoFocus
                          margin="dense"
                          id="name"
                          name="name"
                          type="text"
                          fullWidth
                          onChange={
                            handleProductNameEdit as ChangeEventHandler<
                              HTMLInputElement | HTMLTextAreaElement
                            >
                          }
                        />
                      </Box>
                      <DialogContentText>
                        Please enter the new product brand:
                      </DialogContentText>
                      <Box sx={{ p: 2 }}>
                        <Input
                          autoFocus
                          margin="dense"
                          id="brand"
                          name="brand"
                          type="text"
                          fullWidth
                          onChange={
                            handleProductNameEdit as ChangeEventHandler<
                              HTMLInputElement | HTMLTextAreaElement
                            >
                          }
                        />
                      </Box>
                      <DialogContentText>
                        Please enter the new product category:
                      </DialogContentText>
                      <Select
                        labelId="category"
                        id="select"
                        name="category"
                        value={editData.category}
                        onChange={handleProductNameEdit}
                        sx={{ width: "250px" }}
                      >
                        {categories.map((category: any) => {
                          return (
                            <MenuItem key={category._id} value={category._id}>
                              {category.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </DialogContent>
                    <DialogContentText sx={{ pl: 6 }}>
                      Please enter the new product price:
                    </DialogContentText>
                    <Box sx={{ pl: 7, pr: 9 }}>
                      <Input
                        autoFocus
                        margin="dense"
                        id="price"
                        name="price"
                        type="text"
                        fullWidth
                        onChange={
                          handleProductNameEdit as ChangeEventHandler<
                            HTMLInputElement | HTMLTextAreaElement
                          >
                        }
                      />
                    </Box>
                    <DialogContentText sx={{ pl: 6 }}>
                      Please enter the new product stock count:
                    </DialogContentText>
                    <Box sx={{ pl: 7, pr: 9 }}>
                      <Input
                        autoFocus
                        margin="dense"
                        id="countInStock"
                        name="countInStock"
                        type="text"
                        fullWidth
                        onChange={
                          handleProductNameEdit as ChangeEventHandler<
                            HTMLInputElement | HTMLTextAreaElement
                          >
                        }
                      />
                    </Box>
                    <DialogContentText sx={{ pl: 6 }}>
                      Please enter the new product description:
                    </DialogContentText>
                    <Box sx={{ pl: 7, pr: 9 }}>
                      <Input
                        autoFocus
                        margin="dense"
                        id="description"
                        name="description"
                        type="text"
                        fullWidth
                        onChange={
                          handleProductNameEdit as ChangeEventHandler<
                            HTMLInputElement | HTMLTextAreaElement
                          >
                        }
                      />
                    </Box>
                    <DialogContentText sx={{ pl: 6 }}>
                      Please upload the new product image:
                    </DialogContentText>
                    <Box sx={{ pl: 7, pr: 9 }}>
                      <Input
                        autoFocus
                        margin="dense"
                        id="image"
                        name="image"
                        type="file"
                        fullWidth
                        onChange={
                          handleProductNameEdit as ChangeEventHandler<
                            HTMLInputElement | HTMLTextAreaElement
                          >
                        }
                      />
                    </Box>
                    <DialogActions>
                      <Button onClick={() => handleEdit(product._id)}>
                        Update
                      </Button>
                      <Button onClick={() => handleClose(product._id)}>
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                </span>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default AdminDashboard;
