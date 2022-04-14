import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Text, Input, CheckBox } from "@rneui/base";
import { useStyles } from "../style";
import { Button } from "@rneui/themed";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { CreateUserDto } from "../store/types";
import * as Yup from "yup";
import { ValidationError } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { register } from "../store/actions/auth.actions";
import { UserState } from "../store/slices/user.slice";
import useAutoLogin from "../hooks/useAutoLogin";

export default function RegisterScreen() {
  //#region import style
  const { margin, padding, marginHorizontal, marginVertical } = useStyles();
  const { textCenter, textReverse } = useStyles();
  const { row, itemCenter, justifyCenter } = useStyles();
  const { screen, header, content, label, input } = useStyles();
  const { transparent } = useStyles();
  //#endregion

  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  useAutoLogin();

  const [info, setInfo] = useState<RegisterForm>(initialRegisterForm);
  const [errors, setErrors] = useState<RegisterForm>(initialRegisterForm);
  const [active, setActive] = useState<boolean>(false);
  const [doing, setDoing] = useState<boolean>(false);
  const handleChange = (v: Partial<RegisterForm>) => {
    setDoing(false);
    setInfo({ ...info, ...v });
  };
  useEffect(() => {
    registerSchema
      .validate(info, { abortEarly: false })
      .then(() => {
        setErrors(initialRegisterForm);
        setActive(true);
      })
      .catch((e: ValidationError) => {
        const errors = e.inner.reduce<{ [key: string]: string }>((pre, cur) => {
          if (!cur.path) return pre;
          pre[cur.path] = cur.message;
          return pre;
        }, {});
        setErrors(errors as RegisterForm);
        setActive(false);
      });
  }, [info]);

  const dispatch = useDispatch();
  const handleSubmit = () => {
    setDoing(true);
    const { confirmPassword, ...dto } = info;
    dispatch(register(dto));
  };

  const hasUser = useSelector<RootState, boolean>((state) => !!state.user._id);
  useEffect(() => {
    if (hasUser) navigation.navigate("Root");
  }, [hasUser]);

  return (
    <View style={[screen, { backgroundColor: Colors[colorScheme].tint }]}>
      <View style={[header, { height: 200 }]}>
        <Text h2 style={[textReverse]}>
          Đăng ký ngay!
        </Text>
      </View>
      <View style={[content, { padding: 40, flex: 0 }]}>
        <View style={[justifyCenter]}>
          <Input
            textContentType="emailAddress"
            label="Email"
            value={info.email}
            errorMessage={errors.email}
            onChangeText={(text) => handleChange({ email: text })}
            labelStyle={[label]}
            errorStyle={[marginHorizontal]}
            inputContainerStyle={[input]}
          ></Input>
          <Input
            textContentType="name"
            label="Name"
            value={info.name}
            errorMessage={errors.name}
            onChangeText={(text) => handleChange({ name: text })}
            labelStyle={[label]}
            errorStyle={[marginHorizontal]}
            inputContainerStyle={[input]}
          ></Input>
          <Input
            textContentType="password"
            secureTextEntry={true}
            label="Password"
            value={info.password}
            errorMessage={errors.password}
            onChangeText={(text) => handleChange({ password: text })}
            labelStyle={[label]}
            errorStyle={[marginHorizontal]}
            inputContainerStyle={[input]}
          ></Input>
          <Input
            textContentType="password"
            secureTextEntry={true}
            label="Confirm Password"
            value={info.confirmPassword}
            errorMessage={errors.confirmPassword}
            onChangeText={(text) => handleChange({ confirmPassword: text })}
            labelStyle={[label]}
            errorStyle={[marginHorizontal]}
            inputContainerStyle={[input]}
          ></Input>

          <Button
            title="Đăng ký"
            containerStyle={[marginVertical]}
            disabled={!active || doing}
            onPress={handleSubmit}
          ></Button>
        </View>
        <View style={[row, itemCenter, justifyCenter, padding]}>
          <Text style={[textCenter]}>Bạn chưa có tài khoản? </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: Colors[colorScheme].tint }}>
              Đăng nhập ngay!
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

type RegisterForm = CreateUserDto & { confirmPassword: string };
const initialRegisterForm: RegisterForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Day la truong bat buoc"),
  email: Yup.string()
    .email("Email khong dung")
    .required("Day la truong bat buoc"),
  password: Yup.string().required("Day la truong bat buoc"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Mat khau va xac nhan khong khop"
  ),
});
