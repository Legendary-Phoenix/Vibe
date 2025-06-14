import api from "@/utils/axios.js";
import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
//import {debounce} from "lodash";

import FleetBar from "../../components/FleetBar.js";
import Post from "../../components/Post.js";
import SafeView from "../../components/SafeView.js";

function HomeScreen() {
    const [post, setPost]=useState([]);
    const [loading, setLoading]=useState(false);
    const [nextCursor,setNextCursor]=useState(1);
   
    const fetchPost=async ()=>{
        setLoading(true);
        const accountID=await SecureStore.getItemAsync("accountID");
        console.log("AccountID:",accountID);
        try{
            const response=await api.get(`/post?accountID=${accountID}&cursorIndex=${nextCursor}
                &postType=Feed`);
            console.log("Post data fetched");
            setLoading(false);
            setNextCursor(response.data.nextCursor);
            setPost(response.data.data);
            console.log("Post Data:",response.data.data);
        } catch (error){
            setLoading(false);
            if (error.response?.data?.errorMessage) {
                console.error("Error fetching data:", error.response.data.errorMessage);
            } else {
                console.error("Network or unknown error:", error.message || error);
            }
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
    return (
        <SafeView style={styles.container}>
            <FlatList
            data={post}
            keyExtractor={item => item.postid}
            renderItem={({item})=><Post postData={item}/>}
            ListHeaderComponent={ListHeaderComponent}
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


