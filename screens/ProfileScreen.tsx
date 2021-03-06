import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Modal, ScrollView } from "react-native";
import { useStyles } from "../style";
import {
  Icon,
  ListItem,
  Text,
  Button,
  ButtonGroup,
  BottomSheet,
  Overlay,
} from "@rneui/base";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import ProfileItem from "../components/profile/ProfileItem";
import { ProfileType } from "../store/types";
import ProfileDetail from "../components/profile/ProfileDetail";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import ProfileForm from "../components/profile/ProfileForm";
import ProfileActions from "../store/actions/profile.actions";

export default function ProfileScreen() {
  const { screen, transparent, header, content } = useStyles();
  const { button } = useCusStyle();
  const colorSchema = useColorScheme();

  const profiles = useSelector<RootState, ProfileType[]>((state) =>
    Object.keys(state.profiles).map((key) => state.profiles[key])
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ProfileActions.load());
  }, []);

  const [focusItem, setFocusItem] = useState<ProfileType | null>(null);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const handleCreate = () => {
    setFormVisible(true);
  };
  return (
    <View style={screen}>
      <View style={[header]}>
        <Text h4 style={{ color: Colors[colorSchema].background }}>
          Hồ sơ bệnh án của bạn
        </Text>
        <View style={{ alignSelf: "flex-end" }}>
          <Button
            icon={{
              name: "add",
              // type: "font-awesome",
              color: Colors[colorSchema].background,
            }}
            buttonStyle={{
              backgroundColor: "transparent",
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            containerStyle={{ borderRadius: 100 }}
            title="Thêm hồ sơ mới"
            onPress={handleCreate}
          ></Button>
        </View>
      </View>

      <ScrollView style={[content]}>
        {profiles.map((info) => (
          <Pressable onPress={() => setFocusItem(info)} key={info._id}>
            <ProfileItem info={info}></ProfileItem>
          </Pressable>
        ))}
      </ScrollView>
      <Modal visible={!!focusItem} statusBarTranslucent animationType="slide">
        {focusItem && (
          <ProfileDetail
            info={focusItem}
            onClose={() => setFocusItem(null)}
          ></ProfileDetail>
        )}
      </Modal>
      <Modal visible={formVisible} statusBarTranslucent animationType="slide">
        {formVisible && (
          <ProfileForm onClose={() => setFormVisible(false)}></ProfileForm>
        )}
      </Modal>
    </View>
  );
}

function useCusStyle() {
  return StyleSheet.create({
    button: {
      backfaceVisibility: "hidden",
      alignContent: "flex-end",
    },
  });
}
