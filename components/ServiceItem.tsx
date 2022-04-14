import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Text } from "@rneui/themed";
import { ServiceType } from "../store/types";
import { useStyles } from "../style";

export default function ServiceItem(props: {
  style?: StyleProp<ViewStyle>;
  info: ServiceType;
}) {
  const { marginVertical, padding } = useStyles();
  return (
    <View style={[props.style, marginVertical, padding]}>
      <Text>{props.info.name}</Text>
    </View>
  );
}
