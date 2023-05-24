import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import useReducer from "../features/userSlice";
import cartReducer from '../features/cartSlice';

export const store = configureStore({
  reducer: {
    user: useReducer,
    cart : cartReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;