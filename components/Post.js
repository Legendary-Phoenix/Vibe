import { useRouter } from "expo-router";
import { memo, useCallback, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Feather, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet from "./BottomSheet.js";
import CommentsSection from "./CommentsSection.js";
import Fleet from "./Fleet.js";
import LiveTimeString from "./LiveTimeString.js";
import MediaCarousel from './MediaCarousel.js';
import PostMenu from "./PostMenu.js";
import VibeText from "./VibeText.js";


const Post= memo(({postData, isVisible=false}) => {
    const postID=postData.postid;
    const ownerAccountID=postData.owneraccountid;
    const [postMenuVisible,setPostMenuVisible]=useState(false);
    const [commentsMenuVisible, setCommentsMenuVisible]=useState(false);
    const [trackName, setTrackName]=useState("");
    const [artistName, setArtistName]=useState("");
    const [like, setLike]=useState(false);
    const [bookmark, setBookmark]=useState(postData.isbookmarked);
    const [follow, setFollow]=useState(postData.isfollowing);
    const [likesCount, setLikesCount]=useState(postData.likescount);
    const router=useRouter();

    const openPostMenu= useCallback(()=>setPostMenuVisible(true),[]);
    const closePostMenu= useCallback(()=>setPostMenuVisible(false),[]);
    const openCommentsMenu=useCallback(()=>setCommentsMenuVisible(true),[]);
    const closeCommentsMenu=useCallback(()=>setCommentsMenuVisible(false),[]);

    const themeColor=useMemo(()=>postData.media[0].renderAspectRatio==="4:5" ? "#fff" : "#000",[postData.media]);
    
    const borderColor=useMemo(()=>postData.media[0].renderAspectRatio==="4.5" ? "#fff" : "#EBEBEB",[postData.media]);
    const backgroundColor=useMemo(()=>postData.media[0].renderAspectRatio==="4:5" ? null : "#EBEBEB",[postData.media]);

    // const navigateToProfilePage=()=>{
    //     console.log("postData.username:", postData.username);
    //     router.push({
    //         pathname:"/profile",
    //         params:{
    //             imagePath: postData.fleet.avatarpath,
    //             storyAvailable: postData.fleet.isstoryavailable,
    //             watched: postData.fleet.iswatched,
    //             username: postData.username,
    //             displayName: "Pam Zieme"
    //         },
    //     });
    // };

    const setAudioMeta=(trackName, artistName)=>{
        setTrackName(trackName);
        setArtistName(artistName);
    };
    const handleLike=()=>{
        setLike(prev=>!prev);
        if (!like){
            setLikesCount(prev=>prev+1);
        } else{
            setLikesCount(prev=>prev-1);
        }
    }
    
    const renderFollowButton=useCallback(()=>{
        //uses postData.isfollowing instead of follow as to allow the follow button to
        //avoid it from dissapearing after clicking it and changing its text to "Following"
        if (!postData.isfollowing){
            return(
                <TouchableOpacity 
                onPress={()=>setFollow(prev=>!prev)}
                style={[styles.followButton,
                {
                    width:follow?80:70,
                    borderColor, 
                    backgroundColor,
                }]}>
                    <VibeText weight="SemiBold" style={[styles.followText,{color:themeColor}]}>{follow?"Following":"Follow"}</VibeText>
                </TouchableOpacity>
            );
        }
        return null;
    },[postData.isfollowing, follow, borderColor, backgroundColor, themeColor]);

    const renderAudioMeta=useCallback(()=>{
        if (!trackName && !artistName) return null;
        return(
            <View style={styles.audioMeta}>
                <TouchableOpacity style={styles.audioTextContainer}>
                    <FontAwesome5
                    name="music"
                    size={12}
                    color={themeColor}
                    />
                    <VibeText weight="Medium"  linesNumber={1} style={[{
                    fontSize:11.5,
                    alignSelf:"center",
                    color: themeColor,
                    marginLeft:7,
                    }]}>
                        {trackName} {" "}
                        <VibeText weight="ExtraBold" 
                        style={{
                            top:-3,
                            color: themeColor,
                        }}
                        >
                            . {" "} {artistName}
                        </VibeText>
                        
                    </VibeText>
                    {/* <VibeText weight="Medium" linesNumber={1} style={{
                    fontSize:11.5,
                    alignSelf:"center",
                    color: themeColor,
                    }}>
                    {artistName}
                    </VibeText> */}
                </TouchableOpacity>
            </View>
        );
    },[trackName, artistName]);

    const formatMetrics=useCallback((metric)=>{
        if (metric > 1000){
            const formattedMetric=(Number(metric)/1000).toFixed(2);
            return `${formattedMetric}K`;
        } else{
            return metric;
        }
    },[]);

    return (
        <View style={styles.postContainer}>
            <View style={styles.header}>
                <Fleet
                size={32}
                imagePath={postData.fleet.avatarpath}
                storyAvailable={postData.fleet.isstoryavailable}
                watched={postData.fleet.iswatched}
                borderWidth={2}
                />
                <View style={styles.headerSection}>

                    <View style={styles.postMeta}>
                        
                        <View style={[styles.topMeta,{marginTop: !trackName&&!artistName ? -10 : -5}]}>
                            <TouchableOpacity
                            // onPress={navigateToProfilePage}
                            >
                                <VibeText weight="SemiBold" style={{
                                    fontSize:13,
                                    color: themeColor,
                                    alignSelf:"center"
                                }}>
                                    {postData.username} {" "}
                                </VibeText> 
                            </TouchableOpacity>

                        </View>
                        {renderAudioMeta()}
                    </View>

                    <View style={styles.headerButtons}>
                        {renderFollowButton()}
                        <TouchableOpacity style={styles.menuButton} onPress={openPostMenu}>
                            <MaterialCommunityIcons
                            name="dots-vertical"
                            size={22}
                            color={themeColor}
                            />
                        </TouchableOpacity>
                        
                    </View>

                </View>

            </View>

            <MediaCarousel mediaData={postData.media} isVisible={isVisible} setAudioMeta={setAudioMeta}/>
           
            <View style={styles.feedbackIcons}>
                <View style={styles.feedbackLeft}>

                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={handleLike}>
                            {like ? (
                                <FontAwesome
                                name="heart"
                                size={25}
                                color="red"
                                />
                            ) : (
                                <Feather
                                name="heart"
                                size={25}
                                color="#000"
                                />

                            )}
                        </TouchableOpacity>
                        <VibeText weight="SemiBold" style={styles.metricText}>{formatMetrics(likesCount)}</VibeText>
                    </View>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={openCommentsMenu}>
                            <Ionicons
                            name="chatbubble-outline"
                            size={25}
                            color={"#000"}
                            />
                        </TouchableOpacity>
                        <VibeText weight="SemiBold" style={styles.metricText}>{formatMetrics(postData.commentscount)}</VibeText>
                    </View>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity>
                            <Ionicons
                            name="paper-plane-outline"
                            size={25}
                            color={"#000"}
                            />
                        </TouchableOpacity>
                        <VibeText weight="SemiBold" style={styles.metricText}>{formatMetrics(postData.sharescount)}</VibeText>
                    </View>

                </View>

                <View style={styles.feedbackRight}>
                    <TouchableOpacity onPress={()=>setBookmark(prev=>!prev)}>
                        <FontAwesome
                        name={bookmark ? "bookmark" : "bookmark-o"}
                        size={25}
                        color={"#000"}
                        />
                    </TouchableOpacity>
                </View>
                
            </View>

            <View style={styles.descContainer}>
                <VibeText weight="SemiBold" style={styles.descriptionText}>
                    {postData.username}
                </VibeText>
                <VibeText linesNumber={2} expand={true} style={styles.descriptionText}>
                   {postData.description}
                </VibeText>
                <LiveTimeString timestamp={postData.createdat} style={{
                    fontSize:12,
                    color: "#6E6E6E",
                    marginTop:5
                }}/>
            </View>
            <BottomSheet
            isVisible={postMenuVisible}
            onClose={closePostMenu}
            height="50%"
            >
                <PostMenu/>
            </BottomSheet>

            <BottomSheet
            isVisible={commentsMenuVisible}
            onClose={closeCommentsMenu}
            height="99%"
            >
               <CommentsSection postID={postID} ownerAccountID={ownerAccountID}/>
            </BottomSheet>
        
        </View>
    );
});

const styles = StyleSheet.create({
    postContainer:{
        flex:1,
        marginVertical:15
    },
    header:{
        marginHorizontal:15,
        marginVertical:5,
        flexDirection:"row",
        zIndex:3,
        alignItems:"center"
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
    },
    audioMeta:{
        flexDirection:"row",
        alignItems:"center",
        maxWidth: 150,
        marginLeft:2,
        marginTop:-2
    },
    audioTextContainer:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
    },
    headerButtons:{
        flexDirection:"row",
        alignItems:"center",
    },
    followButton:{
        height:30,
        borderRadius:5,
        padding:4,
        borderWidth:1,
    },
    followText:{
        textAlign:"center",
        fontSize:13
    },
    menuButton:{
        marginLeft:10
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