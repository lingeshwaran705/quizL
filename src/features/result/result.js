import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
  name: "result",
  initialState: { value: 0 },
  reducers: {
    changeResult: (state, action) => {
      state.value += action.payload;
    },
    resetResult: (state) => {
      state.value = 0;
    },
  },
});

export const { changeResult, resetResult } = resultSlice.actions;

export default resultSlice.reducer;
