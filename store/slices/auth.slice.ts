import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

export type AuthState = {
  accessToken: string;
};
const initialState: AuthState = {
  accessToken: "",
};
const authSlice = createSlice<AuthState, SliceCaseReducers<AuthState>>({
  name: "token",
  initialState,
  reducers: {
    set(state, action: PayloadAction<AuthState>) {
      AsyncStorage.setItem("@access_token", action.payload.accessToken);
      return action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { set } = authSlice.actions;
