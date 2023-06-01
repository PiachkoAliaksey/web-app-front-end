import React, { useState, SetStateAction, Dispatch } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Checkbox } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';

interface ITable {
  _id: string,
  fullName: string
  email: string
  createdAt: string
  updatedAt: string
  status: string,
  index:number,
  isCheck:string[],
  setIsCheck:React.Dispatch<React.SetStateAction<string[]>>
}


export const UsersTable: React.FC<ITable> = ({setIsCheck,isCheck,index, _id, fullName, email, createdAt, updatedAt, status }) => {

  const handlerChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    if (e.target.checked) {
      setIsCheck([...isCheck,id])
    } else {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  }

  return (
    <TableRow key={_id}>
      <TableCell component="th" scope="row">
      <Checkbox  id={_id} checked={isCheck.includes(_id)}  onChange={handlerChangeCheckBox} />
      </TableCell>
      <TableCell>{_id}</TableCell>
      <TableCell>{fullName}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{`${createdAt.slice(0, 10)} at ${createdAt.slice(11, 19)}`}</TableCell>
      <TableCell>{`${updatedAt.slice(0, 10)} at ${updatedAt.slice(11, 19)}`}</TableCell>
      <TableCell>{status}</TableCell>
    </TableRow>
  )
}
