import { StyleSheet, ScrollView, View, Pressable } from "react-native";
import DoctorItem from "../components/doctor/DoctorItem";

import EditScreenInfo from "../components/EditScreenInfo";
import { BottomSheet, Input, Overlay, Text } from "@rneui/base";
import { DoctorType } from "../store/types";
import { useStyles } from "../style";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import DoctorDetail from "../components/doctor/DoctorDetail";
import { useState } from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";

export default function DoctorScreen() {
  const { search, content } = useCusStyle();
  const { screen, rounded, margin, shadow, header } = useStyles();
  const [doctorSelected, setDoctorSelected] = useState<DoctorType | null>(null);
  const lightColor = Colors[useColorScheme()].background;
  const doctors = useSelector<RootState, DoctorType[]>((state) =>
    Object.keys(state.doctors).map((key) => state.doctors[key])
  );
  const handleBackdropPress = () => {};

  return (
    <View style={[screen]}>
      <View style={[header, { height: 220 }]}>
        <Text h4 style={{ color: lightColor }}>
          Đội ngũ của chúng tôi
        </Text>
        <Text style={{ color: lightColor }}>
          {" "}
          Tận tâm, ân cần và chuyên nghiệp.
        </Text>
        <Input
          placeholder="search ..."
          rightIcon={{ name: "search" }}
          inputContainerStyle={[search]}
        ></Input>
      </View>
      <ScrollView style={[content, rounded, shadow]}>
        {doctors.map((info) => (
          <Pressable onPress={() => setDoctorSelected(info)} key={info._id}>
            <DoctorItem info={info}></DoctorItem>
          </Pressable>
        ))}
      </ScrollView>
      <Overlay
        isVisible={!!doctorSelected}
        onDismiss={() => setDoctorSelected(null)}
        fullScreen
        statusBarTranslucent
        animationType="slide"
        overlayStyle={{ borderWidth: 0 }}
      >
        {doctorSelected && (
          <DoctorDetail
            onBackdropPress={() => {
              setDoctorSelected(null);
            }}
            info={doctorSelected}
          ></DoctorDetail>
        )}
      </Overlay>
    </View>
  );
}

function useCusStyle() {
  const colorSchema = useColorScheme();
  return StyleSheet.create({
    container: {
      // backgroundColor: Colors[colorSchema].screenBackground,
    },

    content: {
      marginTop: -20,
      backgroundColor: Colors[colorSchema].background,
    },

    search: {
      borderRadius: 100,
      paddingHorizontal: 10,
      marginHorizontal: 25,
      backgroundColor: Colors[colorSchema].overlay,
      opacity: 0.6,
      marginTop: 10,
      borderBottomWidth: 0,
    },
  });
}
