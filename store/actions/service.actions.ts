import { AppDispatch } from "..";
import { axiosClient } from "../api/axiosClient";
import { load } from "../slices/service.slice";
import { ServiceType } from "../types";

export class ServiceActions {
  static load() {
    return async (dispatch: AppDispatch) => {
      console.log("work A");
      const services = await axiosClient.get<any, ServiceType[]>("/service");
      console.log("work B");
      dispatch(load(services));
    };
  }
}
