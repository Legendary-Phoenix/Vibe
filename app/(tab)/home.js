import api from "@/utils/axios.js";
import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
//import {debounce} from "lodash";

import FleetBar from "../../components/FleetBar.js";
import Post from "../../components/Post.js";
import SafeView from "../../components/SafeView.js";

function HomeScreen() {
    const [post, setPost]=useState([]);
    const [loading, setLoading]=useState(false);
    const [nextCursor,setNextCursor]=useState(1);
    const [hasMore, setHasMore]=useState(true);
    const requestRef = useRef({ pending: false }).current;
   
    const fetchPost=async ()=>{
        if (requestRef.pending) return;
        requestRef.pending = true;

        setLoading(true);
        const accountID=await SecureStore.getItemAsync("accountID");

        try{
            const response=await api.get(`/post?accountID=${accountID}&cursorIndex=${nextCursor}
                &postType=Feed`);
            console.log("Post data fetched");
            setLoading(false);
            const postData=response.data.data;
            if(postData.length!==0){
                setNextCursor(response.data.nextCursor);
                setPost(prev => {
                    const existingIds = new Set(prev.map(p => p.postid));
                    const newPosts = response.data.data.filter(p => !existingIds.has(p.postid));
                    return [...prev, ...newPosts];
                });
            } else{
                console.log("No more post data available")
                setHasMore(false);
            }
        } catch (error){
            setLoading(false);
            if (error.response?.data?.errorMessage) {
                console.error("Error fetching data:", error.response.data.errorMessage);
            } else {
                console.error("Network or unknown error:", error.message || error);
            }
        } finally {
            setTimeout(() => {
                requestRef.pending = false;
            }, 1000); // lock for 1 second-prevents multiple refires
        }
    }

    useEffect(()=>{
        fetchPost();
    },[]);

    const ListHeaderComponent=()=>{
        return(
            <>
                <View style={styles.header}>

                    <View style={styles.vibeContainer}>
                        <Image
                        source={require("../../assets/images/vibe.png")}
                        style={styles.vibeImage}
                        />
                        <TouchableOpacity>
                            <Entypo
                            name="chevron-down"
                            size={18}
                            color={"#000"}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.headerIcon}>
                        <TouchableOpacity>
                                <Feather
                                name="heart"
                                size={24}
                                color={"#000"}
                                />
                            </TouchableOpacity>
                        <TouchableOpacity style={styles.messageIcon}>
                            <Ionicons
                            name="chatbubble-ellipses-outline"
                            size={24}
                            color={"#000"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <FleetBar/>
            </>
        );
    }

    const renderPostItem = useCallback(({ item }) => {
        return <Post postData={item} />;
    }, []);

    return (
        <SafeView style={styles.container}>
            <FlatList
            data={post}
            keyExtractor={item => item.postid}
            renderItem={renderPostItem}
            initialNumToRender={5}
            maxToRenderPerBatch={5} 
            updateCellsBatchingPeriod={100} 
            windowSize={10}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={() => loading ? <ActivityIndicator size="small"/> : null}
            onEndReachedThreshold={0.8}
            onEndReached={()=>{
                console.log("onEndReached called");
                if (hasMore && !loading){
                    fetchPost();
                }
            }}
            />
            
        </SafeView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#fff",
    },
    header:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",

    },
    vibeContainer:{
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:10
    },
    vibeImage:{
        width:80,
        height:80,
    },
    headerIcon:{
        flexDirection:"row",
    },
    messageIcon:{
        paddingHorizontal:20
    },
})

export default HomeScreen;


