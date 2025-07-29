import * as SecureStore from "expo-secure-store";
import { memo, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';

import api from "@/utils/axios.js";
import { Feather, FontAwesome } from '@expo/vector-icons';
import BreakerLine from './BreakerLine.js';
import Fleet from "./Fleet.js";
import LiveTimeString from './LiveTimeString.js';
import VibeText from "./VibeText.js";

const Comments=memo(({commentData, postID, ownerAccountID, reply=false})=> {
    const [replies, setReplies]=useState([]);
    const [loading, setLoading]=useState(false);
    const [nextCursor, setNextCursor]=useState(new Date().toISOString());
    const [hasMore, setHasMore]=useState(true);
    const [like, setLike]=useState(false);
    const [likesCount, setLikesCount]=useState(commentData.likescount);

    const handleLike=()=>{
        setLike(prev=>!prev);
        if (!like){
            setLikesCount(prev=>prev+1);
        } else{
            setLikesCount(prev=>prev-1);
        }
    }

    const fetchReplies=useCallback(async ()=>{
        if (!hasMore) return;
        setLoading(true);

        try{
            const accountID=await SecureStore.getItemAsync("accountID");
            let response;
            if (replies.length<=3){
                response=await api.get(`/comment/reply?accountID=${accountID}&mainCommentID=${commentData.maincommentid}
                    &cursorIndex=${nextCursor}&limit=8`);
            } else{
                response=await api.get(`/comment/reply?accountID=${accountID}&mainCommentID=${commentData.maincommentid}
                    &cursorIndex=${nextCursor}&limit=5`);
            }
            
            console.log("Replies data fetched") //debug
            const repliesData=response.data.data;

            if(repliesData.length>0){
                setNextCursor(response.data.nextCursor);
                setReplies(prev=>{
                    const existingIds = new Set(prev.map(c => c.commentid));
                    const newComments = repliesData.filter(c => !existingIds.has(c.commentid));
                    return [...prev, ...newComments];
                });
            } else{
                console.log("No more replies data available"); //debug
                setHasMore(false);
            }
        } catch (error){
            if (error.response?.data?.errorMessage){
                console.log("Error fetching comments data: ",error.response?.data?.errorMessage);
            } else{
                console.log("Unknown or network error",error.message);
            }
        } finally{
            setLoading(false);
        }

    }, [nextCursor, hasMore]);

    const renderReplies = useCallback(() => {
        if (reply)  return;
        return replies.map(r => (
            <Comments 
            key={r.commentID} 
            commentData={r} 
            postID={postID} 
            ownerAccountID={ownerAccountID}
            reply={true}
            />
        ));
    }, [replies, postID, ownerAccountID]);

    const renderReplyCountToggle=useCallback(()=>{
        const moreRepliesCount=commentData.replycount-replies.length;
        if(moreRepliesCount>0&&!reply){
            return (
                <TouchableOpacity onPress={fetchReplies}>
                    <View style={styles.replyToggle}>
                        <BreakerLine width="10%" height={1.3} marginVertical={10}/>
                        <VibeText weight="SemiBold" style={styles.replyCountText}>
                        {`View ${moreRepliesCount} more replies`}
                        </VibeText>
                    </View>
                </TouchableOpacity>
            );
        }
        return null;
    },[commentData, reply, replies])

    const authorText=useCallback(()=>{
        if (commentData.commenteraccountid===ownerAccountID){
            return (
                <>
                    <VibeText weight="ExtraBold" 
                    style={{fontSize: 15, color:"#8A8A8A", marginTop:-5}}>
                        {" "} . {" "}
                    </VibeText>
                    <VibeText weight="Medium" 
                    style={styles.metaText}>
                        Author
                    </VibeText>
                </>
            );
        }
        return(null);
    },[commentData,ownerAccountID]);

    const formatLikesCount=useCallback(()=>{
            if (likesCount > 1000){
                const formattedLikesCount=(Number(likesCount)/1000).toFixed(2);
                return `${formattedLikesCount}K`;
            } else{
                return likesCount;
            }
    },[likesCount]);

    useEffect(() => {
        if (!reply && replies.length === 0 && commentData.replies?.length > 0) {
            setReplies(commentData.replies);
        }
    }, [commentData, reply]);
    
    return (
        <View style={styles.outerContainer}>

            <View style={[styles.commentsContainer,
            {marginHorizontal: reply ? 45 : 15 }]}>
                <Fleet
                size={reply ? 26 : 32}
                imagePath={commentData.fleet.avatarpath}
                storyAvailable={commentData.fleet.isstoryavailable}
                watched={commentData.fleet.iswatched}
                borderWidth={2}
                borderRatio={2}
                />
                <View style={styles.content}>

                    <View style={styles.metaContainer}>
                        <VibeText weight="Medium" style={[styles.metaText,{color:"#000"}]}>
                            {commentData.fleet.username} {" "}
                        </VibeText>
                        <LiveTimeString timestamp={commentData.createdat} style={styles.metaText}/>
                        {authorText()}
                    </View>

                    <View style={styles.textContainer}>
                        <VibeText weight="Regular" style={styles.commentText}>
                            {reply && (
                                <VibeText weight="Regular" style={{fontSize:13, color:"dodgerblue"}}>
                                    {`@${commentData.parentcommentusername} `}
                                </VibeText>
                            )}
                            {commentData.text}
                        </VibeText>
                    </View>

                    <TouchableOpacity>
                        <VibeText weight="Medium" style={styles.replyText}>
                            Reply
                        </VibeText>
                    </TouchableOpacity>

                </View> 
                
                <View style={[styles.feedbackContainer, {marginRight:reply ? -15 : 15}]}>
                    <TouchableOpacity onPress={handleLike}>
                        {like ? (
                            <FontAwesome
                            name="heart"
                            size={20}
                            color="red"
                            />
                        ) : (
                            <Feather
                            name="heart"
                            size={20}
                            color="#8A8A8A"
                            />

                        )}
                    </TouchableOpacity>
                    <VibeText weight="Medium" style={styles.metricText}>
                        {formatLikesCount()}
                    </VibeText>
                </View>

            </View>
            {renderReplies()}
            {!reply&&renderReplyCountToggle()}
            {loading && <ActivityIndicator size="small" color="#000"/>}
        </View>
        
    );
});

const styles = StyleSheet.create({
    outerContainer:{
        flex:1
    },
    commentsContainer:{
        flex:1,
        flexDirection:"row",
        marginBottom:20
    },
    content:{
        flex:1,
        marginHorizontal:10,
        marginTop:2,
    },
    metaContainer:{
        flexDirection:"row",
    },
    metaText:{
        fontSize: 12.5,
        color:"#8A8A8A", 
    },
    textContainer:{
       paddingRight:5,
    },
    commentText:{
        fontSize:13
    },
    replyText:{
        fontSize: 12,
        color:"#8A8A8A",
        marginTop:2 
    },
    feedbackContainer: {
        alignItems:"center",
        marginTop:10,
    },
    metricText:{
        fontSize:11,
        color:"#6E6E6E"
    },
    replyToggle:{
        flex:1,
        flexDirection:"row",
        marginHorizontal:50,
        alignItems:"center",
        marginTop:-10,
        marginBottom:15
    }, 
    replyCountText:{
        fontSize:12,
        color:"#6E6E6E", 
        marginHorizontal:10
    }
})

export default Comments;