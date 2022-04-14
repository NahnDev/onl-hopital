import { AppDispatch } from "..";
import { axiosClient } from "../api/axiosClient";
import { set } from "../slices/doctor.slice";
import { DoctorType } from "../types";

export function loadDoctor() {
  return async (dispatch: AppDispatch) => {
    const doctors = await axiosClient.get<any, DoctorType[]>("/doctor");
    dispatch(set(doctors));
  };
}
