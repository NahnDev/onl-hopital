import store, { AppDispatch } from "..";
import { BaseUrl } from "../../constants/BaseUrl";
import { axiosClient } from "../api/axiosClient";
import { uploadImage } from "../api/upload.api";
import { update } from "../slices/user.slice";

export default function uploadAvatar(_id: string, imageUri: string) {
  return async (dispatch: AppDispatch) => {
    console.log("Action active");
    console.log("imageUri");

    const info = await uploadImage(imageUri);
    await axiosClient.patch(`user/${_id}`, { avatar: info.uri });
    dispatch(update({ avatar: info.uri }));
  };
}
