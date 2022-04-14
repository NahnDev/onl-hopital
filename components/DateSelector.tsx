import React, { useState } from "react";
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

export default function DateSelector(props: {
  value?: Date;
  label: string;
  onChange?: (date: Date) => any;
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
  const [date, setDate] = useState<Date | null | undefined>(props.value);
  const [datePickerShow, setDatePickerShow] = useState(false);
  const { overlay } = Colors[useColorScheme()];

  const handleDateChange = (e: DateTimePickerEvent, date?: Date) => {
    setDatePickerShow(false);
    if (date) setDate(date);
    if (date && props.onChange) props.onChange(date);
  };
  return (
    <>
      <Pressable onPress={() => setDatePickerShow(true)}>
        <View style={[props.style]}>
          <Text style={[label]}>{props.label}</Text>
          <View style={[input]}>
            {date ? (
              <Text style={[textCenter, roundedFull, padding, size1]}>
                {date.toLocaleDateString("vi-VN", {
                  dateStyle: "long",
                })}
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

      {datePickerShow && (
        <DateTimePicker
          testID="dateTimePicker"
          mode="date"
          is24Hour={true}
          display="default"
          value={date || new Date()}
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
