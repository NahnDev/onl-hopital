import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PROCESS_STATUS } from "../../enum/PROCESS_ENUM";

export type ProcessState = {
  CreateAppointment: { status: PROCESS_STATUS; message?: string };
  LoadAppointment: { status: PROCESS_STATUS; message?: string };
  CancelAppointment: { status: PROCESS_STATUS; message?: string };

  CreateProfile: { status: PROCESS_STATUS; message?: string };
  UpdateProfile: { status: PROCESS_STATUS; message?: string };
};
const initialState: ProcessState = {
  CreateAppointment: { status: PROCESS_STATUS.WAIT },
  CreateProfile: { status: PROCESS_STATUS.WAIT },
  UpdateProfile: { status: PROCESS_STATUS.WAIT },
  LoadAppointment: { status: PROCESS_STATUS.WAIT },
  CancelAppointment: { status: PROCESS_STATUS.WAIT },
};

export const processSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    complete(
      state: ProcessState,
      action: PayloadAction<{ key: keyof ProcessState; message?: string }>
    ) {
      return {
        ...state,
        [action.payload.key]: {
          status: PROCESS_STATUS.COMPLETE,
          message: action.payload.message,
        },
      };
    },
    reset(
      state: ProcessState,
      action: PayloadAction<{ key: keyof ProcessState; message?: string }>
    ) {
      return {
        ...state,
        [action.payload.key]: {
          status: PROCESS_STATUS.WAIT,
          message: action.payload.message,
        },
      };
    },
    failure(
      state: ProcessState,
      action: PayloadAction<{ key: keyof ProcessState; message?: string }>
    ) {
      return {
        ...state,
        [action.payload.key]: {
          status: PROCESS_STATUS.FAILURE,
          message: action.payload.message,
        },
      };
    },
    start(
      state: ProcessState,
      action: PayloadAction<{ key: keyof ProcessState; message?: string }>
    ) {
      return {
        ...state,
        [action.payload.key]: {
          status: PROCESS_STATUS.DOING,
          message: action.payload.message,
        },
      };
    },
  },
});

export const processReducer = processSlice.reducer;
export const { reset, start, complete, failure } = processSlice.actions;
