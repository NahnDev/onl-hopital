import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { CheckBox } from "@rneui/base";
import { Text, Input, LinearProgress } from "@rneui/themed";
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
import { login, register } from "../store/actions/auth.actions";
import { UserState } from "../store/slices/user.slice";
import useAutoLogin from "../hooks/useAutoLogin";
import useProcess from "../hooks/useProcess";
import { PROCESS_STATUS } from "../enum/PROCESS_ENUM";
import ProcessWaiting from "../components/ProcessWaiting";

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

  const [info, setInfo] = useState<LoginForm>(initialLoginForm);
  const [errors, setErrors] = useState<LoginForm>(initialLoginForm);
  const [active, setActive] = useState<boolean>(false);
  const [doing, setDoing] = useState<boolean>(false);
  const handleChange = (v: Partial<LoginForm>) => {
    setDoing(false);
    setInfo({ ...info, ...v });
  };
  useEffect(() => {
    loginSchema
      .validate(info, { abortEarly: false })
      .then(() => {
        setErrors(initialLoginForm);
        setActive(true);
      })
      .catch((e: ValidationError) => {
        const errors = e.inner.reduce<{ [key: string]: string }>((pre, cur) => {
          if (!cur.path) return pre;
          pre[cur.path] = cur.message;
          return pre;
        }, {});
        setErrors(errors as LoginForm);
        setActive(false);
      });
  }, [info]);

  const dispatch = useDispatch();
  const handleSubmit = () => {
    setDoing(true);
    const { ...dto } = info;
    dispatch(login(dto));
  };

  const hasUser = useSelector<RootState, boolean>((state) => !!state.user._id);
  const { status: autoLoginStatus } = useProcess("AuthReLogin");
  useEffect(() => {
    if (hasUser) navigation.navigate("Root");
  }, [hasUser]);

  return (
    <View style={[screen, { backgroundColor: Colors[colorScheme].tint }]}>
      <View style={[header, { height: 300 }]}>
        <Text h4 style={[textReverse]}>
          Đăng nhập với tài khoản!
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
            errorStyle={[marginHorizontal]}
            labelStyle={[label]}
            inputContainerStyle={[input]}
          ></Input>
          <Input
            textContentType="password"
            secureTextEntry={true}
            label="Password"
            value={info.password}
            errorMessage={errors.password}
            onChangeText={(text) => handleChange({ password: text })}
            errorStyle={[marginHorizontal]}
            labelStyle={[label]}
            inputContainerStyle={[input]}
          ></Input>

          <Button
            title="Đăng nhập"
            containerStyle={[marginVertical, padding]}
            disabled={!active || doing}
            onPress={handleSubmit}
          ></Button>
        </View>
        <View style={[row, itemCenter, justifyCenter, padding]}>
          <Text>Bạn đã có tài khoản? </Text>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: Colors[colorScheme].tint }}>
              Đăng ký ngay!
            </Text>
          </Pressable>
        </View>
      </View>

      <ProcessWaiting visible={autoLoginStatus.status === PROCESS_STATUS.DOING}>
        <Text style={{ textAlign: "center" }}>Tự động đăng nhập</Text>
        <LinearProgress style={{ width: 300 }} color={"teal"}></LinearProgress>
      </ProcessWaiting>
    </View>
  );
}

type LoginForm = { email: string; password: string };
const initialLoginForm: LoginForm = {
  email: "",
  password: "",
};

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email khong dung")
    .required("Day la truong bat buoc"),
  password: Yup.string().required("Day la truong bat buoc"),
});
