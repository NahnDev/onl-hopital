import { LinearProgress, Text } from "@rneui/themed";
import React from "react";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import ProcessWaiting from "../ProcessWaiting";

export default function ActionCompleted(props: {
  visible: boolean;
  message?: string;
}) {
  const { tint } = Colors[useColorScheme()];
  return (
    <ProcessWaiting visible={props.visible}>
      <Text style={{ color: tint, textAlign: "center" }}>
        Thao tác hoàn tất
      </Text>
      <Text style={{ textAlign: "center" }}>{props.message}</Text>
      <LinearProgress
        style={{ width: 300, marginTop: 10 }}
        color={tint}
      ></LinearProgress>
    </ProcessWaiting>
  );
}
