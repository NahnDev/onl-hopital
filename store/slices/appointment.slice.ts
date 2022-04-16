import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { BookingType, DoctorType } from "../types";

export type AppointmentState = {
  [key: string]: BookingType;
};
export const appointmentSlice = createSlice<
  AppointmentState,
  SliceCaseReducers<AppointmentState>
>({
  name: "appointment",
  initialState: {},
  reducers: {
    set(state: AppointmentState, action: PayloadAction<BookingType[]>) {
      const nextState = action.payload.reduce<AppointmentState>(
        (state, item) => {
          return { ...state, [item._id]: item };
        },
        {} as AppointmentState
      );
      return nextState;
    },
    add(state: AppointmentState, action: PayloadAction<BookingType>) {
      return { ...state, [action.payload._id]: action.payload };
    },
    remove(state: AppointmentState, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const newState = { ...state };
      delete newState[id];
      return newState;
    },
  },
});

export const appointmentReducer = appointmentSlice.reducer;
export const { set, add, remove } = appointmentSlice.actions;
