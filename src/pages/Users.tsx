import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getAllUsers } from '../services/UserServices';
import axios from 'axios';

interface UserT {
    name: string
    email: string
    _id:string
  }
const Users = () => {
    const [users, setUsers] = useState<UserT[]>([]);
      const fetchUsers = async () => {
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
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.email}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Users