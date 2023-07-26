import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Define your actions and reducers here
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    toggleCartOpen: (state) => {
      state.cartOpen = !state.cartOpen;
    },
  },
});

export const { setProducts, addToCart, toggleCartOpen } = productSlice.actions;

export default productSlice.reducer;
