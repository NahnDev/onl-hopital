import { Avatar, ListItem, Overlay } from "@rneui/base";
import { DoctorType } from "../../store/types";
import { Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import DoctorDetail from "./DoctorDetail";
import { useStyles } from "../../style";

export default function DoctorItem(props: { info: DoctorType }) {
  const { shadow } = useStyles();
  return (
    <ListItem style={[shadow]}>
      <Avatar
        source={{ uri: props.info.avatar }}
        size="medium"
        rounded
      ></Avatar>
      <ListItem.Content>
        <ListItem.Title style={cusStyle.title}>
          {props.info.name}
        </ListItem.Title>
        <ListItem.Subtitle>{props.info.introduce}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

const cusStyle = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  subTitle: {
    overflow: "hidden",
  },
});
