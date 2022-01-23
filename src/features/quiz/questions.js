import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: { value: 0 },
  reducers: {
    changeQuestion: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeQuestion } = questionSlice.actions;

export default questionSlice.reducer;
