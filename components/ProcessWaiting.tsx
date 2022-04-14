import { Dialog } from "@rneui/base";
import { Overlay, Text, LinearProgress } from "@rneui/themed";
import React from "react";
import { Modal, View } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { useStyles } from "../style";

export default function ProcessWaiting(props: {
  visible: boolean;
  children?: React.ReactNode;
}) {
  const { justifyCenter, itemCenter: alignCenter, textCenter } = useStyles();
  const { padding, margin } = useStyles();
  const { tint } = Colors[useColorScheme()];
  return (
    <Modal visible={props.visible} animationType="fade" transparent>
      <View
        style={[
          { flex: 1, backgroundColor: "#fffe" },
          justifyCenter,
          alignCenter,
        ]}
      >
        <View>
          {props.children || (
            <>
              <Text style={[textCenter, margin]}>
                Hệ thống đang xử lý, vui lòng đợi
              </Text>
              <LinearProgress
                style={{ width: 300 }}
                color={tint}
              ></LinearProgress>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}
