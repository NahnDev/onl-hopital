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
import useNotification from "../hooks/useNotification";

export default function MenuScreen() {
  const { marginHorizontal, padding, marginVertical } = useStyles();
  const { screen, header, content } = useStyles();
  const { itemCenter, flex, justifyCenter } = useStyles();
  const { transparent, opacity, shadow, roundedFull, rounded } = useStyles();
  const { text, textReverse } = useStyles();
  const colorSchema = useColorScheme();
  const { background } = Colors[colorSchema];

  const user = useSelector<RootState, UserState>((state) => state.user);
  return (
    <View style={[screen]}>
      <View style={[header, { alignItems: "stretch" }]}>
        <ListItem containerStyle={[transparent]}>
          <UserAvatar uri={user.avatar} _id={user._id}></UserAvatar>
          <ListItem.Content>
            <ListItem.Title>
              <Text h4 style={[textReverse]}>
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
            containerStyle={[roundedFull]}
            buttonStyle={[transparent, padding, roundedFull]}
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
            containerStyle={[roundedFull]}
            buttonStyle={[
              { backgroundColor: "orangered" },
              padding,
              roundedFull,
            ]}
            iconPosition="right"
            icon={{
              name: "arrow-right",
              type: "font-awesome",
              color: background,
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
