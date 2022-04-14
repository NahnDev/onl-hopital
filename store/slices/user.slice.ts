import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

import { USER_ROLE } from "../../enum/USER_ROLE";
import { CreateUserDto, UserType } from "../types";

export type UserState = UserType;
const initialState: UserState = {
  email: "",
  _id: "",
  name: "",
  avatar: "",
  role: USER_ROLE.BASIC,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set(state: UserState, action: PayloadAction<UserType>) {
      return action.payload;
    },
    update(
      state: UserState,
      action: PayloadAction<
        Partial<Pick<UserType, "avatar" | "name" | "password">>
      >
    ) {
      return { ...state, ...action.payload };
    },
  },
});

export const userReducer = userSlice.reducer;
export const { set, update } = userSlice.actions;
