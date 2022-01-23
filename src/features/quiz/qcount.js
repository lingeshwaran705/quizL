import { createSlice } from "@reduxjs/toolkit";

const qcountSlice = createSlice({
  name: "qcount",
  initialState: { value: 0 },
  reducers: {
    next: (state) => {
      state.value += 1;
    },
    prev: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { next, prev, reset } = qcountSlice.actions;

export default qcountSlice.reducer;
