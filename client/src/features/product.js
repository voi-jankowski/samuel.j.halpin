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
    updateCartQuantity: (state, action) => {
      state.cartOpen = true;
      state.cart = state.cart.map((product) => {
        if (action.payload._id === product._id) {
          product.purchaseQuantity = action.payload.purchaseQuantity;
        }
        return product;
      });
    },
    toggleCartOpen: (state) => {
      state.cartOpen = !state.cartOpen;
    },
  },
});

export const { setProducts, addToCart, toggleCartOpen, updateCartQuantity } =
  productSlice.actions;

export default productSlice.reducer;
