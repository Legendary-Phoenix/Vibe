import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Tabs, useSegments } from "expo-router";

export default function TabLayout(){
    const segments = useSegments();
    
    // Check if we're on the profileReel screen
    const isProfileReelScreen = segments.some(segment => segment === 'profileReel');
    return(
        <Tabs screenOptions={{
            headerShown:false, 
            tabBarShowLabel:false,
            tabBarActiveTintColor: isProfileReelScreen ? "#fff" : "#000",
            tabBarInactiveTintColor: isProfileReelScreen ? "#fff" : "#000",
            tabBarStyle: {
                backgroundColor: isProfileReelScreen ? "#000" : "#fff",
                borderTopWidth: isProfileReelScreen ? 0 : 1
            },
        }}>
            <Tabs.Screen 
                name="index" 
                options={{ href: null }} // 👈 Hides this from tab bar
            />
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon:({focused, color,size})=>focused? (

                        <MaterialCommunityIcons
                        name="home-variant"
                        size={size}
                        color={color}
                        />
                    ) : (
                        <MaterialCommunityIcons
                        name="home-variant-outline"
                        size={size}
                        color={color}
                        />
                    )
                }}
            />

            <Tabs.Screen
                name="reels"
                options={{
                    tabBarStyle: { 
                        backgroundColor: "#000",
                        borderTopWidth:0,
                    },
                    tabBarActiveTintColor: "#fff",
                    tabBarInactiveTintColor:"#fff",
                    tabBarIcon:({color,size})=>(
                        <MaterialIcons
                        name="video-library"
                        size={size}
                        color={color}
                        />
                    )
                }}
            />
            
            <Tabs.Screen
            name="(profile)"
            options={{
                tabBarIcon:({focused, color,size})=>focused ? (
                    <Ionicons
                    name="person-circle"
                    size={size}
                    color={color}
                    />
                ) : (
                    <Ionicons
                    name="person-circle-outline"
                    size={size}
                    color={color}
                    />
                )
            }}
            />
        </Tabs> 
    );
}