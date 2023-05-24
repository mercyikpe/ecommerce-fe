import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { getUserProfile, updateProfile } from "../../services/UserServices";
import { toast } from "react-toastify";
import axios from "axios";

const UserProfile = () => {
  const { user } = useAppSelector((state) => state);
  // const { isLoggedIn } = user.data;
  const { userData } = user.data;
  const [open, setOpen] = useState(false);
  const [openName, setOpenName] = useState(false);
  // const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(`${userData.name}`);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickName = () => {
    setOpenName(true);
  };
  const handleCloseName = () => {
    setOpenName(false);
  };

  const handleNameChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewName(event.target.value);
  };

  const handleNameInputBlur = () => {
    setIsEditingName(true);
  };

  const handleEditName = async () => {
    try {
      const response = await updateProfile(userData.email, newName);
      toast(response.message);
      setOpenName(false);
      setName(newName);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.error.message);
      } else {
        toast("An error occurred");
      }
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile(userData.id);
        setName(response.data.user.name);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast(error.response?.data?.error.message);
        } else {
          toast("An error occurred");
        }
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <div className="p-4 sm:p-10 text-center overflow-y-auto">
      <h3 className="mb-2 text-2xl font-bold text-gray-800">{name}</h3>

      <p className="text-gray-500">{userData.email}</p>

      <div className="mt-6 flex justify-center gap-x-4">
        <button
          onClick={() => {
            handleClickName();
          }}
          type="button"
          className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
        >
          Update
        </button>
      </div>

      <Dialog open={openName} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>Please enter new name:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => handleNameChange(event)}
            onBlur={handleNameInputBlur}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditName}>Update</Button>
          <Button onClick={handleCloseName}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserProfile;
