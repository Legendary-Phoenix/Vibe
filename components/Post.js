import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Feather, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet from "./BottomSheet.js";
import CommentsSection from "./CommentsSection.js";
import Fleet from "./Fleet.js";
import PostMenu from "./PostMenu.js";
import VibeText from "./VibeText.js";
import VideoPlayer from "./VideoPlayer.js";


function Post(props) {
    const [postMenuVisible,setPostMenuVisible]=useState(false);
    const [commentsMenuVisible, setCommentsMenuVisible]=useState(false);
    const openPostMenu= ()=>{setPostMenuVisible(true)};
    const closePostMenu= ()=>{setPostMenuVisible(false)};
    const openCommentsMenu=()=>setCommentsMenuVisible(true);
    const closeCommentsMenu=()=>setCommentsMenuVisible(false);
    return (
        <View style={styles.postContainer}>
            <View style={styles.header}>
                <Fleet
                size={32}
                imageUri={require("../assets/images/avatar2.jpg")}
                storyAvailable={true}
                watched={false}
                watchBorder={false}
                borderWidth={2}
                />
                <View style={styles.headerSection}>

                    <View style={styles.postMeta}>
                        
                        <View style={styles.topMeta}>

                            <VibeText weight="SemiBold" style={styles.topMetaText}>
                                sarahthompson {" "}
                            </VibeText>
                            <VibeText weight="ExtraBold" style={{color:"#fff", marginTop:-3}}>
                                    . {" "}
                            </VibeText>
                            <VibeText weight="Medium" style={styles.topMetaText}>
                            5h
                            </VibeText>

                        </View>
                        

                        <View style={styles.audioMeta}>
                            <FontAwesome5
                            name="music"
                            size={12}
                            color="#fff"
                            />
                            <TouchableOpacity style={styles.audioTextContainer}>
                                <VibeText weight="Medium" style={[styles.audioText,{marginLeft:7}]}>
                                    Indila {" "}
                                </VibeText>
                                <VibeText weight="ExtraBold" style={{top:-3,color:"#fff"}}>
                                    . {" "}
                                </VibeText>
                                <VibeText weight="Medium" style={styles.audioText}>
                                Love Story
                                </VibeText>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.headerButtons}>
                        <TouchableOpacity style={styles.followButton}>
                            <VibeText weight="Bold" style={styles.followText}>Follow</VibeText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuButton} onPress={openPostMenu}>
                            <MaterialCommunityIcons
                            name="dots-vertical"
                            size={22}
                            color="#fff"
                            />
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
                        <TouchableOpacity onPress={openCommentsMenu}>
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
            <BottomSheet
            isVisible={postMenuVisible}
            onClose={closePostMenu}
            height="40%"
            >
                <PostMenu/>
            </BottomSheet>

            <BottomSheet
            isVisible={commentsMenuVisible}
            onClose={closeCommentsMenu}
            height="90%"
            >
               <CommentsSection/>
            </BottomSheet>
        
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
        marginVertical:5,
        flexDirection:"row",
        zIndex:2,
        //justifyContent:"space-between"
    },
    headerSection:{
        marginLeft:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        flex:1,
        flexWrap:"wrap"
    },
    postMeta:{
        flexDirection:"column",
    },
    topMeta:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:2
    },
    topMetaText:{
        //alignSelf:"center",
        fontSize: 13,
        color:"#fff",
    },
    audioMeta:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:-2
    },
    audioTextContainer:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row"
    },
    audioText:{
        fontSize: 11.5,
        alignSelf:"center",
        //color:"#2F2F2F",
        color:"#fff"
    },
    headerButtons:{
        flexDirection:"row",
        alignItems:"center",
    },
    followButton:{
        width:70,
        height:30,
        borderRadius:5,
        padding:4,
        backgroundColor:null,
        borderColor:"#fff",
        borderWidth:1,
    },
    followText:{
        color:"#fff",
        textAlign:"center",
        fontSize:13
    },
    menuButton:{
        marginLeft:10
    },
    videoContainer:{
        marginTop:-55,
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
        marginLeft:5,
        fontSize:13
    },
    feedbackRight:{
        marginHorizontal:15,

    },
    descContainer:{
        marginHorizontal:10,
    },
    descriptionText:{
        fontSize:13,
    },
    bottomSheetHeader:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        marginVertical:10,
    },
    sheetHButtonContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    sheetHeaderButtons:{
        width:50,
        height: 50,
        borderRadius:50,
        borderWidth:0.8,
        //#4B4B4B
        //borderColor: "#C0C0C0",
        //#363636
        borderColor:"#262626",
        padding:10,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:5
    },
    breakerLine:{
        backgroundColor:"#E1E8ED",
        height:0.5,
        marginVertical:10
    },
    headerButtonText:{
        fontSize:13,
        color:"#363636"
    },
    bottomSheetBody:{
        marginHorizontal:20,
        justifyContent:"center"
    },
    bottomSheetOptions:{
        flexDirection:"row",
        alignItems:"center",
        paddingVertical:10,
        //justifyContent:"center"
    },
    optionsText:{
        fontSize:14.5,
        color:"#000",
        marginHorizontal:15,
    }
 })
export default Post;