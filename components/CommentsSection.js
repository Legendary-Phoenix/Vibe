import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import commentsData from "../logic/commentsData.js";
import BreakerLine from './BreakerLine.js';
import Comments from "./Comments.js";
import VibeText from "./VibeText.js";

function CommentsSection(props) {
    return (
        <View style={{flex:1}}>
            <VibeText weight="Bold" style={styles.titleText}>
                Comments
            </VibeText>
            <BreakerLine marginVertical={15}/>
            <FlatList
            data={commentsData}
            keyExtractor={(item)=>item.commentsid}
            renderItem={({item}) => (
                <View style={styles.commentContainer}>
                    <Comments
                    postUserId={1}
                    userid={item.userid}
                    username={item.username}
                    avatarName={item.avatarName}
                    timestamp={item.timestamp}
                    text={item.text}
                    numberOfLikes={item.numberOfLikes}
                    />
                </View>
            )}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    titleText:{
        alignSelf:"center",
    },
    commentContainer:{
        flex:1,
        marginHorizontal:15,
        marginBottom:15
    }
})

export default CommentsSection;