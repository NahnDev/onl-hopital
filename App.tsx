import { StatusBar } from "expo-status-bar";
import React, { Suspense } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { View, Text } from "react-native";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./store";
import { defaultTheme } from "./themes/default";
import { ThemeProvider, useTheme } from "@rneui/themed";
import { LinearProgress } from "@rneui/base";
import LoadingProcess from "./components/LoadingProcess";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider theme={defaultTheme}>
        <SafeAreaProvider>
          <Suspense
            fallback={
              <View>
                <Text>Loading ...</Text>
              </View>
            }
          >
            <Provider store={store}>
              <LoadingProcess></LoadingProcess>
              <Navigation colorScheme={colorScheme} />
            </Provider>
          </Suspense>
          <StatusBar />
        </SafeAreaProvider>
      </ThemeProvider>
    );
  }
}
