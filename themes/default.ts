import { createTheme } from "@rneui/themed";

export const defaultTheme = createTheme({
  lightColors: {
    primary: "teal",
  },
  darkColors: {
    primary: "teal",
  },
  mode: "dark",
  Button: {
    buttonStyle: {
      backgroundColor: "teal",
      borderRadius: 1000,
    },
  },
});
