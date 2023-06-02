import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from 'process';

interface IInitialState {
  data:null,
  status:string
}

const REACT_APP_API_URL = 'https://web-app-server-75zy.onrender.com';

const instance = axios.create({
  baseURL: REACT_APP_API_URL
});
//process.env.REACT_APP_API_URL

instance.interceptors.request.use((config)=>{
  config.headers.Authorization=window.localStorage.getItem('token');
  return config;
})



export const fetchUserData = createAsyncThunk('fetch/fetchUserData',async(params:{email: string, password: string})=>{
  const { data } = await instance.post('/auth/login',params);
  return data;
})

export const fetchAuthMe = createAsyncThunk('fetch/fetchAuthMe',async()=>{
  const { data } = await instance.get('/auth/me');
  return data;
})

export const fetchRegister = createAsyncThunk('fetch/fetchRegister',async(params:{email: string, password: string,fullName:string})=>{
  const { data } = await instance.post('/auth/register',JSON.stringify(params),{
    headers:{
      "Content-Type":"application/json"
    }
  });
  return data;
})

const initialState = {
  data:null,
  status:'loading'
}as IInitialState;

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers: {
    logout:(state)=>{
      state.data = null;
    }
  },
  extraReducers:(builder)=> {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status='loading';
      state.data = null;
    })
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.status = 'loaded'
      state.data = action.payload
    })
    builder.addCase(fetchUserData.rejected, (state) => {
      state.status='error';
      state.data = null;
    })
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status='loading';
      state.data = null;
    })
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.status = 'loaded'
      state.data = action.payload
    })
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.status='error';
      state.data = null;
    })
    builder.addCase(fetchRegister.pending, (state) => {
      state.status='loading';
      state.data = null;
    })
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = 'loaded'
      state.data = action.payload
    })
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status='error';
      state.data = null;
    })
  }

})
export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions

