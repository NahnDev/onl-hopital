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
    roundFull,
    alignCenter,
    text_reverse,
  } = useStyles();
  const { image, backIcon, imageBox, item } = useCusStyle();
  return (
    <View style={[screen, { margin: -10 }]}>
      <GoBack onPress={() => props.onBackdropPress()}></GoBack>
      <View style={[header, { height: 400 }, imageBox]}>
        <Image
          source={{
            uri: "https://scontent.fvca1-2.fna.fbcdn.net/v/t1.6435-9/118630033_752251945336443_2160014405435624924_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vjLRErBnQ6oAX_O933e&_nc_ht=scontent.fvca1-2.fna&oh=00_AT_oxDthzU-6-mqAL2N4r44MoXvThVNvJOZ_ppAXZhemXQ&oe=626D7EF5",
          }}
          style={[{ width: 200, height: 200 }, roundFull]}
        ></Image>

        <View style={[alignCenter]}>
          <Text h2 style={[text_reverse]}>
            {props.info.name}
          </Text>
          <Text style={[text_reverse]}>{props.info.introduce}</Text>
        </View>
      </View>

      <ScrollView style={[content, rounded]}>
        <View>
          <View style={[rounded, item, shadow, marginVertical]}>
            <View>
              <Input
                label="Email"
                editable={false}
                value={props.info.email}
              ></Input>
            </View>
            <View>
              <Input
                label="Email"
                editable={false}
                value={props.info.email}
              ></Input>
            </View>
            <View>
              <Input
                label="Email"
                editable={false}
                value={props.info.email}
              ></Input>
            </View>
          </View>
          <View style={[marginVertical, padding, rounded, item, shadow]}>
            <View>
              <Input
                label="Email"
                editable={false}
                value={props.info.email}
              ></Input>
            </View>
            <View>
              <Input
                label="Email"
                editable={false}
                value={props.info.email}
              ></Input>
            </View>
          </View>
          <View>
            <Input
              label="Email"
              editable={false}
              value={props.info.email}
            ></Input>
          </View>

          <View>
            <Input
              label="Email"
              editable={false}
              value={props.info.email}
            ></Input>
          </View>
          <View>
            <Input
              label="Email"
              editable={false}
              value={props.info.email}
            ></Input>
          </View>
          <View>
            <Input
              label="Email"
              editable={false}
              value={props.info.email}
            ></Input>
          </View>
          <View>
            <Input
              label="Email"
              editable={false}
              value={props.info.email}
            ></Input>
          </View>
          <View>
            <Input
              label="Email"
              editable={false}
              value={props.info.email}
            ></Input>
          </View>
          <View>
            <Input
              label="Email"
              editable={false}
              value={props.info.email}
            ></Input>
          </View>
          <View>
            <Input
              label="Email"
              editable={false}
              value={props.info.email}
            ></Input>
          </View>
          <View>
            <Input
              label="Email"
              editable={false}
              value={props.info.email}
            ></Input>
          </View>
          <View>
            <Input
              label="Email"
              editable={false}
              value={props.info.email}
            ></Input>
          </View>
          <View>
            <Input
              label="Email"
              editable={false}
              value={props.info.email}
            ></Input>
          </View>
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
