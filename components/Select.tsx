import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { BottomSheet, Text } from "@rneui/base";
import { useStyles } from "../style";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export default function Select<T = any>(props: {
  selectedIndex?: number;
  label: string;
  source: T[];
  render: (item: T, selected: boolean) => React.ReactNode;
  onChange: (item: T) => any;
  style?: StyleProp<ViewStyle>;
}) {
  const {
    padding,
    roundFull,
    textCenter,
    opacity,
    margin,
    rounded,
    border,
    size2,
    size1,
    screen,
    header,
    content,
    marginHorizontal,
    bold,
  } = useStyles();
  const { borderDashed } = useCusStyle();
  const [selected, setSelected] = useState<number>(props.selectedIndex || -1);
  const [visible, setVisible] = useState<boolean>(false);
  const { overlay } = Colors[useColorScheme()];

  useEffect(() => props.onChange(props.source[selected]), [selected]);
  return (
    <View style={[margin]}>
      <Text style={[size1, bold]}>{props.label}</Text>
      <View style={[rounded, border, { borderColor: overlay }, props.style]}>
        <Pressable onPress={() => setVisible(true)}>
          {selected < 0 || selected >= props.source.length ? (
            <View style={[borderDashed, roundFull, opacity]}>
              <Text style={[padding, textCenter]}>{props.label}</Text>
            </View>
          ) : (
            props.render(props.source[selected], true)
          )}
        </Pressable>
        <BottomSheet
          isVisible={visible}
          onBackdropPress={() => setVisible(false)}
          modalProps={{ statusBarTranslucent: true }}
        >
          <View
            style={[
              padding,
              { backgroundColor: Colors[useColorScheme()].background },
            ]}
          >
            {props.source.map((item, key) => {
              return (
                <Pressable
                  onPress={() => {
                    setSelected(key);
                    setVisible(false);
                  }}
                  key={key}
                >
                  {props.render(item, selected === key)}
                </Pressable>
              );
            })}
          </View>
        </BottomSheet>
      </View>
    </View>
  );
}

function useCusStyle() {
  return StyleSheet.create({
    borderDashed: {
      borderWidth: 1,
      borderStyle: "dashed",
    },
  });
}
