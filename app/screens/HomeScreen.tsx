import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FleetBar from "../../components/FleetBar.js";
import Post from "../../components/Post.js";

function HomeScreen() {
    const insets=useSafeAreaInsets();
    return (
        <ScrollView style={{flex:1, paddingTop: insets.top, backgroundColor:"#fff"}}>
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
            <Post/>
        </ScrollView>
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


