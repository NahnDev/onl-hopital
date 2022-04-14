import React, { useEffect, useState } from "react";
import {
  ImageStyle,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { Image, Text, Icon } from "@rneui/themed";
import { useStyles } from "../style";
import { Colors } from "../themes/default";
import * as ExpoImagePicker from "expo-image-picker";
import useImagePicker from "../hooks/useImagePicker";
import { BaseUrl } from "../constants/BaseUrl";

export default function ImagePicker(props: {
  defaultUri: string;
  onChange?: (uri: string) => any;
  imageStyle?: StyleProp<ViewStyle & ImageStyle>;
  aspect?: [number, number];
  disable?: boolean;
}) {
  const {
    rounded,
    justifyCenter,
    itemCenter: alignCenter,
    margin,
  } = useStyles();
  const [uri, setUri] = useState(props.defaultUri);
  console.log(uri);
  const handleClick = () => {
    if (props.disable) return;
    ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: props.aspect || [1, 1],
      quality: 1,
    }).then((result) => {
      if (!result.cancelled) {
        setUri(result.uri);
      }
    });
  };
  useEffect(() => {
    props.onChange && props.onChange(uri);
  }, [uri]);

  return (
    <Pressable onPress={() => handleClick()}>
      <View>
        {uri ? (
          <Image
            source={{
              uri:
                uri.indexOf("file") * uri.indexOf("http") > -1
                  ? uri
                  : `${BaseUrl}/${uri}`,
            }}
            style={[
              { height: 200, width: 150 },
              rounded,
              margin,
              props.imageStyle,
            ]}
          ></Image>
        ) : (
          <View
            style={[
              { height: 200, width: 150, backgroundColor: Colors.overlay },
              rounded,
              margin,
              justifyCenter,
              alignCenter,
              props.imageStyle,
            ]}
          >
            <Icon name="add"></Icon>
          </View>
        )}
      </View>
    </Pressable>
  );
}
