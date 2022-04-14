import { ListItem } from "@rneui/base";
import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { BookingType } from "../../store/types";
import useColorScheme from "../../hooks/useColorScheme";
import { useStyles } from "../../style";
import { Text } from "@rneui/base";
import { TIME_PERIOD } from "../../constants/TimePeriod";

export default function AppointmentItem(props: {
  info: BookingType;
  onPress?: () => any;
}) {
  const {
    padding,
    rounded,
    justifyStart,
    marginHorizontal,
    flex,
    itemCenter: alignCenter,
    itemStart: alignStart,
    textCenter,
    bold,
  } = useStyles();
  const {} = Colors[useColorScheme()];
  const { container, timeLine, contentTime, contentInfo } = useCusStyle();
  return (
    <Pressable
      onPress={() => props.onPress && props.onPress()}
      style={[container]}
    >
      <ListItem.Swipeable disabled containerStyle={[]}>
        <ListItem.Content style={[contentTime, alignCenter]}>
          <Text style={[timeLine, bold]}>
            {new Date(props.info.date).toLocaleDateString("vi-VN", {
              timeStyle: "full",
            })}
          </Text>
          <Text style={[timeLine]}>
            {TIME_PERIOD[props.info.timePeriod].toString()}
          </Text>
        </ListItem.Content>
        <ListItem.Content
          style={[
            contentInfo,
            rounded,
            { backgroundColor: `#${Math.random().toString().slice(4, 6)}f4` },
          ]}
        >
          <ListItem.Title>{props.info.profile.name}</ListItem.Title>
          {props.info.service.map((service, idx) => (
            <ListItem.Subtitle style={[marginHorizontal]} key={idx}>
              {service.name}
            </ListItem.Subtitle>
          ))}
        </ListItem.Content>
      </ListItem.Swipeable>
    </Pressable>
  );
}

function useCusStyle() {
  const colorSchema = useColorScheme();
  return StyleSheet.create({
    container: {
      // borderLeftWidth: 4,
      // borderLeftColor: "orange",
    },
    timeLine: {
      borderBottomColor: Colors[colorSchema].tint,
      // borderBottomWidth: 1,
      // textAlign: "right",
    },
    contentTime: {
      flex: 2,
    },
    contentInfo: {
      flex: 5,
    },
  });
}
