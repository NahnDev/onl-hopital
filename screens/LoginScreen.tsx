import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Text, Input, CheckBox } from "@rneui/base";
import { useStyles } from "../style";
import { Button } from "@rneui/themed";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const {
    screen,
    header,
    content,
    text_reverse,
    justifyCenter,
    transparent,
    padding,
    margin,
    marginVertical,
    textCenter,
  } = useStyles();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  return (
    <View style={[screen, { backgroundColor: Colors[colorScheme].tint }]}>
      <View style={[header, { height: 300 }]}>
        <Text h2 style={[text_reverse]}>
          LOGIN
        </Text>
      </View>
      <View style={[content, { padding: 40, flex: 0 }]}>
        <View style={[justifyCenter]}>
          <Input label="Email"></Input>
          <Input secureTextEntry={true} label="Password"></Input>

          <Button title="Login" containerStyle={[marginVertical]}></Button>
        </View>
        <Text style={[textCenter, padding]}>
          Ban chua co tai khoan?{" "}
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: Colors[colorScheme].tint }}>
              DDangw ky ngay
            </Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
}
