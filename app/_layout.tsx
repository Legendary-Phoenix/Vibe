import * as Font from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./context/AuthProvider.js";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded]= useState(false);
  useEffect(()=>{
    async function loadFonts(){
      await Font.loadAsync({
        "ProximaNova-Regular": 
        require("../assets/fonts/proximanova_regular.ttf"),
        "ProximaNova-Light":
        require("../assets/fonts/proximanova_light.otf"),
        "ProximaNova-ExtraBold":
        require("../assets/fonts/proximanova_extrabold.otf"),
        "ProximaNova-Bold":
        require("../assets/fonts/proximanova_bold.otf"),
        "ProximaNova-Black":
        require("../assets/fonts/proximanova_black.otf"),
        "ProximaNova-SemiBold":
        require("../assets/fonts/Proxima-Nova-Semibold.otf"),
        "Inter-Black":
        require("../assets/fonts/Inter_18pt-Black.ttf"),
        "Inter-BlackItalic":
        require("../assets/fonts/Inter_18pt-BlackItalic.ttf"),
        "Inter-Bold":
        require("../assets/fonts/Inter_18pt-Bold.ttf"),
        "Inter-BoldItalic":
        require("../assets/fonts/Inter_18pt-BoldItalic.ttf"),
        "Inter-ExtraBold": require("../assets/fonts/Inter_18pt-ExtraBold.ttf"),
        "Inter-ExtraBoldItalic": require("../assets/fonts/Inter_18pt-ExtraBoldItalic.ttf"),
        "Inter-ExtraLight": require("../assets/fonts/Inter_18pt-ExtraLight.ttf"),
        "Inter-ExtraLightItalic": require("../assets/fonts/Inter_18pt-ExtraLightItalic.ttf"),
        "Inter-Italic": require("../assets/fonts/Inter_18pt-Italic.ttf"),
        "Inter-Light": require("../assets/fonts/Inter_18pt-Light.ttf"),
        "Inter-LightItalic": require("../assets/fonts/Inter_18pt-LightItalic.ttf"),
        "Inter-Medium": require("../assets/fonts/Inter_18pt-Medium.ttf"),
        "Inter-MediumItalic": require("../assets/fonts/Inter_18pt-MediumItalic.ttf"),
        "Inter-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
        "Inter-SemiBold": require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
        "Inter-SemiBoldItalic": require("../assets/fonts/Inter_18pt-SemiBoldItalic.ttf"),
        "Inter-Thin": require("../assets/fonts/Inter_18pt-Thin.ttf"),
        "Inter-ThinItalic": require("../assets/fonts/Inter_18pt-ThinItalic.ttf"),

      });
      setFontsLoaded(true);
      SplashScreen.hideAsync();
    }
    loadFonts();
  },[]);
  if (!fontsLoaded) return null;
  return (
    <AuthProvider>
      <SafeAreaProvider>
        {/* <StatusBar style="dark" backgroundColor="#fff" /> */}
        <StatusBar style="dark" backgroundColor="white" translucent={false} />
        <Stack
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="(tab)" options={{ headerShown: false }}/> 
        </Stack>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
