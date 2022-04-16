import React, { useEffect, useState } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Input, InputProps, Text } from "@rneui/base";
import { useStyles } from "../style";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export default function TimeSelector(props: {
  value: Date;
  label: string;
  onChange?: (date: Date) => any;
  style?: StyleProp<ViewStyle>;
}) {
  //#region style
  const { size1, size2, textCenter, bold } = useStyles();
  const { rounded, roundedFull, opacity, row, justifyCenter } = useStyles();
  const { margin, padding, marginHorizontal, paddingHorizontal } = useStyles();
  const { border, borderDashed } = useStyles();
  const { label, input } = useStyles();
  //#endregion

  const { display, container } = useCusStyle();
  const [open, setOpen] = useState<boolean>(false);
  const { overlay } = Colors[useColorScheme()];

  return (
    <>
      <Pressable onPress={() => setOpen(true)}>
        <View style={[props.style]}>
          <Text style={[label]}>{props.label}</Text>
          <View style={[input, row, justifyCenter]}>
            {props.value ? (
              <Text
                style={[
                  textCenter,
                  roundedFull,
                  padding,
                  size1,
                  marginHorizontal,
                ]}
              >
                {props.value.toLocaleTimeString()}
              </Text>
            ) : (
              <Text
                style={[
                  padding,
                  textCenter,
                  borderDashed,
                  roundedFull,
                  opacity,
                ]}
              >
                {props.label}
              </Text>
            )}
          </View>
        </View>
      </Pressable>

      {open && (
        <DateTimePicker
          mode="time"
          display="default"
          minimumDate={new Date()}
          value={props.value}
          onChange={(e, d) => {
            if (!d) return;
            setOpen(false);
            props.onChange && props.onChange(d);
          }}
        ></DateTimePicker>
      )}
    </>
  );
}

function useCusStyle() {
  return StyleSheet.create({
    container: {},
    display: {
      fontSize: 20,
      textAlign: "center",
    },
  });
}
