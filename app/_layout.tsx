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
        require("../assets/fonts/Proxima_Nova_Semibold.otf"),
        "Inter-Black":
        require("../assets/fonts/Inter_18pt_Black.ttf"),
        "Inter-BlackItalic":
        require("../assets/fonts/Inter_18pt_BlackItalic.ttf"),
        "Inter-Bold":
        require("../assets/fonts/Inter_18pt_Bold.ttf"),
        "Inter-BoldItalic":
        require("../assets/fonts/Inter_18pt_BoldItalic.ttf"),
        "Inter-ExtraBold": require("../assets/fonts/Inter_18pt_ExtraBold.ttf"),
        "Inter-ExtraBoldItalic": require("../assets/fonts/Inter_18pt_ExtraBoldItalic.ttf"),
        "Inter-ExtraLight": require("../assets/fonts/Inter_18pt_ExtraLight.ttf"),
        "Inter-ExtraLightItalic": require("../assets/fonts/Inter_18pt_ExtraLightItalic.ttf"),
        "Inter-Italic": require("../assets/fonts/Inter_18pt_Italic.ttf"),
        "Inter-Light": require("../assets/fonts/Inter_18pt_Light.ttf"),
        "Inter-LightItalic": require("../assets/fonts/Inter_18pt_LightItalic.ttf"),
        "Inter-Medium": require("../assets/fonts/Inter_18pt_Medium.ttf"),
        "Inter-MediumItalic": require("../assets/fonts/Inter_18pt_MediumItalic.ttf"),
        "Inter-Regular": require("../assets/fonts/Inter_18pt_Regular.ttf"),
        "Inter-SemiBold": require("../assets/fonts/Inter_18pt_SemiBold.ttf"),
        "Inter-SemiBoldItalic": require("../assets/fonts/Inter_18pt_SemiBoldItalic.ttf"),
        "Inter-Thin": require("../assets/fonts/Inter_18pt_Thin.ttf"),
        "Inter-ThinItalic": require("../assets/fonts/Inter_18pt_ThinItalic.ttf"),

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
