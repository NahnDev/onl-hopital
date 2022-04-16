import { useNavigation } from "@react-navigation/native";
import { Button, Input, Text } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { TextInput, View, ScrollView, Modal } from "react-native";
import Colors from "../../constants/Colors";
import {
  BookingType,
  CreateAppointmentDto,
  DoctorType,
  ProfileType,
  ServiceType,
} from "../../store/types";
import useColorScheme from "../../hooks/useColorScheme";
import { useStyles } from "../../style";
import DateSelector from "../DateSelector";
import DoctorItem from "../doctor/DoctorItem";
import ProfileItem from "../profile/ProfileItem";
import GoBack from "../GoBack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { loadDoctor } from "../../store/actions/doctor.actions";
import Selector from "../Selector";
import { ServiceActions } from "../../store/actions/service.actions";
import ServiceItem from "../ServiceItem";
import { ProfileState } from "../../store/slices/profile.slice";
import { DoctorState } from "../../store/slices/doctor.slice";
import { ServiceState } from "../../store/slices/service.slice";
import { PROCESS_STATUS } from "../../enum/PROCESS_ENUM";
import ModalScreen from "../../screens/ModalScreen";
import ProcessWaiting from "../ProcessWaiting";
import ProcessActions from "../../store/actions/process.actions";
import useProcess from "../../hooks/useProcess";
import AppointmentActions from "../../store/actions/appointment.actions";
import TimeSelector from "../TimeSelector";
import ProfileActions from "../../store/actions/profile.actions";
import ActionFallback from "../ActionResultUI/ActionResult";
import useNotification from "../../hooks/useNotification";

