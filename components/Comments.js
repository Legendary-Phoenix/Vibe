import React, { memo, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import BreakerLine from './BreakerLine.js';
import Fleet from "./Fleet.js";
import LiveTimeString from './LiveTimeString.js';
import VibeText from "./VibeText.js";

const Comments=memo(({commentData, postID, ownerAccountID, reply=false})=> {
    const renderReplies = useCallback(() => {
        return commentData.replies?.map(reply => (
            <Comments 
            key={reply.commentID} 
            commentData={reply} 
            postID={postID} 
            ownerAccountID={ownerAccountID}
            reply={true}
            />
        ));
    }, [commentData, postID, ownerAccountID]);

    const renderReplyCountToggle=useCallback(()=>{
        if(commentData.replycount-3>0&&!reply){
            return (
                <TouchableOpacity>
                    <View style={styles.replyToggle}>
                        <BreakerLine width="10%" height={1.3} marginVertical={10}/>
                        <VibeText weight="SemiBold" style={styles.replyCountText}>
                        {`View ${commentData.replycount-3} more replies`}
                        </VibeText>
                    </View>
                </TouchableOpacity>
            );
        }
        return null;
    },[commentData, reply])

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
        const likesCount=commentData.likescount;
            if (likesCount > 1000){
                const formattedLikesCount=(Number(likesCount)/1000).toFixed(2);
                return `${formattedLikesCount}K`;
            } else{
                return likesCount;
            }
    },[commentData]);
    
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
                    <TouchableOpacity>
                        <Feather
                        name="heart"
                        size={20}
                        color={"#8A8A8A"}
                        />
                    </TouchableOpacity>
                    <VibeText weight="Medium" style={styles.metricText}>
                        {formatLikesCount()}
                    </VibeText>
                </View>

            </View>
            {renderReplies()}
            {renderReplyCountToggle()}
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