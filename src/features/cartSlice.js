import { createSlice } from "@reduxjs/toolkit";

const data =
  localStorage.getItem("cart") !== null
    ? JSON.parse(String(localStorage.getItem("cart")))
    : [];

const initialCart = {
  cartItems: data,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    setCart: (state, action) => {
      const itemInCart = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (itemInCart) {
        return;
      } else {
        state.cartItems.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
    deleteCartItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== id
      );
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeAllCartItems: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { setCart, deleteCartItem, removeAllCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;
