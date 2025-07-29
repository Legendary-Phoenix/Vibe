import { Stack } from "expo-router";

export default function ProfileLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                name="index" 
                options={{ 
                    title: "Profile"
                }} 
            />
            <Stack.Screen 
                name="profileFeed" 
                options={{ 
                    title: "Profile Feed"
                }} 
            />
            <Stack.Screen 
                name="profileReel" 
                options={{ 
                    title: "Profile Reel",
                }} 
            />
            <Stack.Screen 
                name="setting" 
                options={{ 
                    title: "Setting",
                }} 
            />
        </Stack>
    );
}