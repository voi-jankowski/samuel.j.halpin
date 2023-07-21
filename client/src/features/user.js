import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  username: "",
  email: "",
  password: "",
  userIcon: "https://bit.ly/sage-adebayo",
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.value = action.payload;
    },

    logout: (state) => {
      state.value = initialStateValue;
    },

    update: (state, action) => {
      console.log(action.payload);
      state.value = action.payload;
    },
  },
});

export const { login, logout, update } = userSlice.actions;
export default userSlice.reducer;
