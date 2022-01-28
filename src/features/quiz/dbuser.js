import { createSlice } from "@reduxjs/toolkit";

const dbuserSlice = createSlice({
  name: "dbuser",
  initialState: { value: [] },
  reducers: {
    setuser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setuser } = dbuserSlice.actions;

export default dbuserSlice.reducer;
