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
import GoBack from "./GoBack";

export default function Select<T = any>(props: {
  selectedIndex?: number[];
  label: string;
  source: T[];
  render: (item: T, selected: boolean) => React.ReactNode;
  onChange: (item: T[], index: number[]) => any;
  style?: StyleProp<ViewStyle>;
}) {
  const {
    padding,
    roundedFull: roundFull,
    textCenter,
    opacity,
    margin,
    rounded,
    border,
    size1,
    bold,
  } = useStyles();
  const { borderDashed } = useCusStyle();
  const { overlay } = Colors[useColorScheme()];

  const [selected, setSelected] = useState<number[]>(props.selectedIndex || []);
  const selectedItem = props.source.filter((item, idx) =>
    props.selectedIndex?.includes(idx)
  );
  useEffect(() => props.onChange(selectedItem, selected), [selected]);
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <View style={[margin]}>
      <Text style={[size1, bold]}>{props.label}</Text>
      <View style={[rounded, border, { borderColor: overlay }, props.style]}>
        <Pressable onPress={() => setVisible(true)}>
          {selected.length <= 0 ? (
            <View style={[borderDashed, roundFull, opacity]}>
              <Text style={[padding, textCenter]}>{props.label}</Text>
            </View>
          ) : (
            selectedItem.map((item, idx) => {
              return props.render(item, true);
            })
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
            <GoBack onPress={() => setVisible(false)}></GoBack>
            {props.source.map((item, key) => {
              return (
                <Pressable
                  onPress={() => {
                    if (selected.includes(key)) {
                      setSelected(selected.filter((value) => value === key));
                    } else {
                      setSelected([...selected, key]);
                    }
                  }}
                  key={key}
                >
                  {props.render(item, selected.includes(key))}
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
