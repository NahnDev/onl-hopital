import { Avatar, Input, Text } from "@rneui/base";
import React from "react";
import { View, Image, ScrollView } from "react-native";
import { ProfileType } from "../../store/types";
import { useStyles } from "../../style";
import GoBack from "../GoBack";
import HistoryItem from "../history/HistoryItem";

export default function ProfileDetail(props: {
  info: ProfileType;
  onClose?: () => any;
}) {
  const {
    text_reverse,
    screen,
    header,
    content,
    justifyCenter,
    alignCenter,
    rounded,
    shadow,
    margin,
    padding,
    paddingVertical,
  } = useStyles();
  return (
    <View style={[screen]}>
      <GoBack onPress={() => props.onClose && props.onClose()}></GoBack>
      <View style={[header, { height: 120 }]}>
        <Text style={[text_reverse]} h4>
          {props.info.name}
        </Text>
      </View>
      <ScrollView style={[content]}>
        <View style={[paddingVertical]}>
          <Image
            source={{ uri: props.info.image }}
            style={[{ height: 200, width: 150 }, rounded, margin]}
          ></Image>
          <Input
            value={props.info.name}
            label="Ho va ten"
            editable={false}
          ></Input>
          <Input
            value={props.info.phone}
            label="So dien thoai"
            editable={false}
          ></Input>
          <Input
            value={props.info.address}
            label="Dia chi"
            editable={false}
          ></Input>
          <Input
            keyboardType="number-pad"
            value={(props.info.age || 18)?.toString()}
            label="Tuoi"
            editable={false}
          ></Input>
          <Input
            value={props.info.sex}
            label="Gioi tinh"
            editable={false}
          ></Input>
          <View>
            {props.info.histories.map((info, key) => {
              return <HistoryItem key={key} info={info}></HistoryItem>;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
