import { Avatar, Button, Icon, Image, ListItem, Text } from "@rneui/base";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { ProfileType } from "../../store/types";
import { useStyles } from "../../style";
import { View } from "../Themed";

export default function ProfileItem(props: {
  onPress?: () => any;
  info: ProfileType;
}) {
  const { swipeContent } = useCusStyle();
  const { paddingHorizontal, marginVertical, transparent, rounded } =
    useStyles();
  return (
    // <Pressable onPress={() => props.onPress && props.onPress()}>
    <View style={[marginVertical]}>
      <ListItem.Swipeable
        rightContent={<Icon name="delete"></Icon>}
        rightStyle={[swipeContent]}
      >
        <Image
          style={[{ height: 120, width: 90 }, rounded]}
          source={{ uri: props.info.image }}
        ></Image>
        <ListItem.Content>
          <ListItem.Title>
            <Text h4 h4Style={{ fontSize: 20 }}>
              {props.info.name}
            </Text>
          </ListItem.Title>
          <ListItem.Subtitle>Ma ho so: {props.info._id}</ListItem.Subtitle>
          <ListItem.Subtitle>{props.info.address}</ListItem.Subtitle>
          <ListItem.Subtitle>{props.info.phone}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem.Swipeable>
      {/* <ListItem.ButtonGroup
        innerBorderStyle={{ width: 0 }}
        containerStyle={{ borderWidth: 0, marginLeft: 200 }}
        buttons={[
          <Button
            icon={{ name: "delete" }}
            buttonStyle={[transparent]}
          ></Button>,
          <Button icon={{ name: "menu" }} buttonStyle={[transparent]}></Button>,
          <Button icon={{ name: "edit" }} buttonStyle={[transparent]}></Button>,
        ]}
      ></ListItem.ButtonGroup> */}
    </View>
    // </Pressable>
  );
}

function useCusStyle() {
  return StyleSheet.create({
    swipeContent: {
      justifyContent: "center",
      alignItems: "center",
      width: 50,
    },
  });
}
