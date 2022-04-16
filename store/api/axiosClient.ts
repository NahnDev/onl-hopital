import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosRequestHeaders } from "axios";
import store from "..";
import { BaseUrl } from "../../constants/BaseUrl";
import { wait, complete } from "../slices/load.slice";

export const axiosClient = axios.create({
  baseURL: BaseUrl,
});

axiosClient.interceptors.request.use(async (config) => {
  console.log("Call api");

  store.dispatch(wait());
  const accessToken = await AsyncStorage.getItem("@access_token");
  if (accessToken) {
    config.headers = { Authorization: `Bearer ${accessToken}` };
  }
  return config;
});

axiosClient.interceptors.response.use(
  function (response) {
    store.dispatch(complete());
    return response.data;
  },
  function (error) {
    store.dispatch(complete());
    throw error;
  }
);
