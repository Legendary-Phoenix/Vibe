import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { Feather, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
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
                        <VibeText weight="SemiBold" style={styles.username}>
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
                            <VibeText weight="SemiBold" style={[styles.audioText,{marginLeft:7}]}>
                                Indila {" "}
                            </VibeText>
                            <VibeText weight="ExtraBold" style={{top:-2,color:"#fff"}}>
                                . {" "}
                            </VibeText>
                            <VibeText weight="SemiBold" style={styles.audioText}>
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

            <View style={styles.feedbackIcons}>
                <View style={styles.feedbackLeft}>

                    <View style={styles.iconContainer}>
                        <TouchableOpacity>
                            <Feather
                            name="heart"
                            size={25}
                            color={"#000"}
                            />
                        </TouchableOpacity>
                        <VibeText weight="SemiBold" style={styles.metricText}>11.2K</VibeText>
                    </View>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity>
                            <Ionicons
                            name="chatbubble-outline"
                            size={25}
                            color={"#000"}
                            />
                        </TouchableOpacity>
                        <VibeText weight="SemiBold" style={styles.metricText}>207</VibeText>
                    </View>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity>
                            <Ionicons
                            name="paper-plane-outline"
                            size={25}
                            color={"#000"}
                            />
                        </TouchableOpacity>
                        <VibeText weight="SemiBold" style={styles.metricText}>3,045</VibeText>
                    </View>

                </View>

                <View style={styles.feedbackRight}>
                    <TouchableOpacity>
                        <FontAwesome
                        name="bookmark-o"
                        size={25}
                        color={"#000"}
                        />
                    </TouchableOpacity>
                </View>
                
            </View>

            <View style={styles.descContainer}>
                <VibeText weight="SemiBold" style={styles.descriptionText}>
                    sarahthompson
                </VibeText>
                <VibeText linesNumber={2} style={styles.descriptionText} >
                    This is a short film I created 🥰 as a side project. It's about a character called Fluffy who is a curious, kind bunny with a child-like mind. He explores the world and finds himself in adventures beyond what he's accustomed to. Here, Fluffy understands himself and his abilities better-helps to counter villains and meets new friends along the way. 
                    {"\n\n"}
                    Watch this full on 23rd November (the expected release date) on YouTube. 😎🙌
                    {"\n\n"}
                    #Trailer #ShortFilm #SideProject #Adventure #FutureRelease #YouTube
                </VibeText>
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
        color:"#fff",
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
    },
    feedbackIcons:{
        flexDirection:"row",
        marginVertical:15,
        justifyContent:"space-between"
    },
    feedbackLeft:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        marginHorizontal:15
    },
    iconContainer:{
        flexDirection:"row",
        marginRight:10,
        alignItems:"center",
    },
    metricText:{
        color:"#000",
        marginLeft:5
    },
    feedbackRight:{
        marginHorizontal:15,

    },
    descContainer:{
        marginHorizontal:10,
    },
    descriptionText:{
        fontSize:14.5,
    }
 })
export default Post;