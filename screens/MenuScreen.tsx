import { Avatar, Button, Icon, ListItem, Text } from "@rneui/base";
import React from "react";
import { View, ScrollView } from "react-native";
import { useStyles } from "../style";
import { useSelector } from "react-redux";
import { UserState } from "../store/user";
import { RootState } from "../store";

export default function MenuScreen() {
  const {
    screen,
    header,
    content,
    alignCenter,
    flex,
    justifyCenter,
    transparent,
    shadow,
    text,
    text_reverse,
    marginHorizontal,
    padding,
    marginVertical,
    roundFull,
  } = useStyles();
  const user = useSelector<RootState, UserState>((state) => state.user);
  return (
    <View style={[screen]}>
      <View style={[header, { alignItems: "stretch" }]}>
        <ListItem containerStyle={[transparent]}>
          <Avatar rounded size="large" source={{ uri: user.avatar }}></Avatar>
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

const avatar =
  "https://scontent.fvca1-2.fna.fbcdn.net/v/t1.6435-9/118630033_752251945336443_2160014405435624924_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vjLRErBnQ6oAX_O933e&_nc_ht=scontent.fvca1-2.fna&oh=00_AT_oxDthzU-6-mqAL2N4r44MoXvThVNvJOZ_ppAXZhemXQ&oe=626D7EF5";
