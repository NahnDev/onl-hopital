import { StatusBar } from "expo-status-bar";
import React, { Suspense } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { View, Text } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import { defaultTheme } from "./themes/default";
import { ThemeProvider } from "@rneui/themed";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
          <SafeAreaProvider>
            <Suspense
              fallback={
                <View>
                  <Text>Loading ...</Text>
                </View>
              }
            >
              <Navigation colorScheme={colorScheme} />
            </Suspense>
            <StatusBar />
          </SafeAreaProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}
