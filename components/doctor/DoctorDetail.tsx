import React from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import {
  Button,
  Icon,
  Text,
  Image,
  BackgroundImage,
  Input,
  color,
  ListItem,
} from "@rneui/base";
import { DoctorType } from "../../store/types";
import { useStyles } from "../../style";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import DoctorItem from "./DoctorItem";
import GoBack from "../GoBack";

export default function DoctorDetail(props: {
  info: DoctorType;
  onBackdropPress: () => any;
}) {
  const {
    screen,
    rounded,
    margin,
    padding,
    marginVertical,
    shadow,
    header,
    content,
    roundedFull: roundFull,
    itemCenter: alignCenter,
    textReverse: text_reverse,
    textCenter,
    justifyCenter,
    column,
    row,
    justifyStart,
    itemStart: alignStart,
  } = useStyles();
  const { image, backIcon, imageBox, item } = useCusStyle();
  return (
    <View style={[screen, { margin: -10 }]}>
      <GoBack onPress={() => props.onBackdropPress()}></GoBack>
      <View style={[header, { height: 400 }, imageBox]}>
        <Image
          source={{
            uri: props.info.avatar,
          }}
          style={[{ width: 200, height: 200 }, roundFull]}
        ></Image>

        <View style={[alignCenter, justifyCenter, margin, padding]}>
          <Text h3 style={[text_reverse]}>
            {props.info.name}
          </Text>
          <Text style={[text_reverse, textCenter]}>{props.info.introduce}</Text>
        </View>
      </View>

      <ScrollView style={[content, rounded, padding]}>
        <View style={{ margin: 20 }}>
          <ListItem containerStyle={[margin, padding, column, alignStart]}>
            <View style={[row, alignCenter]}>
              <Icon name="phone"></Icon>
              <Text style={[margin]}>{props.info.phone} </Text>
            </View>
            <View style={[row, alignCenter]}>
              <Icon name="mail"></Icon>
              <Text style={[margin]}>{props.info.email} </Text>
            </View>
          </ListItem>
        </View>
        <View>
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>
                <Text h4>Thông tin chuyên môn</Text>
              </ListItem.Title>
              {props.info.info &&
                props.info.info.map((content, idx) => (
                  <ListItem.Subtitle key={idx} style={{ margin: 5 }}>
                    {content}
                  </ListItem.Subtitle>
                ))}
            </ListItem.Content>
          </ListItem>
        </View>
        <View>
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>
                <Text h4>Education</Text>
              </ListItem.Title>
              {props.info.education &&
                props.info.education.map((content, idx) => (
                  <ListItem.Subtitle key={idx} style={{ margin: 5 }}>
                    {content}
                  </ListItem.Subtitle>
                ))}
            </ListItem.Content>
          </ListItem>
        </View>
      </ScrollView>
    </View>
  );
}

function useCusStyle() {
  const colorSchema = useColorScheme();
  return StyleSheet.create({
    backIcon: {
      color: Colors[colorSchema].overlay,
      opacity: 0.8,
      height: 40,
      alignItems: "flex-start",
      zIndex: 10,
    },
    image: {
      overflow: "hidden",
      width: "100%",
      height: 600,
    },
    imageBox: {
      // position: "absolute",
      width: "110%",
      alignSelf: "flex-end",
    },

    item: {
      backgroundColor: Colors[colorSchema].background,
      marginHorizontal: -10,
    },
  });
}
