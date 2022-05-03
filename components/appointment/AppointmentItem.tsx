import { ListItem } from "@rneui/base";
import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { BookingType } from "../../store/types";
import useColorScheme from "../../hooks/useColorScheme";
import { useStyles } from "../../style";
import { Text } from "@rneui/base";

export default function AppointmentItem(props: { info: BookingType }) {
  const { padding, marginHorizontal } = useStyles();
  const { rounded } = useStyles();
  const { flex, justifyCenter, justifyStart, itemCenter, itemStart } =
    useStyles();
  const { textCenter, bold } = useStyles();
  const {} = Colors[useColorScheme()];
  const { container, timeLine, contentTime, contentInfo } = useCusStyle();
  console.log("===============");
  return (
    <ListItem.Swipeable disabled containerStyle={[]}>
      <ListItem.Content style={[contentTime, itemCenter]}>
        <Text style={[timeLine, bold]}>
          {`${props.info.time}:00 - ${props.info.time + 1}:00`}
        </Text>
        <Text style={[timeLine, bold, { fontSize: 18 }]}>
          {new Date(props.info.date).toLocaleDateString("vi-VN", {
            timeStyle: "full",
          })}
        </Text>
      </ListItem.Content>
      <ListItem.Content
        style={[
          contentInfo,
          rounded,
          { backgroundColor: `#${Math.random().toString().slice(4, 6)}f2` },
        ]}
      >
        <ListItem.Title style={[bold]}>
          {props.info.profile.name}
        </ListItem.Title>
        {props.info.services.map((service, idx) => (
          <ListItem.Subtitle style={[marginHorizontal]} key={idx}>
            {service.name}
          </ListItem.Subtitle>
        ))}
      </ListItem.Content>
    </ListItem.Swipeable>
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
