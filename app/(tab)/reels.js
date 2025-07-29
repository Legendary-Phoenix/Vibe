import { Entypo } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import PostFeed from "../../components/PostFeed";
import SafeView from "../../components/SafeView";
import VibeText from "../../components/VibeText.js";
import { ScreenFocusProvider } from "../context/ScreenFocusContext.js";
import useVideoVisibility from "../hooks/useVideoVisibility.js";

function ReelsScreen(props) {
    const [showHeader, setShowHeader] = useState(true);
    const isFocused = useVideoVisibility();
    const handleScrollDirection = (direction, yOffset) => {
        if (yOffset <=10){
            setShowHeader(true);
        }
        else if (direction === "down") {
            setShowHeader(false);
        } else if (direction==="up") {
            setShowHeader(true);
        }
    };
    useFocusEffect(
        useCallback(() => {
            // When screen comes into focus
            StatusBar.setBarStyle("light-content");
            StatusBar.setBackgroundColor("#000");

            // Cleanup function runs when screen is unfocused
            return () => {
            StatusBar.setBarStyle("dark-content"); // typical default
            StatusBar.setBackgroundColor("#fff");  // or your app's main background
            };
        }, [])
    );
    const renderHeader=useCallback(()=>{
        if (showHeader) {
            return(
            <View style={styles.header}>
                <VibeText weight="SemiBold" family="ProximaNova" style={styles.reelsText}>
                    Reels
                </VibeText>
                <TouchableOpacity style={{marginTop:3, marginLeft:5}}>
                    <Entypo
                    name="chevron-down"
                    size={18}
                    color={"#fff"}
                    />
                </TouchableOpacity>
            </View>
            )
        }
        return null;
    },[showHeader])
    return (
       <SafeView style={styles.container}>
        {renderHeader()}
        <ScreenFocusProvider isFocused={isFocused}>
            <PostFeed
            postType="Reel"
            onScrollDirectionChange={handleScrollDirection}
            />
        </ScreenFocusProvider>
       </SafeView>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:"#000"
    },
    header:{
        position:"absolute",
        top:50,
        left:15,
        zIndex:2,
        flexDirection:"row",
        alignItems:"center",
    },
    reelsText:{
        fontSize:25,
        color:"#fff"
    }
})
export default ReelsScreen;