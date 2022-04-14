import { AppDispatch } from "..";
import {
  complete,
  failure,
  ProcessState,
  reset,
  start,
} from "../slices/process.slice";

export default class ProcessActions {
  static complete(key: keyof ProcessState, message?: string) {
    return async (dispatch: AppDispatch) => {
      dispatch(complete({ key, message }));
    };
  }
  static reset(key: keyof ProcessState, message?: string) {
    return async (dispatch: AppDispatch) => {
      dispatch(reset({ key, message }));
    };
  }
  static start(key: keyof ProcessState, message?: string) {
    return async (dispatch: AppDispatch) => {
      dispatch(start({ key, message }));
    };
  }
  static failure(key: keyof ProcessState, message?: string) {
    return async (dispatch: AppDispatch) => {
      dispatch(failure({ key, message }));
    };
  }
}
