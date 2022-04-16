import React, { useEffect, useState } from "react";
import { Pressable, StyleProp, View, ViewProps, ViewStyle } from "react-native";
import { Text } from "@rneui/themed";
import { useStyles } from "../style";
import useColorScheme from "../hooks/useColorScheme";
import { BottomSheet } from "@rneui/base";
import { Colors } from "../themes/default";

export default function Selector<T, K>(props: {
  label: string;

  defaultValue?: T[];
  source: T[];
  onChange: (items: T[]) => any;
  render: (
    item: T,
    selected: boolean,
    props?: { style: StyleProp<ViewStyle> }
  ) => React.ReactNode;

  multiple?: boolean;
  disable?: boolean;
  style?: StyleProp<ViewStyle>;
  valueStyle?: StyleProp<ViewStyle>;
  optionStyle?: StyleProp<ViewStyle>;
}) {
  //#region style
  const { size1, size2, textCenter, bold } = useStyles();
  const { rounded, roundedFull, opacity } = useStyles();
  const { margin, padding, marginHorizontal, paddingHorizontal } = useStyles();
  const { border, borderDashed } = useStyles();
  const { label, input } = useStyles();
  //#endregion

  const { overlay } = Colors;

  // ----- property
  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<T[]>(props.defaultValue || []);
  // const selectedItems = props.source.filter((item, key) =>
  //   selected.includes(key)
  // );

  useEffect(() => {
    props.onChange(selected);
  }, [selected]);

  return (
    <View style={[props.style]}>
      <Text style={[label]}>{props.label}</Text>
      <View style={[input]}>
        <Pressable onPress={() => setVisible(true)}>
          {selected.length <= 0 ? (
            <View style={[roundedFull, opacity, borderDashed]}>
              <Text style={[padding, textCenter]}>{props.label}</Text>
            </View>
          ) : (
            selected.map((item, key) => (
              <View key={key}>
                {props.render(item, false, { style: [props.valueStyle] })}
              </View>
            ))
          )}
        </Pressable>
        <BottomSheet
          isVisible={visible && !props.disable}
          onBackdropPress={() => setVisible(false)}
          modalProps={{ statusBarTranslucent: true }}
        >
          <View style={[padding, { backgroundColor: Colors.background }]}>
            {props.source.map((item, key) => {
              return (
                <Pressable
                  onPress={() => {
                    if (selected.includes(item)) {
                      if (props.multiple || selected.length > 1) {
                        setSelected(selected.filter((value) => value !== item));
                      }
                    } else {
                      console.log(props.multiple);
                      if (!props.multiple) {
                        console.log("run here");
                        setSelected([item]);
                      } else {
                        setSelected([...selected, item]);
                      }
                    }

                    if (!props.multiple) setVisible(false);
                  }}
                  key={key}
                >
                  {props.render(item, selected.includes(item), {
                    style: props.optionStyle,
                  })}
                </Pressable>
              );
            })}
          </View>
        </BottomSheet>
      </View>
    </View>
  );
}
