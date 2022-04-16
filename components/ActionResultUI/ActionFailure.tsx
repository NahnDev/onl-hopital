import { LinearProgress, Text } from "@rneui/themed";
import React from "react";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import ProcessWaiting from "../ProcessWaiting";

export default function ActionFailure(props: {
  visible: boolean;
  message?: string;
}) {
  const { warning } = Colors[useColorScheme()];
  return (
    <ProcessWaiting visible={props.visible}>
      <Text style={{ color: warning, textAlign: "center" }}>
        Thao tác thất bại
      </Text>
      <Text style={{ textAlign: "center", marginBottom: 10 }}>
        {props.message}
      </Text>
      <LinearProgress style={{ width: 300 }} color={warning}></LinearProgress>
    </ProcessWaiting>
  );
}
