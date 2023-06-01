import React, { Component,useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import Container from "@mui/material/Container";
import { Header } from "./components";
import { Home } from "./pages/Home";
import { Registration } from "./pages/Registration/Registration";
import { Login } from "./pages/Login/Login";
import { fetchAuthMe } from './redux/slices/auth';
import { RootState } from 'redux/store';

import './sass/style.scss';


function App() {
  const dispatch:ThunkDispatch<{email: string, password: string}, void, AnyAction> = useDispatch();
  const isAuth:boolean = useSelector((state:RootState) => Boolean(state.auth.data));
  useEffect(()=>{
    dispatch(fetchAuthMe())
  },[])
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  )
}

export default App;
