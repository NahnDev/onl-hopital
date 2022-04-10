import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { DoctorType } from "./types";

const initialState: DoctorState = {
  "1": {
    _id: "1",
    name: "Le Thanh Nhan",
    avatar:
      "https://scontent.fvca1-2.fna.fbcdn.net/v/t1.6435-9/118630033_752251945336443_2160014405435624924_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vjLRErBnQ6oAX_O933e&_nc_ht=scontent.fvca1-2.fna&oh=00_AT_oxDthzU-6-mqAL2N4r44MoXvThVNvJOZ_ppAXZhemXQ&oe=626D7EF5",
    introduce:
      "Minim ullamco consequat sunt laborum tempor nisi velit occaecat deserunt voluptate.",
    email: "nahn.thanhnhan@gmail.com",
  },
  "2": {
    _id: "2",
    name: "Esse consectetur",
    avatar:
      "https://scontent.fvca1-2.fna.fbcdn.net/v/t1.6435-9/118630033_752251945336443_2160014405435624924_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vjLRErBnQ6oAX_O933e&_nc_ht=scontent.fvca1-2.fna&oh=00_AT_oxDthzU-6-mqAL2N4r44MoXvThVNvJOZ_ppAXZhemXQ&oe=626D7EF5",
    introduce: "In mollit elit aliqua non minim amet nulla ex.",
    email: "it.thanhnhan.mientay@gmail.com",
  },
  "3": {
    _id: "3",
    name: "Le Hoang Phuc",
    avatar:
      "https://scontent.fvca1-2.fna.fbcdn.net/v/t1.6435-9/118630033_752251945336443_2160014405435624924_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vjLRErBnQ6oAX_O933e&_nc_ht=scontent.fvca1-2.fna&oh=00_AT_oxDthzU-6-mqAL2N4r44MoXvThVNvJOZ_ppAXZhemXQ&oe=626D7EF5",
    introduce:
      "Est fugiat deserunt laborum nostrud labore aliqua tempor ut adipisicing ut elit ipsum eiusmod elit.",
    email: "thanhnhan.mientay@gmail.com",
  },
};

export type DoctorState = {
  [key: string]: DoctorType;
};
export const doctorSlice = createSlice<
  DoctorState,
  SliceCaseReducers<DoctorState>
>({
  name: "doctor",
  initialState,
  reducers: {},
});

export const doctorReducer = doctorSlice.reducer;
export const {} = doctorSlice.actions;
