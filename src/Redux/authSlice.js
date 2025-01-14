import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    accessToken: null,
    loginStatus: false,
    user_id: null,
    mobileNumber: '',
    email: '',
  }

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeLoginStatus: (state, action) => {
      state.value.loginStatus = action.payload;
    },
    setToken: (state, action) => {
      state.value.accessToken = action.payload;
    },
    setUserId: (state, action) => {
      state.value.user_id = action.payload;
    },
  //   setUserType: (state, action) => {
  //     state.userType = action.payload;
  // },
    deleteToken: (state, action) => {
      state.value.accessToken = action.payload;
    },
    setEmail: (state, action) => {
      state.value.email = action.payload;  
    },
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
    logout: (state) => {
      state.value.accessToken = null;
      state.value.loginStatus = false;
    }
  },
});

export const { changeLoginStatus, setToken, setUserId, deleteToken, logout, setEmail, setMobileNumber } = authSlice.actions;
export default authSlice.reducer;
