import { createReducer } from '@reduxjs/toolkit';
import { setUserData, clearUserData, checkAuth, login, logout } from './action';
import { UserData } from '../types/types';

type UserDataState = UserData | null;

const initialState: UserDataState = null;

const userDataReducer = createReducer<UserDataState>(initialState, (builder) => {
  builder
    .addCase(setUserData, (_state, action) => action.payload)
    .addCase(clearUserData, () => null)
    .addCase(checkAuth.fulfilled, (_state, action) => action.payload)
    .addCase(login.fulfilled, (_state, action) => action.payload)
    .addCase(logout.fulfilled, () => null);
});

export default userDataReducer;
