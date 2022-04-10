import React, { useState } from "react";
import { Pressable, View, StyleSheet } from "react-native";
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
        <View style={[margin]}>
          <Text style={[size1, bold]}>{props.label}</Text>
          <View style={[border, margin, rounded, { borderColor: overlay }]}>
            {date ? (
              <Text style={[textCenter, roundFull, padding, size1]}>
                {date.toLocaleDateString("vi-VN", {
                  dateStyle: "long",
                })}
              </Text>
            ) : (
              <Text
                style={[padding, textCenter, borderDashed, roundFull, opacity]}
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
