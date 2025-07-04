import * as SecureStore from "expo-secure-store";
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import api from '@/utils/axios.js';
import BreakerLine from './BreakerLine.js';
import Comments from "./Comments.js";
import VibeText from "./VibeText.js";

function CommentsSection ({postID,ownerAccountID}) {
    const [comment, setComment]=useState([]);
    const [loading, setLoading]=useState(false);
    const [nextCursor, setNextCursor]=useState(new Date().toISOString());
    const [hasMore, setHasMore]=useState(true);

    const requestRef=useRef({pending:false});
    const onEndReachedCalledDuringMomentum=useRef(false);

    const fetchComments=useCallback(async ()=>{
        if (requestRef.pending || !hasMore) return;
        requestRef.current.pending=true;
        setLoading(true);

        try{
            const accountID=await SecureStore.getItemAsync("accountID");
            const response=await api.get(`/comment?accountID=${accountID}&postID=${postID}
                &cursorIndex=${nextCursor}`);
            
            console.log("Comments data fetched") //debug
            const commentsData=response.data.data;

            if(commentsData.length>0){
                setNextCursor(response.data.nextCursor);
                setComment(prev=>{
                    const existingIds = new Set(prev.map(c => c.commentid));
                    const newComments = commentsData.filter(c => !existingIds.has(c.commentid));
                    return [...prev, ...newComments];
                });
            } else{
                console.log("No more comments data available"); //debug
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
            setTimeout(()=>{
                requestRef.current.pending=false;
            },1000);
        }

    }, [nextCursor, hasMore]);
    
    const onEndReached=useCallback(()=>{
        if (!onEndReachedCalledDuringMomentum.current && hasMore && !loading){
            console.log("onEndReached for comments called"); //debug
            fetchComments();
            onEndReachedCalledDuringMomentum.current=true;
        }
    },[hasMore, loading]);

    const onMomentumScrollBegin=useCallback(()=>{
        onEndReachedCalledDuringMomentum.current=false;
    },[]);

    const renderCommentItem=useCallback(({item})=>{
        return(
            <Comments
            commentData={item}
            postID={postID}
            ownerAccountID={ownerAccountID}
            />
        )
    },[]);

    const keyExtractor=useCallback((item)=>item.commentid,[]);

    useEffect(()=>{
        fetchComments();
    },[]);

    const ListFooterComponent=useCallback(()=>{
        if(loading){
            return(
                <View style={styles.footerLoader}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            );
        }
        return null;
    },[loading]);

    return (
        <View style={{flex:1}}>
            <VibeText weight="Bold" style={styles.titleText}>
                Comments
            </VibeText>
            <BreakerLine marginVertical={15}/>
            <FlatList
            data={comment}
            keyExtractor={keyExtractor}
            renderItem={renderCommentItem}

            ListFooterComponent={ListFooterComponent}

            //pagination
            onEndReachedThreshold={0.5}
            onEndReached={onEndReached}
            onMomentumScrollBegin={onMomentumScrollBegin}
            scrollEventThrottle={16}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    titleText:{
        alignSelf:"center",
    },
    footerLoader:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})

export default memo(CommentsSection);