import { createSlice } from "@reduxjs/toolkit";

const langSlice = createSlice({
  name: "language",
  initialState: { value: "JavaScript" },
  reducers: {
    changeLanguage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeLanguage } = langSlice.actions;

export default langSlice.reducer;
