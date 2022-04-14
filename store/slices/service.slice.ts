import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceType } from "../types";

export type ServiceState = {
  [key: string]: ServiceType;
};
export const serviceSlice = createSlice({
  name: "services",
  initialState: {} as ServiceState,
  reducers: {
    load(state: ServiceState, action: PayloadAction<ServiceType[]>) {
      return action.payload.reduce<ServiceState>(
        (result, current) => ({ ...result, [current._id]: current }),
        {}
      );
    },
    add(state: ServiceState, action: PayloadAction<ServiceType>) {
      return { ...state, [action.payload._id]: action.payload };
    },
  },
});

export const serviceReducer = serviceSlice.reducer;
export const { load, add } = serviceSlice.actions;
