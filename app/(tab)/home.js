import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import FleetBar from "../../components/FleetBar.js";
import PostFeed from "../../components/PostFeed.js";
import SafeView from "../../components/SafeView.js";
import { ScreenFocusProvider } from "../context/ScreenFocusContext.js";
import useVideoVisibility from "../hooks/useVideoVisibility.js";

function HomeScreen() {
    const screenFocused=useVideoVisibility();
    const ListHeaderComponent=useCallback(()=>{
        return(
            <>
                <View style={styles.header}>

                    <View style={styles.vibeContainer}>
                        <Image
                        source={require("../../assets/images/vibe.png")}
                        style={styles.vibeImage}
                        />
                        <TouchableOpacity>
                            <Entypo
                            name="chevron-down"
                            size={18}
                            color={"#000"}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.headerIcon}>
                        <TouchableOpacity>
                                <Feather
                                name="heart"
                                size={24}
                                color={"#000"}
                                />
                            </TouchableOpacity>
                        <TouchableOpacity style={styles.messageIcon}>
                            <Ionicons
                            name="chatbubble-ellipses-outline"
                            size={24}
                            color={"#000"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <FleetBar/>
            </>
        );
    },[]);


    return (
        <SafeView style={styles.container}>
            <ScreenFocusProvider isFocused={screenFocused}>
                <PostFeed ListHeaderComponent={ListHeaderComponent}/>
            </ScreenFocusProvider>
        </SafeView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#fff",
    },
    header:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",

    },
    vibeContainer:{
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:10
    },
    vibeImage:{
        width:80,
        height:80,
    },
    headerIcon:{
        flexDirection:"row",
    },
    messageIcon:{
        paddingHorizontal:20
    },
})

export default HomeScreen;


