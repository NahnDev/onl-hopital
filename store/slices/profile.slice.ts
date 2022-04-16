import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { GENDER } from "../../enum/GENDER";
import { ProfileType } from "../types";

export type ProfileState = {
  [key: string]: ProfileType;
};
export const profileSlice = createSlice({
  name: "profile",
  initialState: {} as ProfileState,
  reducers: {
    set(state: ProfileState, action: PayloadAction<ProfileType[]>) {
      const { payload: profiles } = action;
      return profiles.reduce(
        (state, profile) => ({ ...state, [profile._id]: profile }),
        {} as ProfileState
      );
    },
    add(state: ProfileState, action: PayloadAction<ProfileType>) {
      const { payload: profile } = action;
      return { ...state, [profile._id]: profile };
    },
  },
});

export const profileReducer = profileSlice.reducer;
export const { set, add } = profileSlice.actions;
