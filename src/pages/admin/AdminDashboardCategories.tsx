import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
} from "../../services/CategoryServices";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
} from "@mui/material";
import axios from "axios";
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminDashboardCategories = () => {
  const [openState, setOpenState] = useState<any>({});
  const [slug, setSlug] = useState<String>("");
  const [categories, setCategories] = useState<any>([]);
  const [addcategory, setAddCategory] = useState<Boolean>(false);
  const [addcategoryName, setAddCategoryName] = useState<String>("");
  const [editcategoryName, setEditCategoryName] = useState<String>("");

  const handleClickOpen = (slug: any) => {
    setOpenState((prevState: any) => ({
      ...prevState,
      [slug]: true,
    }));
  };

  const handleClose = (slug: any) => {
    setOpenState((prevState: any) => ({
      ...prevState,
      [slug]: false,
    }));
  };

  const fetchAllCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.error.message);
      } else {
        toast("An error occurred");
      }
    }
  };
  useEffect(() => {
    fetchAllCategories();
  }, []);

  const handleDelete = async (slug: String) => {
    try {
      const response = await deleteCategory(slug);
      toast(response.message);
      fetchAllCategories();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.error.message);
      } else {
        toast("An error occurred");
      }
    }
  };

  const handleEdit = async () => {
    try {
      const response = await editCategory(slug, editcategoryName);
      toast(response.message);
      fetchAllCategories();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.error.message);
      } else {
        toast("An error occurred");
      }
    }
  };

  const handleCategoryNameEdit = async (event: any, slug: any) => {
    setEditCategoryName(event.target.value);
    setSlug(slug);
  };

  const handleCategoryName = async (event: {
    target: { value: React.SetStateAction<String> };
  }) => {
    setAddCategoryName(event.target.value);
  };

  const handleCreate = async (event: { preventDefault: () => void }) => {
    try {
      event.preventDefault();
      const response = await createCategory(addcategoryName);
      fetchAllCategories();
      setAddCategoryName("");
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
            onClick={() => setAddCategory((prevState) => !prevState)}
          >
            Create New Category
          </button>
          {addcategory && (
            <form onSubmit={handleCreate}>
              <FormGroup>
                <FormControl>
                  <Input
                    id="my-input"
                    sx={{ width: "250px" }}
                    aria-describedby="my-helper-text"
                    onChange={handleCategoryName}
                    value={addcategoryName}
                  />
                  <FormHelperText id="my-helper-text">
                    Enter new Category
                  </FormHelperText>
                  <div style={{ textAlign: "left" }}>
                    <Button type="submit">Submit</Button>
                  </div>
                </FormControl>
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
              {categories.map((category: any, index: number) => (
                <tr
                  key={category._id}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100"
                >
                  <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {category.name}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    {category._id}
                  </td>

                  <td
                    className="whitespace-nowrap px-6 py-4"
                    onClick={() => handleDelete(category.slug)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </td>

                  <td
                    className="whitespace-nowrap px-6 py-4"
                    onClick={() => handleClickOpen(category.slug)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </td>

                  <span>
                    <Dialog
                      open={openState[category.slug]}
                      onClose={() => handleClose(category.slug)}
                    >
                      <DialogContent>
                        <DialogContentText>
                          Please enter the new category name:
                        </DialogContentText>
                        <Input
                          autoFocus
                          margin="dense"
                          id="name"
                          type="text"
                          fullWidth
                          onChange={(event) =>
                            handleCategoryNameEdit(event, category.slug)
                          }
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleEdit}>Update</Button>
                        <Button onClick={() => handleClose(category.slug)}>
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

export default AdminDashboardCategories;
