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

const WORK_TIME = {
  start: 8,
  end: 17,
  skip: [12],
};

function validTime(d: Date) {
  const hour = d.getHours();
  return !(
    hour < WORK_TIME.start ||
    hour >= WORK_TIME.end ||
    WORK_TIME.skip.includes(hour)
  );
}

export default function TimeSelector(props: {
  value: Date;
  error?: boolean;
  onError?: (error: string) => any;
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
  const [error, setError] = useState<boolean>(false);
  const { overlay, warning } = Colors[useColorScheme()];
  const [time, setTime] = useState(props.value);
  const handleChangeTime = (t: Date) => {
    setTime(t);
    props.onChange && props.onChange(t);
  };
  useEffect(() => {
    setError(false);
    if (!validTime(time)) setError(true);
  }, [time, props.value]);

  return (
    <>
      <Pressable onPress={() => setOpen(true)}>
        <View style={[props.style]}>
          <Text style={[label]}>{props.label}</Text>
          <View
            style={[
              input,
              row,
              justifyCenter,
              (props.error || error) && { borderColor: warning },
            ]}
          >
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
          {error && (
            <Text style={[{ color: warning }, margin]}>
              Chúng tôi làm việc từ {WORK_TIME.start} giờ đến {WORK_TIME.end}{" "}
              giờ, nghỉ giải lao vào lúc{" "}
              {WORK_TIME.skip.map((h, index) => (
                <Text style={{ color: warning }} key={index}>
                  {h} giờ,
                </Text>
              ))}{" "}
            </Text>
          )}
        </View>
      </Pressable>

      {open && (
        <DateTimePicker
          mode="time"
          display="default"
          minimumDate={new Date()}
          value={time}
          onChange={(e, d) => {
            setOpen(false);
            if (!d) return;
            handleChangeTime(d);
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
