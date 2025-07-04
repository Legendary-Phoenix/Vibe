import api from "@/utils/axios.js";
import * as SecureStore from "expo-secure-store";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import Fleet from "./Fleet.js";


function FleetBar() {
    const [story, setStory]=useState([]);
    const [loading,setLoading]=useState(false);
    const [nextCursor,setNextCursor]=useState(new Date().toISOString());
    const [hasMore,setHasMore]=useState(true);

    const requestRef=useRef({pending:false});
    const onEndReachedCalledDuringMomentum=useRef(false);

    const fetchStory=useCallback(async ()=>{
        if (requestRef.pending || !hasMore) return;
        requestRef.current.pending = true;
        setLoading(true);

        try{
            const accountID=await SecureStore.getItemAsync("accountID");
            const response=await api.get(`/post/story?accountID=${accountID}&cursorIndex=${nextCursor}&limit=${5}`);

            console.log("Story data fetched"); //debug
            const storyData=response.data.data;
            //console.log("Story Data: ",storyData); //debug
            if(storyData.length>0){
                setNextCursor(response.data.nextCursor);
                setStory(prev => {
                    const existingIds = new Set(prev.map(s => s.postid));
                    const newStory = storyData.filter(s => !existingIds.has(s.postid));
                    return [...prev, ...newStory];
                });
            } else{
                console.log("No more story data available")
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

    const onEndReached=useCallback(()=>{
            if (!onEndReachedCalledDuringMomentum.current && hasMore && !loading){
                console.log("onEndReached called for story");
                fetchStory();
                onEndReachedCalledDuringMomentum.current=true;
            }
    },[hasMore, loading]);
    
    const onMomentumScrollBegin=useCallback(()=>{
        onEndReachedCalledDuringMomentum.current=false;
    },[]);

    const renderStoryItem=useCallback(({item})=>{
        return(
            <View style={{marginRight:10}}>
                <Fleet
                size={60}
                imagePath={item.fleet.avatarpath}
                storyAvailable={item.fleet.isstoryavailable}
                watched={item.fleet.iswatched}
                storyData={item}
                borderWidth={3}
                borderRatio={10}
                />
            </View>
        )
    },[]);

    const ListFooterComponent=useCallback(()=>{
        if(loading){
            return(
                <View style={{flex:1, alignItems:"center",justifyContent:"center"}}>
                    <ActivityIndicator size="small" color="#000" />
                </View>
            );
        }
        return null;
    },[loading]);
    
    const keyExtractor=useCallback((item)=>item.postid,[]);

    useEffect(()=>{
        fetchStory();
    },[]);

    return (
        <View style={styles.container}>
            <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}

            data={story}
            keyExtractor={keyExtractor}
            renderItem={renderStoryItem}
            contentContainerStyle={{justifyContent:"space-evenly", alignItems:"flex-start", 
                paddingLeft:15, paddingRight:5
            }}
            ListFooterComponent={ListFooterComponent}

            onEndReachedThreshold={0.5}
            onEndReached={onEndReached}
            onMomentumScrollBegin={onMomentumScrollBegin}
            scrollEventThrottle={16}
            />
            
            {/* <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
                {justifyContent:"space-evenly", alignItems:"flex-start", 
                paddingLeft:15, paddingRight:5
                }}>
                {
                    Object.values(avatar).map(avatar=>(
                        <View style={{marginRight:10}}>
                            <FleetLegacy
                            size={60}
                            imagePath={avatar}
                            storyAvailable={true}
                            watched={false}
                            watchBorder={true}
                            borderWidth={3}
                            borderRatio={10}
                            />
                        </View>
                                            
                ))};
            </ScrollView> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginBottom:5
    }
})

export default memo(FleetBar);