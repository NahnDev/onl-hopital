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
import DoctorItem from "../doctor/DoctorItem";
import ProfileItem from "../profile/ProfileItem";
import GoBack from "../GoBack";
import { useDispatch, useSelector } from "react-redux";
import { PROCESS_STATUS } from "../../enum/PROCESS_ENUM";
import ProcessWaiting from "../ProcessWaiting";
import useProcess from "../../hooks/useProcess";
import ActionFallback from "../ActionResultUI/ActionResult";
import ServiceItem from "../ServiceItem";
import QRCode from "react-native-qrcode-svg";
import AppointmentActions from "../../store/actions/appointment.actions";

export default function AppointmentDetail(props: {
  info: BookingType;
  onClose?: () => any;
}) {
  //#region style
  const { row, textReverse, size1, bold } = useStyles();
  const { roundedFull, opacity } = useStyles();
  const { margin, marginHorizontal, marginVertical } = useStyles();
  const { padding, paddingHorizontal } = useStyles();
  const { justifyCenter, justifyStart, flex, column, itemCenter } = useStyles();
  const { label, input, header, content, screen } = useStyles();
  //#endregion

  const { overlay } = Colors[useColorScheme()];
  const navigation = useNavigation();
  const { info: appointment } = props;

  const { status: pStatus, reset } = useProcess("CancelAppointment");
  useEffect(() => {
    if (pStatus.status === PROCESS_STATUS.COMPLETE) {
      setTimeout(() => props.onClose && props.onClose(), 2000);
    }
    if (pStatus.status === PROCESS_STATUS.FAILURE) {
      setTimeout(() => reset(), 4000);
    }
  }, [pStatus]);

  const dispatch = useDispatch();
  const handleCancel = function () {
    dispatch(AppointmentActions.cancel(appointment._id));
  };
  console.log(pStatus.status)
  return (
    <View style={[screen]}>
      <View style={[header]}>
        <GoBack onPress={props.onClose}></GoBack>
        <Text h4>Thời gian</Text>
        <View style={[row]}>
          <Text h4 style={[bold, margin]}>
            {`${props.info.time}:00 - ${props.info.time + 1}:00`}
          </Text>
          <Text h4 style={[bold, margin]}>
            {new Date(props.info.date).toLocaleDateString("vi-VN", {
              timeStyle: "full",
            })}
          </Text>
        </View>
      </View>
      <ScrollView style={[content]}>
        <View style={[justifyCenter, column, itemCenter, margin]}>
          <QRCode value={appointment._id} size={200} />
          <Text style={[size1, bold, margin]}> {appointment._id}</Text>
        </View>
        <View style={{ paddingBottom: 50 }}>
          <View style={[marginVertical]}>
            <Text style={[label]}>Hồ sơ</Text>
            <View style={[input]}>
              <ProfileItem info={appointment.profile}></ProfileItem>
            </View>
          </View>
          <View style={[marginVertical]}>
            <Text style={[label]}>Bác sĩ</Text>
            <View style={[input]}>
              <DoctorItem info={appointment.doctor}></DoctorItem>
            </View>
          </View>
          <View style={[marginVertical]}>
            <Text style={[label]}>Dịch vụ</Text>
            <View style={[input]}>
              {appointment.services.map((service, index) => (
                <ServiceItem key={index} info={service}></ServiceItem>
              ))}
            </View>
          </View>

          <Input
            label="Ghi chu"
            multiline
            labelStyle={[label]}
            inputContainerStyle={[input, { marginHorizontal: -10 }]}
            containerStyle={{ marginVertical: 10 }}
            value={appointment.note}
            editable={false}
          ></Input>
          <Button
            title="Hủy lịch"
            buttonStyle={[padding, roundedFull, { backgroundColor: "red" }]}
            onPress={handleCancel}
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
  date: new Date().getTime(),
  time: 9,
  note: "",
  profile: "",
  doctor: "",
  services: [],
};
