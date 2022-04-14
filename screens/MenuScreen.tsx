import { Avatar, Button, Icon, ListItem, Text } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { useStyles } from "../style";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../store/slices/user.slice";
import { RootState } from "../store";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import useImagePicker from "../hooks/useImagePicker";
import uploadAvatar from "../store/actions/user.actions";
import { BaseUrl } from "../constants/BaseUrl";
import ImagePicker from "../components/ImagePicker";

export default function MenuScreen() {
  const {
    screen,
    header,
    content,
    itemCenter: alignCenter,
    flex,
    justifyCenter,
    transparent,
    shadow,
    text,
    textReverse: text_reverse,
    marginHorizontal,
    padding,
    marginVertical,
    roundedFull: roundFull,
    opacity,
  } = useStyles();
  const colorSchema = useColorScheme();
  const user = useSelector<RootState, UserState>((state) => state.user);

  return (
    <View style={[screen]}>
      <View style={[header, { alignItems: "stretch" }]}>
        <ListItem containerStyle={[transparent]}>
          <UserAvatar uri={user.avatar} _id={user._id}></UserAvatar>
          <ListItem.Content>
            <ListItem.Title>
              <Text h4 style={[text_reverse]}>
                {user.name}
              </Text>
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
      <ScrollView style={[content, { margin: -10 }]}>
        <View style={[marginVertical]}>
          <Button
            titleStyle={[marginHorizontal, text]}
            containerStyle={[roundFull]}
            buttonStyle={[transparent, padding, roundFull]}
            iconPosition="left"
            icon={{
              name: "lock",
              type: "font-awesome",
              color: text.color,
            }}
            title="Thay doi mat khau"
          ></Button>
        </View>
        <View style={[marginVertical]}>
          <Button
            titleStyle={[marginHorizontal]}
            containerStyle={[roundFull]}
            buttonStyle={[{ backgroundColor: "orangered" }, padding, roundFull]}
            iconPosition="right"
            icon={{
              name: "arrow-right",
              type: "font-awesome",
              color: text_reverse.color,
            }}
            title="Logout application"
          ></Button>
        </View>
      </ScrollView>
    </View>
  );
}

function UserAvatar(props: { _id: string; uri: string }) {
  const colorSchema = useColorScheme();
  const { opacity, roundedFull: roundFull } = useStyles();
  const [uri, setUri] = useState<string>(props.uri);
  const dispatch = useDispatch();
  const handleChange = (uri: string) => {
    dispatch(uploadAvatar(props._id, uri));
  };
  return (
    <ImagePicker
      defaultUri={uri}
      onChange={handleChange}
      imageStyle={[{ height: 100, width: 100 }, roundFull]}
    ></ImagePicker>
  );
}
