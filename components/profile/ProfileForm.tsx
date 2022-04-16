import {
  Button,
  Image,
  Avatar,
  Input,
  Text,
  Icon,
  LinearProgress,
} from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View, ScrollView, Pressable, Modal } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../../constants/Colors";

import { GENDER } from "../../enum/GENDER";
import { PROCESS_STATUS } from "../../enum/PROCESS_ENUM";
import useColorScheme from "../../hooks/useColorScheme";
import useProcess from "../../hooks/useProcess";
import ProfileActions from "../../store/actions/profile.actions";
import { CreateProfileDto, ProfileType } from "../../store/types";
import { useStyles } from "../../style";
import ActionCompleted from "../ActionResultUI/ActionCompleted";
import ActionFailure from "../ActionResultUI/ActionFailure";
import ActionFallback from "../ActionResultUI/ActionResult";
import Dialog from "../Dialog";
import GoBack from "../GoBack";
import HistoryItem from "../history/HistoryItem";
import ImagePicker from "../ImagePicker";
import ProcessWaiting from "../ProcessWaiting";
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
  const { tint, warning } = Colors[useColorScheme()];
  //#endregion

  const [profile, setProfile] = useState<CreateProfileDto>(initialProfile);

  const { status: pStatus, reset } = useProcess("CreateProfile");
  //#region  handle
  const dispatch = useDispatch();
  const handleCreateProfile = function () {
    dispatch(ProfileActions.create(profile));
  };
  const handleChange = (v: Partial<CreateProfileDto>) => {
    setProfile({ ...profile, ...v });
  };
  //#endregion

  useEffect(() => {
    console.log(pStatus.status);
    if (pStatus.status === PROCESS_STATUS.COMPLETE) {
      setTimeout(() => props.onClose && props.onClose(), 2000);
    }
    if (pStatus.status === PROCESS_STATUS.FAILURE) {
      setTimeout(() => reset(), 5000);
    }
  }, [pStatus]);

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
            onChange={(uri) => handleChange({ image: uri })}
          ></ImagePicker>
          <Input
            inputContainerStyle={[input]}
            labelStyle={[label]}
            value={profile.name}
            onChangeText={(text) => handleChange({ name: text })}
            label="Ho va ten"
          ></Input>
          <Input
            keyboardType="phone-pad"
            inputContainerStyle={[input]}
            labelStyle={[label]}
            value={profile.phone}
            onChangeText={(text) => handleChange({ phone: text })}
            label="So dien thoai"
          ></Input>
          <Input
            inputContainerStyle={[input]}
            labelStyle={[label]}
            value={profile.address}
            onChangeText={(text) => handleChange({ address: text })}
            label="Dia chi"
          ></Input>
          <View style={[row]}>
            <View style={{ flex: 1 }}>
              <Input
                inputContainerStyle={[input]}
                labelStyle={[label]}
                keyboardType="number-pad"
                value={(profile.age || "").toString()}
                onChangeText={(text) => {
                  const age = Math.min(100, Math.floor(Number(text) || 0));
                  handleChange({ age });
                }}
                label="Tuoi"
              ></Input>
            </View>
            <View style={[{ flex: 1 }]}>
              <Selector
                defaultValue={[GENDER.MALE]}
                source={[GENDER.MALE, GENDER.FEMALE]}
                label="Gioi tinh"
                onChange={(item) => {
                  handleChange({ sex: item[0] || GENDER.MALE });
                }}
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
          <Button
            disabled={pStatus.status !== PROCESS_STATUS.WAIT}
            title={"Tao ho so"}
            onPress={handleCreateProfile}
          ></Button>
        </View>
      </ScrollView>
      <ActionFallback
        status={pStatus.status}
        message={pStatus.message}
      ></ActionFallback>
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
