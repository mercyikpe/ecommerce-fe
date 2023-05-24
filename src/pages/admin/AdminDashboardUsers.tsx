import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


import {
  banUser,
  deleteUser,
  getAllUsers,
  unbanUser,
} from "../../services/UserServices";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const AdminDashboardUsers = () => {
  const [users, setUsers] = useState<any>([]);

  const fetchAllUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.error.message);
      } else {
        toast("An error occurred");
      }
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteUser(id);
      toast(response.message);
      fetchAllUsers();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.error.message);
      } else {
        toast("An error occurred");
      }
    }
  };

  const handleUnBan = async (id: number) => {
    try {
      const response = await unbanUser(id);
      toast(response.message);
      fetchAllUsers();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data?.error.message);
      } else {
        toast("An error occurred");
      }
    }
  };

  const handleBan = async (id: number) => {
    try {
      const response = await banUser(id);
      toast(response.message);
      fetchAllUsers();
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
                Email
              </th>
              <th scope="col" className="px-6 py-4">
                id
              </th>
              <th scope="col" className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, index: number) => (
              <tr
                key={user._id}
                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100"
              >
                <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                <td className="whitespace-nowrap px-6 py-4 capitalize">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{user._id}</td>

                {user.isBanned ? (
                  <td align="right">
                    <button
                      type="submit"
                      className="bg-red-900 text-white px-3 py-1 rounded-sm"
                      onClick={() => {
                        handleUnBan(user._id);
                      }}
                    >
                      unBan User
                    </button>
                  </td>
                ) : (
                  <td align="right">
                    <button
                      type="submit"
                      className="bg-green-900 text-white px-3 py-1 rounded-sm"
                      onClick={() => {
                        handleBan(user._id);
                      }}
                    >
                      Ban User
                    </button>
                  </td>
                )}

                <td
                  className="whitespace-nowrap px-6 py-4"
                  onClick={() => handleDelete(user._id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default AdminDashboardUsers;
