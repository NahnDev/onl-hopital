import React, { useState } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Input, InputProps, Text } from "@rneui/base";
import { useStyles } from "../style";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import { TimePeriod } from "../store/types";
import { TIME_PERIOD } from "../constants/TimePeriod";

export default function DateSelector(props: {
  value?: TimePeriod;
  label: string;
  onChange?: (date: TimePeriod) => any;
}) {
  const {
    borderDashed,
    roundFull,
    textCenter,
    padding,
    margin,
    opacity,
    border,
    size1,
    bold,
    size2,
    rounded,
  } = useStyles();
  const { display, container } = useCusStyle();
  const [timePeriod, setTimePeriod] = useState<TimePeriod | null | undefined>(
    props.value
  );
  const [timePeriodPickerShow, setTimePeriodPickerShow] = useState(false);
  const { overlay } = Colors[useColorScheme()];

  const handleDateChange = (e: DateTimePickerEvent, date?: Date) => {
    setTimePeriodPickerShow(false);
    if (!date) return;
    const timePeriod = TIME_PERIOD.filter((timePeriod) =>
      timePeriod.in(date)
    )[0];
    if (timePeriod) setTimePeriod(timePeriod);
    if (timePeriod && props.onChange) props.onChange(timePeriod);
  };
  return (
    <>
      <Pressable onPress={() => setTimePeriodPickerShow(true)}>
        <View style={[margin]}>
          <Text style={[size1, bold]}>{props.label}</Text>
          <View style={[border, margin, rounded, { borderColor: overlay }]}>
            {timePeriod ? (
              <Text style={[textCenter, roundFull, padding, size1]}>
                {timePeriod.toString()}
              </Text>
            ) : (
              <Text
                style={[textCenter, borderDashed, roundFull, opacity, padding]}
              >
                {props.label}
              </Text>
            )}
          </View>
        </View>
      </Pressable>

      {timePeriodPickerShow && (
        <DateTimePicker
          testID="dateTimePicker"
          mode="time"
          is24Hour={true}
          display="default"
          value={new Date()}
          onChange={handleDateChange}
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
