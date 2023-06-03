import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Button, Checkbox } from "@mui/material";
import { Navigate } from "react-router-dom";
import { RootState } from 'redux/store';
import { fetchUsersTable, fetchDeleteUser, fetchStatusStatusUser } from '../redux/slices/usersTable';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { TableRowsLoader } from '../components/Table/TableRowsLoader';
import { UsersTable } from '../components/Table/Table';
import { logout } from '../redux/slices/auth';

export interface IUser {
  _id: string,
  fullName: string,
  email: string,
  password: string,
  status: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}


export const Home: React.FC = () => {
  const dispatch: ThunkDispatch<IUser[], void, AnyAction> = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.data)
  const isAuth = Boolean(userData) && userData.status !== 'blocked';
  const { items, status }: { items: IUser[], status: string } = useSelector((state: RootState) => state.users.users)
  const isTableUsersLoading = status === 'loading';

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);

  const handlerCheckAllCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(items.map(li => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  }

  const handlerDeleteUser = async (arrId: string[]) => {
    arrId.forEach(async (user) => {
      await dispatch(fetchDeleteUser(user));
      if (userData._id === user) {
        dispatch(logout());
        window.localStorage.removeItem('token')
      }
      setTimeout(() => window.location.reload(), 1000);
    })
  }

  const handlerBlockUser = async (arrId: string[], status = 'blocked') => {
    arrId.forEach(async (user) => {
      await dispatch(fetchStatusStatusUser({ user, status }));
      if (userData._id === user) {
        dispatch(logout());
        window.localStorage.removeItem('token');
      }
    })
    setTimeout(() => window.location.reload(), 1000);
  }

  const handlerActiveUser = async (arrId: string[], status = 'active') => {
    arrId.forEach(async (user) => {
      await dispatch(fetchStatusStatusUser({ user, status }));
    })
    setTimeout(() => window.location.reload(), 1000);
  }

  useEffect(() => {
    dispatch(fetchUsersTable());
  }, [])

  return (
    <>
      {isAuth ? (<Box>
        <Box sx={{ display: 'flex' }}>
          <Button
            onClick={() => handlerDeleteUser(isCheck)}
            variant="outlined"
            sx={{ marginBottom: "10px", marginRight: "10px" }}
          >
            Delete
          </Button>
          <Button
            onClick={() => handlerBlockUser(isCheck)}
            variant="outlined"
            sx={{ marginBottom: "10px", marginRight: "10px" }}
          >
            Block
          </Button>
          <Button
            onClick={() => handlerActiveUser(isCheck)}
            variant="outlined"
            sx={{ marginBottom: "10px" }}
          >
            Unblock
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Checkbox checked={isCheckAll} onChange={handlerCheckAllCheckbox} /> Checkbox</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isTableUsersLoading ? (
                <TableRowsLoader rowsNum={10} />
              ) : (
                items.map((user: IUser, i) => (
                  <UsersTable
                    isCheck={isCheck}
                    setIsCheck={setIsCheck}
                    index={i}
                    _id={user._id}
                    fullName={user.fullName}
                    email={user.email}
                    createdAt={user.createdAt}
                    updatedAt={user.updatedAt}
                    status={user.status}
                  />
                )
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>) : ''}
    </>
  );
};
