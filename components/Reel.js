import { Feather, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BottomSheet from "./BottomSheet";
import CommentsSection from "./CommentsSection";
import Fleet from "./Fleet";
import MediaItem from "./MediaItem";
import PostMenu from "./PostMenu";
import VibeText from "./VibeText";

const { height } = Dimensions.get('window');

function Reel({postData, isVisible=false}) {
    const [like, setLike]=useState(false);
    const [likesCount, setLikesCount]=useState(postData.likescount);
    const insets = useSafeAreaInsets();
    const safeHeight = height-insets.bottom;
    const [follow, setFollow]=useState(postData.isfollowing);
    const [postMenuVisible,setPostMenuVisible]=useState(false);
    const [commentsMenuVisible, setCommentsMenuVisible]=useState(false);

    const openPostMenu= useCallback(()=>setPostMenuVisible(true),[]);
    const closePostMenu= useCallback(()=>setPostMenuVisible(false),[]);
    const openCommentsMenu=useCallback(()=>setCommentsMenuVisible(true),[]);
    const closeCommentsMenu=useCallback(()=>setCommentsMenuVisible(false),[]);

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
                style={[styles.followButton,{ width:follow? 75: 65}]}
                >
                    <VibeText weight="SemiBold" style={styles.followText}>
                        {follow?"Following":"Follow"}
                    </VibeText>
                </TouchableOpacity>
            );
        }
        return null;
    },[postData.isfollowing, follow]);

    return (
        <View style={[styles.container,{height:safeHeight}]}>
            <MediaItem
            postType={postData.posttype}
            mediaPath={postData.media[0].mediaPath}
            mediaType={postData.media[0].mediaType}
            renderAspectRatio={postData.media[0].renderAspectRatio}
            cropOption={postData.media[0].cropOption}
            isVisible={isVisible}
            />
            <View style={styles.sideBar}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={handleLike}>
                        {like ? (
                            <FontAwesome
                            name="heart"
                            size={27}
                            color="red"
                            />
                        ) : (
                            <Feather
                            name="heart"
                            size={27}
                            color="#fff"
                            />

                        )}
                    </TouchableOpacity>
                    <VibeText weight="SemiBold" style={styles.metricText}>
                        {likesCount}
                    </VibeText>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={openCommentsMenu}>
                        <Ionicons
                        name="chatbubble-outline"
                        size={27}
                        color={"#fff"}
                        />
                    </TouchableOpacity>
                    <VibeText weight="SemiBold" style={styles.metricText}>
                        {postData.commentscount}
                    </VibeText>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity>
                        <Ionicons
                        name="paper-plane-outline"
                        size={27}
                        color={"#fff"}
                        />
                    </TouchableOpacity>
                    <VibeText weight="SemiBold" style={styles.metricText}>
                        {postData.sharescount}
                    </VibeText>
                </View>
                <TouchableOpacity style={{alignSelf:"center"}} onPress={openPostMenu}>
                    <MaterialCommunityIcons
                    name="dots-vertical"
                    size={27}
                    color="#fff"
                    />
                </TouchableOpacity>
                

                <TouchableOpacity style={{width:25,height:25, backgroundColor:"rgba(0,0,0,0.2)",borderRadius:3, borderWidth:1.5, borderColor:"#fff", alignSelf:"center", alignItems:"center",justifyContent:"center",marginVertical:20}}>
                    <FontAwesome5
                    name="music"
                    size={10}
                    color="#fff"
                    />
                </TouchableOpacity>
            
            </View>
            <View style={styles.bottomSection}>
                <View style={styles.top}>
                    <Fleet
                    size={26}
                    imagePath={postData.fleet.avatarpath}
                    storyAvailable={postData.fleet.isstoryavailable}
                    watched={postData.fleet.iswatched}
                    borderWidth={2}
                    />
                    <View style={styles.meta}>
                        <VibeText weight="SemiBold" style={{color:"#fff",fontSize:12}}>
                            {postData.username}
                        </VibeText>
                        <View style={styles.audioMeta}>
                            <TouchableOpacity>
                                <FontAwesome5
                                name="music"
                                size={10}
                                color="#fff"
                                />
                            </TouchableOpacity>
                            <VibeText
                            weight="Medium"
                            linesNumber={1}
                            style={{color:"#fff", fontSize:10.5, marginLeft:5}}
                            >
                                {postData.media[0].artistName} {" . "} {postData.media[0].trackName}
                            </VibeText>
                        </View>
                    </View>

                    {renderFollowButton()}
                </View>
                <View style={styles.description}>
                    <VibeText weight="Medium" expand={true} linesNumber={1} style={{color:"#fff",fontSize:12}}>
                        {postData.description}
                    </VibeText>
                </View>
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
               <CommentsSection postID={postData.postid} ownerAccountID={postData.owneraccountid}/>
            </BottomSheet>
    
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        backgroundColor:"#000",
    },
    sideBar:{
        position:"absolute",
        bottom:15,
        right:15
    },
    iconContainer:{
        alignItems:"center",
        marginBottom:20,
    },
    metricText: {
        color:"#fff",
        fontSize:11.5,
        marginTop:3
    },
    top:{
        flexDirection:"row"
    },
    bottomSection:{
        position:"absolute",
        bottom:20,
        left:10,
    },
    meta:{
       marginHorizontal:10,
       //marginTop:2
    },
    audioMeta:{
        flexDirection:"row",
        alignItems:"center",
        width:140
    },
    top:{
        flexDirection:"row"
    },
    description:{
        marginVertical:15,
        paddingRight:70
    },
    followButton:{ 
        height:27,
        borderWidth:1.5, 
        borderColor:"#fff", 
        borderRadius:5, 
        justifyContent:"center", 
        alignSelf:"center", 
        marginLeft:15, 
        marginTop:2
    },
    followText:{
        color:"#fff", 
        alignSelf:"center", 
        fontSize: 13
    }
})
export default Reel;