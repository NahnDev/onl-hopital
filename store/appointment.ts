import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { BookingType, DoctorType } from "./types";

const initialState: AppointmentState = {
  "1": {
    _id: "1",
    date: new Date("4/3/2020").getTime(),
    timePeriod: 1,
    profile: {
      _id: "p1",
      name: "Le Thanh Nhan",
    },
    service: [
      { _id: "1", name: "Cham soc rang ham" },
      { _id: "3", name: "Cay rang gia" },
      { _id: "5", name: "Ve sinh rang" },
    ],
  },
  "5": {
    _id: "5",
    date: new Date("2/3/2020").getTime(),
    timePeriod: 5,
    profile: {
      _id: "p1",
      name: "Le Thanh Nhan",
    },
    service: [
      {
        _id: "2",
        name: "Cham soc da",
      },
    ],
  },
};

export type AppointmentState = {
  [key: string]: BookingType;
};
export const appointmentSlice = createSlice<
  AppointmentState,
  SliceCaseReducers<AppointmentState>
>({
  name: "appointment",
  initialState,
  reducers: {},
});

export const appointmentReducer = appointmentSlice.reducer;
export const {} = appointmentSlice.actions;
