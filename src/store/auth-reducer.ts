import { createReducer } from '@reduxjs/toolkit';
import { setAuthorizationStatus, checkAuth, login, logout } from './action';
import { AuthorizationStatus } from '../const';

type AuthState = {
  authorizationStatus: AuthorizationStatus;
};

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(checkAuth.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(checkAuth.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(login.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(login.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logout.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

export default authReducer;
