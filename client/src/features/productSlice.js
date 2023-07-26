import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Define your actions and reducers here
    // For example:
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    toggleCartOpen: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    // Add other actions as needed
  },
});

export const {
  setProducts,
  addToCart,
  toggleCartOpen,
  // Add other action creators here
} = productSlice.actions;

export default productSlice.reducer;
