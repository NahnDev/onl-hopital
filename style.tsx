import { useNavigation, useNavigationState } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Colors from "./constants/Colors";
import useColorScheme from "./hooks/useColorScheme";

export function useStyles() {
  const colorSchema = useColorScheme();
  return StyleSheet.create({
    bold: { fontWeight: "bold" },

    row: { flexDirection: "row" },
    column: { flexDirection: "column" },

    flex: { display: "flex" },

    alignCenter: { alignItems: "center" },
    alignStart: { alignItems: "flex-start" },
    alignEnd: { alignItems: "flex-end" },

    justifyCenter: { justifyContent: "center" },
    justifyStart: { justifyContent: "flex-start" },
    justifyEnd: { justifyContent: "flex-end" },

    padding: { padding: 10 },
    paddingHorizontal: { paddingHorizontal: 10 },
    paddingVertical: { paddingVertical: 10 },

    margin: { margin: 10 },
    marginHorizontal: { marginHorizontal: 10 },
    marginVertical: { marginVertical: 10 },

    textCenter: {
      textAlign: "center",
    },

    shadow: {
      shadowOffset: { width: 5, height: 5 },
      shadowColor: Colors[colorSchema].text,
      shadowRadius: 5,
      elevation: 5,
    },

    screen: {
      backgroundColor: Colors[colorSchema].overlay,
      flex: 1,
      display: "flex",
      padding: 10,
    },
    rounded: {
      borderRadius: 10,
      padding: 10,
      overflow: "hidden",
    },

    roundFull: {
      borderRadius: 9999,
    },
    text_reverse: {
      color: Colors[colorSchema].background,
    },
    text: {
      color: Colors[colorSchema].text,
    },

    button: {
      backgroundColor: Colors[colorSchema].tint,
      color: Colors[colorSchema].background,
      fontSize: 20,
      padding: 10,
      textAlign: "center",
      fontWeight: "bold",
    },
    header: {
      backgroundColor: Colors[colorSchema].tint,
      color: Colors[colorSchema].background,
      margin: -10,
      paddingTop: 20,
      height: 180,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    item: {
      backgroundColor: Colors[colorSchema].background,
      marginVertical: 10,
      borderRadius: 10,
      padding: 10,
    },
    content: {
      backgroundColor: Colors[colorSchema].background,
      borderRadius: 10,
      padding: 10,
      marginTop: -10,
      flex: 1,
    },

    subHeader: {
      fontSize: 16,
      textAlign: "center",
    },
    transparent: {
      backgroundColor: "transparent",
    },
    opacity: {
      opacity: 0.5,
    },
    border: {
      borderWidth: 1,
    },
    borderDashed: {
      borderWidth: 1,
      borderStyle: "dashed",
    },

    italic: {
      fontStyle: "italic",
    },
    size5: {
      fontSize: 32,
    },
    size4: {
      fontSize: 28,
    },
    size3: {
      fontSize: 24,
    },
    size2: {
      fontSize: 20,
    },
    size1: {
      fontSize: 16,
    },
  });
}
