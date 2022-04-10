/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: "home",
            },
          },
          Doctor: {
            screens: {
              DoctorScreen: "doctor",
            },
          },
          Booking: {
            screens: {
              TabTwoScreen: "two",
            },
          },
          Profile: {
            screens: {
              TabTwoScreen: "two",
            },
          },
        },
      },
      Welcome: "welcome",
      Modal: "modal",
      Login: "login",
      Register: "register",
      NotFound: "*",
    },
  },
};

export default linking;
