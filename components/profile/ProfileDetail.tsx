import { ButtonGroup } from "@rneui/base";
import { Avatar, Button, Icon, Input, Text } from "@rneui/themed";
import React from "react";
import { View, Image, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import { GENDER } from "../../enum/GENDER";
import useColorScheme from "../../hooks/useColorScheme";
import { ProfileType } from "../../store/types";
import { useStyles } from "../../style";
import GoBack from "../GoBack";
import HistoryItem from "../history/HistoryItem";
import ImagePicker from "../ImagePicker";
import Selector from "../Selector";

export default function ProfileDetail(props: {
  info: ProfileType;
  onClose?: () => any;
}) {
  //#region style
  const { size1, size2, textReverse, bold } = useStyles();
  const { rounded, roundedFull, opacity } = useStyles();
  const { margin, padding, paddingVertical, paddingHorizontal } = useStyles();
  const { border, borderDashed } = useStyles();
  const { label, input } = useStyles();
  const { row, itemCenter, justifyCenter } = useStyles();
  const { screen, header, content } = useStyles();
  //#endregion
  const colorSchema = useColorScheme();
  const { background, warning } = Colors[colorSchema];

  return (
    <View style={[screen]}>
      <GoBack onPress={() => props.onClose && props.onClose()}></GoBack>
      <View style={[header, { height: 120 }]}>
        <Text style={[textReverse]} h4>
          {props.info.name}
        </Text>
      </View>
      <ScrollView style={[content]}>
        <View style={[paddingVertical, { marginBottom: 400 }]}>
          <ImagePicker
            disable
            defaultUri={props.info.image}
            aspect={[3, 4]}
            imageStyle={{ height: 200, width: 150 }}
          ></ImagePicker>
          <Input
            inputContainerStyle={[input]}
            labelStyle={[label]}
            value={props.info.name}
            label="Ho va ten"
            editable={false}
          ></Input>
          <Input
            keyboardType="phone-pad"
            inputContainerStyle={[input]}
            labelStyle={[label]}
            value={props.info.phone}
            label="So dien thoai"
            editable={false}
          ></Input>
          <Input
            inputContainerStyle={[input]}
            labelStyle={[label]}
            value={props.info.address}
            label="Dia chi"
            editable={false}
          ></Input>
          <View style={[row]}>
            <View style={{ flex: 1 }}>
              <Input
                inputContainerStyle={[input]}
                labelStyle={[label]}
                keyboardType="number-pad"
                value={(props.info.age || 18)?.toString()}
                label="Tuoi"
                editable={false}
              ></Input>
            </View>
            <View style={[{ flex: 1 }]}>
              <Selector
                defaultValue={[props.info.sex]}
                source={[GENDER.MALE, GENDER.FEMALE]}
                label="Gioi tinh"
                disable
                onChange={(item) => {}}
                valueStyle={{ margin: 0, padding: 0 }}
                render={(item, selected, props) => (
                  <View
                    key={item}
                    style={[padding, margin, row, itemCenter, props?.style]}
                  >
                    <Icon
                      name={item === GENDER.MALE ? "male" : "female"}
                      type="font-awesome"
                    ></Icon>
                    <Text style={[margin]}>{item}</Text>
                  </View>
                )}
              ></Selector>
            </View>
          </View>
          <View style={[row, justifyCenter]}>
            <Button
              buttonStyle={[rounded, margin]}
              title={"Chinh sua"}
              icon={{ name: "edit", color: background }}
            ></Button>
            <Button
              buttonStyle={[rounded, margin, { backgroundColor: warning }]}
              title={"Xoa ho so"}
              icon={{ name: "delete", color: background }}
            ></Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
