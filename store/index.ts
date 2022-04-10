import { configureStore } from "@reduxjs/toolkit";
import { appointmentReducer } from "./appointment";
import { doctorReducer } from "./doctor";
import { profileReducer } from "./profile";
import { userReducer } from "./user";

const store = configureStore({
  reducer: {
    user: userReducer,
    appointments: appointmentReducer,
    doctors: doctorReducer,
    profiles: profileReducer,
  },
  middleware: [],
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
