import usePostStore from "@/store/postStore";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import PostFeed from "../../../components/PostFeed.js";
import SafeView from "../../../components/SafeView.js";
import VibeText from "../../../components/VibeText.js";
import { ScreenFocusProvider } from "../../context/ScreenFocusContext.js";
import useVideoVisibility from "../../hooks/useVideoVisibility.js";

function ProfileReel(props) {
    const [accountID, setAccountID]=useState(null);
    const [loading, setLoading]=useState(true);
    const [post, setPost]=useState(usePostStore(state => state.post));
    const nextCursor=usePostStore(state => state.nextCursor);
    const targetPostID = usePostStore(state => state.targetPostID);
    const isFocused = useVideoVisibility();
    const router=useRouter();

    const shiftPostToTop=(()=>{
        console.log("Post: ",post);
        const index=post.findIndex(p=>p.postid===targetPostID);
        const targetPost=post[index];
        const newPosts=[...post];
        newPosts.splice(index,1);
        newPosts.unshift(targetPost);
        return newPosts;
    });

    useEffect(() => {
        const fetchAndSet = async () => {
            const accountID = await SecureStore.getItemAsync("accountID");
            setAccountID(accountID);
            setPost(shiftPostToTop());
            setLoading(false);
        };

        fetchAndSet();
    }, []);
    
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

    
    if (loading) return;
    return (
        <SafeView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                onPress={()=>router.back()}
                >
                    <MaterialIcons
                    name="keyboard-backspace"
                    size={25}
                    color="#fff"
                    />
                </TouchableOpacity>
                <VibeText weight="SemiBold" style={styles.reelsText}>
                    Reels
                </VibeText>
            </View>
            <ScreenFocusProvider isFocused={isFocused}>
                <PostFeed
                initialPost={post}
                initialNextCursor={nextCursor}
                ownerAccountID={accountID}
                postType="Reel"
                />
            </ScreenFocusProvider>
        </SafeView>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
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
        fontSize:20,
        color:"#fff",
        marginLeft:20
    }
})
export default ProfileReel;