import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { appointmentReducer } from "./slices/appointment.slice";
import { doctorReducer } from "./slices/doctor.slice";
import { profileReducer } from "./slices/profile.slice";
import { userReducer } from "./slices/user.slice";
import thunk, { ThunkDispatch } from "redux-thunk";
import { authReducer } from "./slices/auth.slice";
import { loadReduce } from "./slices/load.slice";
import { serviceReducer } from "./slices/service.slice";
import { processReducer } from "./slices/process.slice";
import { types } from "@babel/core";

const store = configureStore({
  reducer: {
    services: serviceReducer,
    load: loadReduce,
    auth: authReducer,
    user: userReducer,
    appointments: appointmentReducer,
    doctors: doctorReducer,
    profiles: profileReducer,
    process: processReducer,
  },
  middleware: [thunk],
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
