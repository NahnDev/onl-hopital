import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

export const loadSlice = createSlice({
  name: "load",
  initialState: { count: 0 },
  reducers: {
    wait(state) {
      console.log(" a WAIT -------------------");
      return { count: state.count + 1 };
    },
    complete(state) {
      console.log(" a complete -------------------");
      return { count: Math.max(state.count - 1, 0) };
    },
  },
});

export const loadReduce = loadSlice.reducer;
export const { wait, complete } = loadSlice.actions;
