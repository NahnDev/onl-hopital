import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { DoctorType } from "../types";

export type DoctorState = {
  [key: string]: DoctorType;
};
export const doctorSlice = createSlice({
  name: "doctor",
  initialState: {} as DoctorState,
  reducers: {
    set(state: DoctorState, action: PayloadAction<DoctorType[]>) {
      return action.payload.reduce<DoctorState>(
        (result, current) => ({ ...result, [current._id]: current }),
        {}
      );
    },
    add(state: DoctorState, action: PayloadAction<DoctorType>) {
      return { ...state, [action.payload._id]: action.payload };
    },
  },
});

export const doctorReducer = doctorSlice.reducer;
export const { set, add } = doctorSlice.actions;
