import * as Font from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

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
      });
      setFontsLoaded(true);
      SplashScreen.hideAsync();
    }
    loadFonts();
  },[]);
  if (!fontsLoaded) return null;
  return (
    <Stack
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="(tab)" options={{ headerShown: false }}/> 
      <Stack.Screen name="screens/HomeScreen" options={{ headerShown: false }}/>  
    </Stack>
  );
}
