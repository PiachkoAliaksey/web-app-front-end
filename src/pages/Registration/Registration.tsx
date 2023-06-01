import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "redux/store";
import { useForm } from "react-hook-form";
import { fetchRegister } from '../../redux/slices/auth';
import { Navigate } from "react-router-dom";

import './Registration.scss';

export const Registration:React.FC = () => {
  const isAuth = useSelector((state: RootState) => Boolean(state.auth.data))
  const dispatch: ThunkDispatch<{ email: string, password: string,fullName: string }, void, AnyAction> = useDispatch();
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: ''
    },
    mode: 'onSubmit'
  })

  const onSubmit = async (values: { email: string, password: string,fullName: string }) => {
    const data = await dispatch(fetchRegister(values));
    console.log(data)
    if (!data.payload) {
      return alert('Not available registration')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to='/'></Navigate>
  }

  return (
    <Paper classes="registration-bar">
      <Typography classes={{ root: "title" }} variant="h5">
        Create account
      </Typography>
      <div className="registration-avatar">
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Write fullName' })} className="registration-field" label="Full name" fullWidth />
        <TextField type='email' error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Write Email' })} className="registration-field" label="E-Mail" fullWidth />
        <TextField type='password' error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Write Password' })} className="registration-field" label="Password" fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Registration
        </Button>
      </form>
    </Paper>
  );
};
