import { createSlice } from "@reduxjs/toolkit";

const submitSlice = createSlice({
  name: "submit",
  initialState: { value: false },
  reducers: {
    ifSubmit: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { ifSubmit } = submitSlice.actions;

export default submitSlice.reducer;
