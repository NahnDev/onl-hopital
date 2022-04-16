import { BottomSheet, Text } from "@rneui/themed";
import { ReactNode } from "react";
import { Modal, View } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { useStyles } from "../style";

export default function Dialog(props: {
  children: ReactNode;
  visible?: boolean;
}) {
  const { justifyCenter, itemCenter, rounded, textCenter, padding } =
    useStyles();
  const { background, tint } = Colors[useColorScheme()];
  console.log(props.visible);
  return props.visible ? (
    <Modal visible={true} statusBarTranslucent transparent>
      <View
        style={[
          {
            flex: 1,
          },
          justifyCenter,
          itemCenter,
        ]}
      >
        <View
          style={[
            { backgroundColor: tint, minHeight: 200, minWidth: 300 },
            padding,
            rounded,
            itemCenter,
          ]}
        >
          {props.children}
        </View>
      </View>
    </Modal>
  ) : (
    <></>
  );
}
