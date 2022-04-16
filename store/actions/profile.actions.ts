import { Dispatch } from "react";
import { AppDispatch } from "..";
import { axiosClient } from "../api/axiosClient";
import { CreateProfileDto, ProfileType, UpdateProfileDto } from "../types";
import ProcessActions from "./process.actions";
import { set, add } from "../slices/profile.slice";

export default class ProfileActions {
  static create(createProfileDto: CreateProfileDto) {
    return async (dispatch: AppDispatch) => {
      dispatch(ProcessActions.start("CreateProfile"));
      try {
        const profile = await axiosClient.post<any, ProfileType>(
          "profile",
          createProfileDto
        );
        dispatch(add(profile));
        dispatch(ProcessActions.complete("CreateProfile"));
      } catch (err) {
        dispatch(
          ProcessActions.failure("CreateProfile", (err as Error).message)
        );
      }
    };
  }
  static load() {
    return async (dispatch: AppDispatch) => {
      const profiles = await axiosClient.get<any, ProfileType[]>("/profile");
      console.log(profiles);
      dispatch(set(profiles));
    };
  }
  static update(id: string, updateDto: UpdateProfileDto) {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(ProcessActions.start("UpdateProfile"));
        await axiosClient.patch(`/profile/${id}`, updateDto);
        dispatch(ProfileActions.load());
        dispatch(ProcessActions.complete("UpdateProfile"));
      } catch (err) {
        ProcessActions.failure("UpdateProfile", (err as Error).message);
      }
    };
  }
}
