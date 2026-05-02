import 'react-native-gesture-handler';

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider, Theme } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import tamaguiConfig from './tamagui.config';
import { AdvancedAnimationsDemo } from './components/animations/AdvancedAnimationsDemo';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
        <Theme name="dark">
          <SafeAreaProvider>
            <StatusBar style="light" />
            <AdvancedAnimationsDemo />
          </SafeAreaProvider>
        </Theme>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
