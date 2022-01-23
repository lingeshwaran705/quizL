import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "count",
  initialState: { value: 60 },
  reducers: {
    setCount: (state) => {
      state.value -= 1;
    },
    setInitialCount: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCount, setInitialCount } = countSlice.actions;

export default countSlice.reducer;
