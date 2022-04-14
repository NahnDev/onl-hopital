import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
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
  reducers: {},
});

export const appointmentReducer = appointmentSlice.reducer;
export const {} = appointmentSlice.actions;
