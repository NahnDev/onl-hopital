import { AppDispatch } from "..";
import { complete } from "../slices/process.slice";
import { CreateAppointmentDto } from "../types";

export default class AppointmentActions {
  static create(data: CreateAppointmentDto) {
    return async (dispatch: AppDispatch) => {
      // calApi
      dispatch(complete({ key: "CreateAppointment" }));
    };
  }
}
