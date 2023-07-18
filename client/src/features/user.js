import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      username: "",
      email: "",
      password: "",
    },
  },
  reducers: {
    login: (state, action) => {},
  },
});
