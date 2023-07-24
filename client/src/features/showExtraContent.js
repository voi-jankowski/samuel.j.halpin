const { createSlice } = require("@reduxjs/toolkit");

const initialStateValue = false;

export const showExtraContentSlice = createSlice({
  name: "showExtraContent",
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggle } = showExtraContentSlice.actions;
export default showExtraContentSlice.reducer;
