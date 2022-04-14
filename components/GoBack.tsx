import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import React from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import { useStyles } from "../style";

export default function GoBack(props: {
  onPress?: () => any;
  style?: StyleProp<ViewStyle>;
  color?: string;
}) {
  const { itemStart: alignStart } = useStyles();
  const navigation = useNavigation();
  return (
    <View
      style={[
        props.style,
        {
          zIndex: 10,
          position: "absolute",
          alignSelf: "flex-start",
          top: 30,
          left: 10,
        },
      ]}
    >
      <Pressable
        onPress={() => (props.onPress ? props.onPress() : navigation.goBack())}
      >
        <Icon
          name="arrow-left"
          // type="font-awesome"
          size={40}
          color={props.color || "white"}
        ></Icon>
      </Pressable>
    </View>
  );
}
