import { AppDispatch } from "..";
import { axiosClient } from "../api/axiosClient";
import ProcessActions from "./process.actions";
import { BookingType, CreateAppointmentDto } from "../types";
import { set, add, remove } from "../slices/appointment.slice";
import * as Notifications from "expo-notifications";

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

export default class AppointmentActions {
  static create(data: CreateAppointmentDto) {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(ProcessActions.start("CreateAppointment"));
        const ap = await axiosClient.post<any, BookingType>(
          "/appointment",
          data
        );
        dispatch(add(ap));
        schedulePushNotification().then();
        dispatch(ProcessActions.complete("CreateAppointment"));
      } catch (err) {
        dispatch(
          ProcessActions.failure("CreateAppointment", (err as Error).message)
        );
      }
    };
  }
  static load() {
    return async (dispatch: AppDispatch) => {
      // try {
      dispatch(ProcessActions.start("LoadAppointment"));
      const ap = await axiosClient.get<any, BookingType[]>("/appointment");
      console.log(ap);
      dispatch(set(ap));
      dispatch(ProcessActions.complete("LoadAppointment"));
      // } catch (err) {
      //   dispatch(
      //     ProcessActions.failure("LoadAppointment", (err as Error).message)
      //   );
      // }
    };
  }
  static cancel(id: string) {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(ProcessActions.start("CancelAppointment"));
        const ap = await axiosClient.delete<any, BookingType>(
          `/appointment/${id}`
        );
        dispatch(remove({ id }));
        dispatch(ProcessActions.complete("CancelAppointment"));
      } catch (err) {
        dispatch(
          ProcessActions.failure("CancelAppointment", (err as Error).message)
        );
      }
    };
  }
}
