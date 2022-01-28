import { createSlice } from "@reduxjs/toolkit";

const nameSlice = createSlice({
  name: "name",
  initialState: {
    value: { name: "", domain: "", error: "", processing: "" },
  },
  reducers: {
    setName: (state, action) => {
      state.value.name = action.payload;
    },
    setDomain: (state, action) => {
      state.value.domain = action.payload;
    },
    setError: (state, action) => {
      state.value.error = action.payload;
    },
    process: (state, action) => {
      state.value.processing = action.payload;
    },
  },
});

export const { setName, setDomain, setError, process } = nameSlice.actions;

export default nameSlice.reducer;
