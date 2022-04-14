import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { ProfileType } from "../types";

const initialState: ProfileState = {
  "1": {
    _id: "1",
    name: "Sunt eiusmod eiusmod",
    histories: [
      { _id: "3", at: new Date().getTime() },
      { _id: "3", at: new Date().getTime() },
    ],
    image:
      "https://scontent.fvca1-2.fna.fbcdn.net/v/t1.6435-9/118630033_752251945336443_2160014405435624924_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vjLRErBnQ6oAX_O933e&_nc_ht=scontent.fvca1-2.fna&oh=00_AT_oxDthzU-6-mqAL2N4r44MoXvThVNvJOZ_ppAXZhemXQ&oe=626D7EF5",
    age: 32,
    address: "Chau Thanh - Tien Giang",
    phone: "0868674092",
    sex: "MALE",
  },
  "2": {
    _id: "2",
    name: "Sint fugiat exercitation",
    histories: [
      { _id: "3", at: new Date().getTime() },
      { _id: "3", at: new Date().getTime() },
    ],
    image:
      "https://scontent.fvca1-2.fna.fbcdn.net/v/t1.6435-9/118630033_752251945336443_2160014405435624924_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vjLRErBnQ6oAX_O933e&_nc_ht=scontent.fvca1-2.fna&oh=00_AT_oxDthzU-6-mqAL2N4r44MoXvThVNvJOZ_ppAXZhemXQ&oe=626D7EF5",
    age: 32,
    address: "Chau Thanh - Tien Giang",
    phone: "0868674092",
    sex: "MALE",
  },
};

export type ProfileState = {
  [key: string]: ProfileType;
};
export const profileSlice = createSlice<
  ProfileState,
  SliceCaseReducers<ProfileState>
>({
  name: "profile",
  initialState,
  reducers: {},
});

export const profileReducer = profileSlice.reducer;
export const {} = profileSlice.actions;
