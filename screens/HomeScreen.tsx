import { StyleSheet, View, ScrollView } from "react-native";
import { ListItem, Text } from "@rneui/base";
import EditScreenInfo from "../components/EditScreenInfo";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { useStyles } from "../style";
import { RootTabScreenProps } from "../types";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const colorSchema = useColorScheme();
  const {
    screen,
    text_reverse,
    justifyCenter,
    textCenter,
    header,
    content,
    item,
    marginVertical,
  } = useStyles();
  return (
    <View
      style={[
        screen,
        justifyCenter,
        { backgroundColor: Colors[colorSchema].tint },
      ]}
    >
      <View style={[header, { height: 600 }]}>
        <Text h2 style={[text_reverse, textCenter]}>
          Good day!
        </Text>
        <Text style={[text_reverse, textCenter]}>
          Ứng dụng đặt lịch khám bệnh của phòng khám nha khoa
        </Text>
      </View>
    </View>
  );
}
