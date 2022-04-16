import { ButtonGroup } from "@rneui/base";
import { Avatar, Button, Icon, Input, Text } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { GENDER } from "../../enum/GENDER";
import { PROCESS_STATUS } from "../../enum/PROCESS_ENUM";
import useColorScheme from "../../hooks/useColorScheme";
import useProcess from "../../hooks/useProcess";
import ProfileActions from "../../store/actions/profile.actions";
import {
  CreateProfileDto,
  ProfileType,
  UpdateProfileDto,
} from "../../store/types";
import { useStyles } from "../../style";
import ActionFallback from "../ActionResultUI/ActionResult";
import GoBack from "../GoBack";
import HistoryItem from "../history/HistoryItem";
import ImagePicker from "../ImagePicker";
import Selector from "../Selector";

const DtoKeyList: (keyof UpdateProfileDto)[] = [
  "sex",
  "address",
  "age",
  "image",
  "name",
  "phone",
];

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

  const [mode, setMode] = useState<"edit" | "view">("view");
  const [profile, setProfile] = useState<UpdateProfileDto>(
    DtoKeyList.reduce<UpdateProfileDto>(
      (dto, key) => ({ ...dto, [key]: props.info[key] }),
      {} as UpdateProfileDto
    )
  );

  const { status: pStatus, reset } = useProcess("UpdateProfile");
  useEffect(() => {
    if (pStatus.status === PROCESS_STATUS.COMPLETE) {
      setTimeout(() => {
        reset();
        setMode("view");
      }, 2000);
    }
    if (pStatus.status === PROCESS_STATUS.FAILURE) {
      setTimeout(() => reset(), 5000);
    }
  }, [pStatus]);

  //#region  handle
  const dispatch = useDispatch();
  const handleUpdateProfile = () => {
    dispatch(ProfileActions.update(props.info._id, profile));
  };
  const handleChange = (v: Partial<UpdateProfileDto>) => {
    setProfile({ ...profile, ...v });
  };
  //#endregion

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
            disable={mode === "view"}
            defaultUri={profile.image}
            aspect={[3, 4]}
            imageStyle={{ height: 200, width: 150 }}
          ></ImagePicker>
          <Input
            inputContainerStyle={[input]}
            labelStyle={[label]}
            value={profile.name}
            label="Ho va ten"
            onChangeText={(text) => handleChange({ name: text })}
            editable={mode === "edit"}
          ></Input>
          <Input
            keyboardType="phone-pad"
            inputContainerStyle={[input]}
            labelStyle={[label]}
            value={profile.phone}
            label="So dien thoai"
            onChangeText={(text) => handleChange({ phone: text })}
            editable={mode === "edit"}
          ></Input>
          <Input
            inputContainerStyle={[input]}
            labelStyle={[label]}
            value={profile.address}
            label="Dia chi"
            onChangeText={(text) => handleChange({ address: text })}
            editable={mode === "edit"}
          ></Input>
          <View style={[row]}>
            <View style={{ flex: 1 }}>
              <Input
                inputContainerStyle={[input]}
                labelStyle={[label]}
                keyboardType="number-pad"
                value={(profile.age || "").toString()}
                label="Tuoi"
                onChangeText={(text) => {
                  const age = Math.min(100, Math.floor(Number(text)));
                  handleChange({ age });
                }}
                editable={mode === "edit"}
              ></Input>
            </View>
            <View style={[{ flex: 1 }]}>
              <Selector
                defaultValue={[profile.sex]}
                source={[GENDER.MALE, GENDER.FEMALE]}
                label="Gioi tinh"
                disable={mode === "view"}
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
          <View style={[row, justifyCenter]}>
            {mode === "view" ? (
              <Button
                buttonStyle={[rounded, margin]}
                title={"Chinh sua"}
                onPress={() => setMode("edit")}
                icon={{ name: "edit", color: background }}
              ></Button>
            ) : (
              <Button
                buttonStyle={[rounded, margin, { backgroundColor: "green" }]}
                title={"Cap nhat"}
                icon={{ name: "update", color: background }}
                onPress={handleUpdateProfile}
              ></Button>
            )}
          </View>
        </View>
      </ScrollView>
      <ActionFallback
        status={pStatus.status}
        message={pStatus.message}
      ></ActionFallback>
    </View>
  );
}
