import api from "@/utils/axios.js";
import * as SecureStore from "expo-secure-store";
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
//import {debounce} from "lodash";

import Post from "./Post.js";


function PostFeed({ListHeaderComponent, postType="Feed", ownerAccountID=null, thumbnailOnly=false}) {
    const [post, setPost]=useState([]);
    const [loading, setLoading]=useState(false);
    const [nextCursor,setNextCursor]=useState(1);
    const [hasMore, setHasMore]=useState(true);
    const [visibleItems, setVisibleItems]=useState(new Set());

    //refs for managing requests and scroll behavior
    const requestRef = useRef({ pending: false });
    const flatListRef=useRef(null);
    const onEndReachedCalledDuringMomentum=useRef(false);
    const lastContentOffset=useRef(0);
    const scrollDirection=useRef("down");

    const fetchPost=useCallback(async ()=>{
        if (requestRef.pending || !hasMore) return;
        requestRef.current.pending = true;
        setLoading(true);

        try{
            let response;
            const accountID=await SecureStore.getItemAsync("accountID");
            if (!ownerAccountID){
                response=await api.get(`/post?accountID=${accountID}&cursorIndex=${nextCursor}
                    &postType=${postType}`);
            } else{
                response=await api.get(`/post?accountID=${accountID}&cursorIndex=${nextCursor}
                    &postType=Feed&ownerAccountID=${ownerAccountID}`);
            }

            //console.log("Post data fetched");
            const postData=response.data.data;

            if(postData.length>0){
                setNextCursor(response.data.nextCursor);
                setPost(prev => {
                    const existingIds = new Set(prev.map(p => p.postid));
                    const newPosts = postData.filter(p => !existingIds.has(p.postid));
                    return [...prev, ...newPosts];
                });
            } else{
                //console.log("No more post data available")
                setHasMore(false);
            }
        } catch (error){
            if (error.response?.data?.errorMessage) {
                console.error("Error fetching posts:", error.response?.data?.errorMessage);
            } else {
                console.error("Network or unknown error:", error.message || error);
            }
        } finally {
            setLoading(false);
            //debouncing
            setTimeout(() => {
                requestRef.current.pending = false;
            }, 1000); // lock for 1 second-prevents multiple refires
        }
    },[nextCursor,hasMore]);

    //viewport detection to allow for lazy loading
    const onViewableItemsChanged=useCallback(({viewableItems})=>{
        const newVisibleItems=new Set(
            viewableItems
                .filter(item=>item.isViewable && item.item)
                .map(item=>item.item.postid)
        );
        setVisibleItems(newVisibleItems);
    },[]);
    //what counts as visible
    const viewabilityConfig={
        itemVisiblePercentThreshold:50,
        minimumViewTime: 50 //50ms
    };

    //onEndReached with proper momentum handling
    const onEndReached=useCallback(()=>{
        if (!onEndReachedCalledDuringMomentum.current && hasMore && !loading){
            //console.log("onEndReached called");
            fetchPost();
            onEndReachedCalledDuringMomentum.current=true;
        }
    },[hasMore, loading]);

    const onMomentumScrollBegin=useCallback(()=>{
        onEndReachedCalledDuringMomentum.current=false;
    },[]);

    const renderPostItem=useCallback(({item})=>{
        const isVisible=visibleItems.has(item.postid);
        return <Post postData={item} isVisible={isVisible}/>;
    },[visibleItems]);
    
    const keyExtractor=useCallback((item)=>item.postid,[]);

    useEffect(()=>{
        fetchPost();
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
        <FlatList
        data={post}
        keyExtractor={keyExtractor}
        renderItem={renderPostItem}

        //subject to change-performance optimization
        initialNumToRender={3}
        maxToRenderPerBatch={5} 
        //updateCellsBatchingPeriod={50} 
        windowSize={10}
        removeClippedSubviews={true}

        //viewport detection
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}

        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}

        //pagination
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        onMomentumScrollBegin={onMomentumScrollBegin}
        scrollEventThrottle={16}
        />
    );
}
const styles = StyleSheet.create({
    footerLoader:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})
export default memo(PostFeed);