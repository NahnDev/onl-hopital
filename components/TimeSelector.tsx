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
import Selector from "./Selector";
import { valid } from "joi";

const WORK_TIME: { start: number; end: number; skip: number[] } = {
  start: 9,
  end: 19,
  skip: [],
};

function validTime(t: number) {
  const hour = t;
  return !(
    hour < WORK_TIME.start ||
    hour >= WORK_TIME.end ||
    WORK_TIME.skip.includes(hour)
  );
}

export default function TimeSelector(props: {
  value?: number;
  error?: boolean;
  inValid: number[];
  onError?: (error: string) => any;
  label: string;
  onChange?: (time: number) => any;
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
  const [error, setError] = useState<boolean>(false);
  const { overlay, warning, background, text } = Colors[useColorScheme()];
  const [time, setTime] = useState(props.value);
  const handleChangeTime = (t: number) => {
    setTime(t);
    props.onChange && props.onChange(t);
  };
  useEffect(() => {
    setError(false);
    if (time && !validTime(time)) setError(true);
  }, [time, props.value]);

  return (
    <Selector
      label="Thoi gian"
      source={[9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
      onChange={(items) => {
        handleChangeTime(items[0]);
      }}
      disableItems={props.inValid}
      render={(item, selected) => (
        <View
          style={[
            padding,
            margin,
            roundedFull,

            {
              opacity: props.inValid.includes(item) ? 0.5 : 1,
              backgroundColor: props.inValid.includes(item)
                ? "#888"
                : selected
                ? "#088"
                : "#888",
            },
          ]}
        >
          <Text
            style={[textCenter, bold, size1, { color: background }]}
          >{`${item}:00 - ${item + 1}:00`}</Text>
        </View>
      )}
    ></Selector>
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
