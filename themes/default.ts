import { createTheme } from "@rneui/themed";

export const Colors = {
  primary: "#444",
  secondary: "#888",
  background: "#fff",
  tint: "teal",
  tabIconDefault: "#8aa",
  tabIconSelected: "#fff",
  overlay: "#eee",
  warning: "red",
  border: "#ccc",
};

export const defaultTheme = createTheme({
  Text: {
    style: { color: Colors.primary },
    h1Style: { color: Colors.background },
    h2Style: { color: Colors.background },
    h3Style: { color: Colors.background },
    h4Style: { color: Colors.background },
  },
  // Input: (prop) => ({
  //   errorStyle: {
  //     borderColor: Colors.warning,
  //   },
  //   inputStyle: { color: Colors.primary },
  //   labelStyle: {
  //     zIndex: 10,
  //     backgroundColor: Colors.background,
  //     alignSelf: "flex-start",
  //     paddingHorizontal: 5,
  //     marginHorizontal: 5,
  //     color: Colors.secondary,
  //   },
  //   inputContainerStyle: {
  //     marginTop: -10,
  //     paddingHorizontal: 10,
  //     paddingVertical: 5,
  //     borderWidth: 1,
  //     borderRadius: 10,
  //     borderColor: Colors.secondary,
  //   },
  // }),
  Button: {
    buttonStyle: {
      backgroundColor: Colors.tint,
      borderRadius: 1000,
    },
  },
});
