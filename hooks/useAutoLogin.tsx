import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { reLogin } from "../store/actions/auth.actions";
import { AuthState } from "../store/slices/auth.slice";

export default function useAutoLogin() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("use auto login work");
    AsyncStorage.getItem("@access_token").then((accessToken) => {
      if (accessToken) {
        dispatch(reLogin(accessToken));
      }
    });
  }, []);
}
