import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  username: "",
  email: "",
  // password: "",
  userIcon: "./assets/images-converted/moth7.webp",
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },

    logout: (state) => {
      state.value = initialStateValue;
    },

    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { login, logout, update } = userSlice.actions;
export default userSlice.reducer;
