import React, { useState } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
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
  style?: StyleProp<ViewStyle>;
}) {
  //#region style
  const { size1, size2, textCenter, bold } = useStyles();
  const { rounded, roundedFull, opacity } = useStyles();
  const { margin, padding, marginHorizontal, paddingHorizontal } = useStyles();
  const { border, borderDashed } = useStyles();
  const { label, input } = useStyles();
  //#endregion

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
        <View style={[props.style]}>
          <Text style={[label]}>{props.label}</Text>
          <View style={[input]}>
            {timePeriod ? (
              <Text style={[textCenter, roundedFull, padding, size1]}>
                {timePeriod.toString()}
              </Text>
            ) : (
              <Text
                style={[
                  textCenter,
                  borderDashed,
                  roundedFull,
                  opacity,
                  padding,
                ]}
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
