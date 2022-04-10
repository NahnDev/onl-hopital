import { useNavigation } from "@react-navigation/native";
import { Text } from "@rneui/base";
import { Button } from "@rneui/themed";
import React, { useState } from "react";
import { TextInput, View, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import {
  BookingType,
  CreateAppointmentDto,
  DoctorType,
  ProfileType,
} from "../../store/types";
import useColorScheme from "../../hooks/useColorScheme";
import { useStyles } from "../../style";
import DateSelector from "../DateSelector";
import DoctorItem from "../doctor/DoctorItem";
import ProfileItem from "../profile/ProfileItem";
import Select from "../Select";
import TimePeriodSelector from "../TimePeriodSelector";
import GoBack from "../GoBack";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { TIME_PERIOD } from "../../constants/TimePeriod";

export default function AppointmentForm() {
  const {
    screen,
    header,
    text_reverse,
    content,
    size2: sizeNormal,
    size1,
    border,
    rounded,
    margin,
    bold,
    padding,
    justifyStart,
    alignStart,
    marginHorizontal,
    roundFull,
  } = useStyles();
  const { overlay } = Colors[useColorScheme()];
  const navigation = useNavigation();
  const [appointment, setAppointment] = useState<CreateAppointmentDto>({
    date: new Date().getTime(),
    note: "",
    profile: "2",
    doctor: "",
    timePeriod: 1,
  });
  const profiles = useSelector<RootState, ProfileType[]>((state) =>
    Object.keys(state.profiles).map((key) => state.profiles[key])
  );
  const doctors = useSelector<RootState, DoctorType[]>((state) =>
    Object.keys(state.doctors).map((key) => state.doctors[key])
  );

  const profileSelectedIndex = profiles.findIndex(
    (value) => value._id === appointment.profile
  );
  const doctorSelectedIndex = doctors.findIndex(
    (value) => value._id === appointment.profile
  );

  const handleUpdate = function (v: Partial<CreateAppointmentDto>) {
    setAppointment({ ...appointment, ...v });
  };

  return (
    <View style={[screen]}>
      <View style={[header]}>
        <GoBack></GoBack>
        <Text h4 style={[text_reverse]}>
          Dat lich kham benh
        </Text>
        <Text style={[text_reverse]}>
          Vui long dien thong tin cua ban mot cach chinh xac
        </Text>
      </View>
      <ScrollView style={[content]}>
        <View style={{ paddingBottom: 50 }}>
          <Select<ProfileType>
            selectedIndex={profileSelectedIndex}
            label="Chon ho so benh an"
            source={profiles}
            render={(item, selected) => <ProfileItem info={item}></ProfileItem>}
            onChange={(item) => {}}
          ></Select>
          <Select<DoctorType>
            selectedIndex={doctorSelectedIndex}
            label="Chon bac si"
            source={doctors}
            render={(item, selected) => <DoctorItem info={item}></DoctorItem>}
            onChange={(item) => {}}
          ></Select>

          <DateSelector
            label="Ngay kham"
            value={new Date(appointment.date)}
            onChange={(date) => handleUpdate({ date: date.getTime() })}
          ></DateSelector>
          <TimePeriodSelector
            label="Chon khung gio"
            value={TIME_PERIOD[appointment.timePeriod]}
            onChange={(time) => {
              handleUpdate({
                timePeriod: TIME_PERIOD.findIndex(
                  (value) => value.toString() === time.toString()
                ),
              });
            }}
          ></TimePeriodSelector>
          <View style={[padding]}>
            <Text style={[size1, bold]}>Ghi chu</Text>
            <TextInput
              numberOfLines={1}
              multiline={true}
              style={[border, rounded, { borderColor: overlay }, margin]}
            ></TextInput>
          </View>
          <Button
            title="Dat lich"
            buttonStyle={[padding, roundFull]}
            containerStyle={[margin]}
          ></Button>
        </View>
      </ScrollView>
    </View>
  );
}
