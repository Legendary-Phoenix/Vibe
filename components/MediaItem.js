import api from "@/utils/axios.js";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import VideoPlayer from "./VideoPlayer.js";
const { width } = Dimensions.get('window');

function MediaItem({mediaPath,mediaType, renderAspectRatio,cropOption}) {
    const [publicUrl,setPublicUrl]=useState("");
    const cropType=cropOption==="Fit" ? "contain" : "cover";

    const fetchPublicUrl=async()=>{
        const formattedMediaPath=mediaPath.split("feed/")[1];
        try{
            const response= await api.get(`/public-url?bucketName=feed&mediaPath=${formattedMediaPath}`);
            const publicUrl=response.data.data.publicUrl;
            setPublicUrl(publicUrl);
            console.log("Public Url:",publicUrl);
        } catch (error){
            console.error("Failed to fetch public url for media. Error:",error);
        }
    };

    const getRelativeHeight=()=>{
        if (renderAspectRatio==="1:1"){
            return width;
        } 
        if (renderAspectRatio==="4:5"){
            return width*1.25;
        } 
    };


    useEffect(()=>{
        const init=async()=>{
            await fetchPublicUrl();
        };
        init();
    },[]);

    const renderImage=()=>(
        <View style={styles.imageContainer}>
            <Image
            source={{uri:publicUrl}}
            style={{
                width:width,
                height:getRelativeHeight(),
                resizeMode: cropType
            }}
            />
        </View>
    );

    const renderVideo=()=>(
        <VideoPlayer
        source={publicUrl}
        height={getRelativeHeight()}
        contentFit={cropType}
        />
    );

    return (
       <>
        {mediaType==="Image" ? renderImage() : renderVideo()}
       </>
    );
}
const styles = StyleSheet.create({
    imageContainer:{
        width:"100%",
        backgroundColor:"#000",
  },
})
export default MediaItem;