import {
  Avatar,
  BottomSheet,
  ButtonGroup,
  ListItem,
  Button,
} from "@rneui/base";
import { useAssets } from "expo-asset";
import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { useStyles } from "../style";

export default function WelcomeScreen() {
  const { screen, button, roundedFull: roundFull } = useStyles();
  const [visible, setVisible] = useState(false);
  const colorSchema = useColorScheme();

  return (
    <View
      style={[
        screen,
        {
          backgroundColor: Colors[colorSchema].tint,
          justifyContent: "space-between",
          paddingVertical: 100,
        },
      ]}
    >
      <Text>Start with us</Text>
      <Button
        title="Get start"
        style={[button]}
        buttonStyle={[
          roundFull,
          { backgroundColor: Colors[colorSchema].background, padding: 15 },
        ]}
        titleStyle={{ color: Colors[colorSchema].tint }}
      ></Button>
    </View>
  );
}
