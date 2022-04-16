import { StyleSheet, View, ScrollView } from "react-native";
import { ListItem, Text } from "@rneui/base";
import EditScreenInfo from "../components/EditScreenInfo";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { useStyles } from "../style";
import { RootTabScreenProps } from "../types";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Notification } from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Button, Platform } from "react-native";
import { Subscription } from "expo-modules-core";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const colorSchema = useColorScheme();
  const {
    screen,
    textReverse: text_reverse,
    justifyCenter,
    textCenter,
    opacity,
    header,
    content,
    item,
    margin,
    marginVertical,
  } = useStyles();
  return (
    <View
      style={[
        screen,
        justifyCenter,
        { backgroundColor: Colors[colorSchema].tint },
      ]}
    >
      <View style={[header, { height: 600 }]}>
        <Text h2 style={[text_reverse, textCenter]}>
          Good day!
        </Text>
        <Text style={[text_reverse, textCenter]}>
          Ứng dụng đặt lịch khám bệnh của phòng khám nha khoa
        </Text>
        <View style={[, opacity, { margin: 20 }]}>
          <Text style={[text_reverse, textCenter]}>
            Đây chỉ là bản dựng phụ vụ cho đồ án học tập, không có ý nghĩa sử
            dụng. Một số dữ liệu để chạy bản thử nghiệm được lấy từ website của
            Nha khoa Viễn Đông Cần Thơ.
          </Text>
        </View>
      </View>
    </View>
  );
}