export default function AppointmentForm() {
  //#region style
  const { size1, size2, textCenter, bold, textReverse } = useStyles();
  const { rounded, roundedFull, opacity } = useStyles();
  const {
    margin,
    padding,
    marginHorizontal,
    marginVertical,
    paddingHorizontal,
  } = useStyles();
  const { border, borderDashed } = useStyles();
  const { label, input, header, content, screen, justifyStart } = useStyles();
  //#endregion

  const { overlay } = Colors[useColorScheme()];
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const profiles = useSelector<RootState, ProfileState>(
    (state) => state.profiles
  );
  const doctors = useSelector<RootState, DoctorState>((state) => state.doctors);

  const services = useSelector<RootState, ServiceState>(
    (state) => state.services
  );

  useEffect(() => {
    if (Object.keys(doctors).length === 0) dispatch(loadDoctor());
    if (Object.keys(services).length === 0) dispatch(ServiceActions.load());
    if (Object.keys(profiles).length === 0) dispatch(ProfileActions.load());
  }, []);

  useEffect(() => {
    if (Object.keys(services).length === 0) dispatch(ServiceActions.load());
    if (Object.keys(doctors).length === 0) dispatch(loadDoctor());
  }, []);

  const [appointment, setAppointment] = useState<CreateAppointmentDto>(initial);
  const { status: pStatus, reset } = useProcess("CreateAppointment");
  const { push } = useNotification();
  useEffect(() => {
    if (pStatus.status === PROCESS_STATUS.COMPLETE) {
      setTimeout(() => navigation.goBack(), 2000);
      pushNotification();
    }
    if (pStatus.status === PROCESS_STATUS.FAILURE) {
      setTimeout(() => reset(), 4000);
    }
  }, [pStatus]);

  // Handle notification -------------------------------
  const handleUpdate = function (v: Partial<CreateAppointmentDto>) {
    setAppointment({ ...appointment, ...v });
  };
  const pushNotification = () => {
    push({
      content: {
        title: "Tester: Thông báo sẽ được hiện trước 10 phút trước cuộc hẹn",
      },
      trigger: { seconds: 5 },
    });
    push({
      content: {
        title: "Bạn có một lịch hẹn khám bệnh gần đến!",
        color: "teal",
        body:
          `${new Date(appointment.time).toLocaleDateString()} ` +
          `${new Date(appointment.time).toLocaleTimeString()}`,
      },
      trigger: {
        date: Math.max(appointment.time - 10 * 60 * 1000, Date.now()),
      },
    });
  };
  const handleSubmit = () => {
    console.log(appointment);
    dispatch(AppointmentActions.create(appointment));
  };
  const handleUpdateDate = (d: Date) => {
    if (d.getTime() > Date.now()) handleUpdate({ time: d.getTime() });
  };

  return (
    <View style={[screen]}>
      <View style={[header]}>
        <GoBack></GoBack>
        <Text h4 style={[textReverse]}>
          Dat lich kham benh
        </Text>
        <Text style={[textReverse]}>
          Vui long dien thong tin cua ban mot cach chinh xac
        </Text>
      </View>
      <ScrollView style={[content]}>
        <View style={{ paddingBottom: 50 }}>
          <Selector
            defaultValue={appointment.profile ? [appointment.profile] : []}
            label="Chon ho so benh an"
            source={Object.keys(profiles).map((key) => profiles[key]._id)}
            render={(item, selected) => (
              <ProfileItem info={profiles[item]}></ProfileItem>
            )}
            onChange={(items) => {
              handleUpdate({ profile: items[0] || "" });
            }}
            style={[marginVertical]}
          ></Selector>
          <Selector
            defaultValue={[]}
            label="Chon bac si"
            source={Object.keys(doctors).map((key) => doctors[key]._id)}
            render={(item, selected) => (
              <DoctorItem info={doctors[item]}></DoctorItem>
            )}
            onChange={(items) => {
              handleUpdate({ doctor: items[0] || "" });
            }}
            style={[marginVertical]}
          ></Selector>

          <Selector
            source={Object.keys(services).map((key) => services[key]._id)}
            defaultValue={[]}
            label="Dich vu"
            multiple
            onChange={(items) => {
              handleUpdate({ services: items });
            }}
            render={(item, selected) => (
              <ServiceItem
                key={item}
                style={[selected ? { marginLeft: 10, borderLeftWidth: 2 } : {}]}
                info={services[item]}
              ></ServiceItem>
            )}
            style={[marginVertical]}
          ></Selector>

          <DateSelector
            label="Chon ngay "
            value={new Date(appointment.time)}
            onChange={(date) => {
              const d = new Date(appointment.time);
              d.setFullYear(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
              );
              handleUpdateDate(new Date(d));
            }}
            style={[marginVertical]}
          ></DateSelector>
          <TimeSelector
            label="Thoi gian"
            value={new Date(appointment.time)}
            onChange={(date) => {
              const d = new Date(appointment.time);
              d.setHours(date.getHours());
              d.setMinutes(date.getMinutes());
              handleUpdateDate(new Date(d));
            }}
            style={[marginVertical]}
          ></TimeSelector>

          {/* <DateSelector
            label="Ngay kham"
            value={new Date(appointment.datetime)}
            onChange={(date) => {
              if(new Date(date) <= )
              handleUpdate({ datetime: date.getTime() });
            }}
            style={[marginVertical]}
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
            style={[marginVertical]}
          ></TimePeriodSelector> */}
          <Input
            label="Ghi chu"
            multiline
            onChangeText={(text) => handleUpdate({ note: text })}
            labelStyle={[label]}
            inputContainerStyle={[input, { marginHorizontal: -10 }]}
            containerStyle={{ marginVertical: 10 }}
          ></Input>
          <Button
            title="Dat lich"
            buttonStyle={[padding, roundedFull]}
            onPress={handleSubmit}
          ></Button>
        </View>
      </ScrollView>
      <ProcessWaiting
        visible={pStatus.status === PROCESS_STATUS.DOING}
      ></ProcessWaiting>
      <ActionFallback
        status={pStatus.status}
        message={pStatus.message}
      ></ActionFallback>
    </View>
  );
}
const initial: CreateAppointmentDto = {
  time: new Date().getTime(),
  note: "",
  profile: "",
  doctor: "",
  services: [],
};
