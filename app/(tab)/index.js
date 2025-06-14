import { useAuth } from "@/app/context/AuthProvider.js";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const {sessionAvailable,sessionLoading}=useAuth();
  if (sessionLoading){
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return <Redirect href={sessionAvailable ? "/home":"/auth/auth"}/>
  //return <Redirect href="/auth/forgotPassword"/>
};
