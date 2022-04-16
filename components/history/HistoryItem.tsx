import { Text } from "@rneui/base";
import React from "react";
import { View } from "react-native";
import { HistoryType } from "../../store/types";
import { useStyles } from "../../style";

export default function HistoryItem(props: { info: HistoryType }) {
  const { margin, rounded, padding } = useStyles();
  return (
    <View
      style={[
        margin,
        rounded,
        { backgroundColor: `#${Math.random().toString().slice(3, 6)}5` },
      ]}
    >
      <Text>{props.info._id}</Text>
      <Text>{props.info.result}</Text>
      <Text>{new Date(props.info.at).toLocaleString("en-US")}</Text>
    </View>
  );
}
