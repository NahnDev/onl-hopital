import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useDispatch } from "react-redux";
import uploadAvatar from "../store/actions/user.actions";

export default function useImagePicker() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const pickImage = async () => {
    console.log("function work");
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return { image, pickImage };
}
