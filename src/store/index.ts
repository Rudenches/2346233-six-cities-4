import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { createAPI } from '../services/api';
import { checkAuth } from './action';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.dispatch(checkAuth());
