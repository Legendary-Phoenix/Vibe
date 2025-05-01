import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { FontAwesome5 } from '@expo/vector-icons';
import VibeText from "./VibeText.js";
import VideoPlayer from "./VideoPlayer.js";


function Post(props) {
    return (
        <View style={styles.postContainer}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.profileIcon}>
                    <Image
                    source={require("../assets/images/avatar2.jpg")}
                    style={styles.profilePicture}
                    />
                </TouchableOpacity>

                <View style={styles.postMeta}>
                    <View style={styles.postMeta}>
                        <VibeText font="ProximaNova-Bold" style={styles.username}>
                            sarahthompson
                        </VibeText>
                    </View>

                    <View style={styles.audioMeta}>
                        <FontAwesome5
                        name="music"
                        size={12}
                        color="#fff"
                        />
                        <TouchableOpacity style={styles.audioTextContainer}>
                            <VibeText font="ProximaNova-SemiBold" style={[styles.audioText,{marginLeft:7}]}>
                                Indila {" "}
                            </VibeText>
                            <VibeText font="ProximaNova-ExtraBold" style={{top:-2,color:"#fff"}}>
                                . {" "}
                            </VibeText>
                            <VibeText font="ProximaNova-SemiBold" style={styles.audioText}>
                            Love Story
                            </VibeText>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

            <View style={styles.videoContainer}>
                <VideoPlayer 
                sourceUri="https://www.w3schools.com/html/mov_bbb.mp4"
                height={530}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    postContainer:{
        flex:1,
        marginVertical:20
    },
    header:{
        marginHorizontal:15,
        flexDirection:"row",
        zIndex:2
    },
    profileIcon:{
        width:42,
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 30,
        borderColor: "dodgerblue",
        borderWidth:2.5,
        padding:1
    },
    profilePicture:{
        width:32,
        height:32,
        borderRadius: 30
    },
    postMeta:{
        marginHorizontal:10,
        flexDirection:"column"
    },
    username:{
        marginHorizontal:-10,
        //alignSelf:"center",
        marginTop:4,
        fontSize: 14.5,
        color:"#fff"
    },
    audioMeta:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:2
    },
    audioTextContainer:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row"
    },
    audioText:{
        fontSize: 13,
        alignSelf:"center",
        //color:"#2F2F2F",
        color:"#fff"
    },
    videoContainer:{
        marginTop:-50,
        zIndex:1
    }
 })
export default Post;