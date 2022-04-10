import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { USER_ROLE } from "../enum/USER_ROLE";
import { UserType } from "./types";

export type UserState = UserType;
const initialState: UserState = {
  email: "thanhnhan@gmail.com",
  _id: "1",
  name: "Le Thanh Nhan",
  avatar:
    "https://scontent.fvca1-2.fna.fbcdn.net/v/t1.6435-9/118630033_752251945336443_2160014405435624924_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vjLRErBnQ6oAX_O933e&_nc_ht=scontent.fvca1-2.fna&oh=00_AT_oxDthzU-6-mqAL2N4r44MoXvThVNvJOZ_ppAXZhemXQ&oe=626D7EF5",
  role: USER_ROLE.BASIC,
};

export const userSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
  name: "user",
  initialState,
  reducers: {},
});

export const userReducer = userSlice.reducer;
export const {} = userSlice.actions;
