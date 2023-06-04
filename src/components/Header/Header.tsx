import React from 'react';
import {Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import './Header.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { logout } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth:boolean = useSelector((state:RootState) => Boolean(state.auth.data)&&state.auth.data.status!=='blocked');

  const onClickLogout = () => {
    if(window.confirm('Are you sure you want to logout'))
    dispatch(logout())
    window.localStorage.removeItem('token')
  };

  return (
    <div className="nav-bar">
      <Container maxWidth="lg">
        <div className="inner">
          <Link className="logo" to="/">
            <div>WEB APP</div>
          </Link>
          <div className="buttons">
            {isAuth ? (
              <>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Enter</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Create account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
