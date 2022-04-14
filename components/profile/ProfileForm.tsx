import { Button, Image, Avatar, Input, Text, Icon } from "@rneui/themed";
import React, { useState } from "react";
import { View, ScrollView, Pressable } from "react-native";

import { GENDER } from "../../enum/GENDER";
import { CreateProfileDto, ProfileType } from "../../store/types";
import { useStyles } from "../../style";
import { Colors } from "../../themes/default";
import GoBack from "../GoBack";
import HistoryItem from "../history/HistoryItem";
import ImagePicker from "../ImagePicker";
import Selector from "../Selector";

export default function ProfileForm(props: { onClose?: () => any }) {
  //#region style
  const { size1, size2, textReverse, bold } = useStyles();
  const { rounded, roundedFull, opacity } = useStyles();
  const { margin, padding, paddingVertical, paddingHorizontal } = useStyles();
  const { border, borderDashed } = useStyles();
  const { label, input } = useStyles();
  const { row, itemCenter } = useStyles();
  const { screen, header, content } = useStyles();
  //#endregion

  const [profile, setProfile] = useState<CreateProfileDto>(initialProfile);
  return (
    <View style={[screen]}>
      <GoBack onPress={() => props.onClose && props.onClose()}></GoBack>
      <View style={[header, { height: 120 }]}>
        <Text style={[textReverse]} h4>
          {profile.name}
        </Text>
      </View>
      <ScrollView style={[content]}>
        <View style={[paddingVertical, { marginBottom: 400 }]}>
          <ImagePicker
            defaultUri={profile.image}
            aspect={[3, 4]}
            imageStyle={{ height: 200, width: 150 }}
          ></ImagePicker>
          <Input
            inputContainerStyle={[input]}
            labelStyle={[label]}
            value={profile.name}
            label="Ho va ten"
          ></Input>
          <Input
            keyboardType="phone-pad"
            inputContainerStyle={[input]}
            labelStyle={[label]}
            value={profile.phone}
            label="So dien thoai"
          ></Input>
          <Input
            inputContainerStyle={[input]}
            labelStyle={[label]}
            value={profile.address}
            label="Dia chi"
          ></Input>
          <View style={[row]}>
            <View style={{ flex: 1 }}>
              <Input
                inputContainerStyle={[input]}
                labelStyle={[label]}
                keyboardType="number-pad"
                value={(profile.age || 18)?.toString()}
                label="Tuoi"
              ></Input>
            </View>
            <View style={[{ flex: 1 }]}>
              <Selector
                defaultValue={[GENDER.MALE]}
                source={[GENDER.MALE, GENDER.FEMALE]}
                label="Gioi tinh"
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
          <Button title={"Tao ho so"}></Button>
        </View>
      </ScrollView>
    </View>
  );
}

const initialProfile: CreateProfileDto = {
  name: "",
  address: "",
  age: 18,
  phone: "",
  sex: GENDER.MALE,
  image: "",
};
