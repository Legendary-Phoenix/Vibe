import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import avatar from "../logic/avatar.js";
import Fleet from "./Fleet.js";
import VibeText from "./VibeText.js";

function Comments({postUserId, userid, username, avatarName, timestamp, text, numberOfLikes}) {
    const authorText=()=>{
        if (userid===postUserId){
            return (
                <>
                    <VibeText weight="ExtraBold" 
                    style={{fontSize: 15, color:"#8A8A8A", marginTop:-5}}>
                        . {" "}
                    </VibeText>
                    <VibeText weight="Medium" 
                    style={styles.metaText}>
                        Author
                    </VibeText>
                </>
            );
        }
        return(null);
    };
    return (
        <View style={styles.commentsContainer}>
            <Fleet
            size={32}
            imageUri={avatar[avatarName]}
            storyAvailable={true}
            watched={false}
            watchBorder={false}
            borderWidth={2}
            />
            <View style={styles.content}>

                <View style={styles.metaContainer}>
                    <VibeText weight="Medium" style={[styles.metaText,{color:"#000"}]}>
                        {username} {" "}
                    </VibeText>
                    <VibeText weight="Medium" 
                    style={styles.metaText}>
                        {timestamp} {" "}
                    </VibeText>
                    {authorText()}
                </View>

                <View style={styles.textContainer}>
                    <VibeText weight="Regular" style={styles.commentText}>
                        {text}
                    </VibeText>
                </View>

                <TouchableOpacity>
                    <VibeText weight="Medium" style={styles.replyText}>
                        Reply
                    </VibeText>
                </TouchableOpacity>

            </View> 
            
            <View style={styles.feedbackContainer}>
                <TouchableOpacity>
                    <Feather
                    name="heart"
                    size={20}
                    color={"#8A8A8A"}
                    />
                </TouchableOpacity>
                <VibeText weight="Medium" style={styles.metricText}>
                    {numberOfLikes}
                </VibeText>
            </View>

        </View>
 
    );
}

const styles = StyleSheet.create({
    commentsContainer:{
        flex:1,
        flexDirection:"row",
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
        marginTop:15,
        marginRight:15
    },
    metricText:{
        fontSize:11,
        color:"#6E6E6E"
    }
})

export default Comments;