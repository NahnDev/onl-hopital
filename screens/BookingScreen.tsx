import React from "react";
import { View, ScrollView } from "react-native";
import { Text, BottomSheet } from "@rneui/base";
import DateSelector from "../components/DateSelector";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { useStyles } from "../style";
import AppointmentItem from "../components/appointment/AppointmentItem";
import { BookingType } from "../store/types";
import AppointmentForm from "../components/appointment/AppointmentForm";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { AppointmentState } from "../store/slices/appointment.slice";
import { ButtonGroup, ThemeProvider, Button } from "@rneui/themed";
import { defaultTheme } from "../themes/default";

export default function BookingScreen() {
  const { screen, header, content } = useStyles();
  const { background } = Colors[useColorScheme()];
  const appointments = useSelector<RootState, BookingType[]>((state) =>
    Object.keys(state.appointments)
      .map((key) => state.appointments[key])
      .sort((a, b) => a.date + a.timePeriod - b.date - b.timePeriod)
  );
  const navigation = useNavigation();
  return (
    <View style={[screen]}>
      <View style={[header]}>
        <Text h4 style={{ color: background }}>
          Lịch khám bệnh của bạn
        </Text>
        <View style={{ alignSelf: "flex-end" }}>
          <Button
            onPress={() => navigation.navigate("BookingModal")}
            icon={{
              name: "add",
              // type: "font-awesome",
              color: background,
            }}
            buttonStyle={{
              backgroundColor: "transparent",
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            containerStyle={{ borderRadius: 100 }}
            title="Hẹn lịch mới"
          ></Button>
        </View>
      </View>
      <ScrollView style={[content]}>
        {appointments.map((appointment) => (
          <AppointmentItem
            info={appointment}
            key={appointment._id}
          ></AppointmentItem>
        ))}
      </ScrollView>
    </View>
  );
}
