import api from "@/utils/axios.js";
import { memo, useCallback, useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { useScreenFocus } from "../app/context/ScreenFocusContext.js";
import VideoPlayer from "./VideoPlayer.js";
const { width} = Dimensions.get('window');

function MediaItem ({postType="Feed",mediaPath,mediaType, renderAspectRatio,cropOption, isVisible=false, isFocused}) {
    const [publicUrl,setPublicUrl]=useState("");
    const [loading,setLoading]=useState(false);
    const cropType=cropOption==="Fit" ? "contain" : "cover";
    const isScreenFocused=useScreenFocus();

    const fetchPublicUrl=useCallback(async()=>{
        if (loading || publicUrl || !isVisible) return;
        const formattedMediaPath=postType==="Feed" ? mediaPath.split("feed/")[1] 
            : mediaPath.split("reels/")[1];
        const bucketName=postType==="Feed" ? "feed" : "reels";
        setLoading(true);
        try{
            const response= await api.get(`/public-url?bucketName=${bucketName}&mediaPath=${formattedMediaPath}`);
            const publicUrl=response.data.data.publicUrl;
            setPublicUrl(publicUrl);
        } catch (error){
            console.error("Failed to fetch public url for media. Error:",error);
        } finally{
            setLoading(false);
        }
    },[loading, publicUrl, isVisible, mediaPath]);

    const getRelativeHeight=useCallback(()=>{
        if (renderAspectRatio==="1:1"){
            return width;
        } 
        if (renderAspectRatio==="4:5"){
            return width*1.5;
        } 
        if (renderAspectRatio==="9:16"){
            return width*(16/9);
        }
        return width;
    },[renderAspectRatio]);


    useEffect(()=>{
        if (isVisible && !publicUrl && !loading){
            fetchPublicUrl();
        }
    },[isVisible,publicUrl,loading]);

    const renderImage=()=>(
        <View style={styles.imageContainer}>
            <Image
            source={{uri:publicUrl}}
            style={{
                width:width,
                height:getRelativeHeight(),
                resizeMode:cropType
            }}
            />
        </View>
    );
        
        

    const renderVideo=()=>(
        <VideoPlayer
        source={publicUrl}
        videoHeight={getRelativeHeight()}
        contentFit={cropType}
        isVisible={isVisible&&isScreenFocused}
        />
    );

    return (
       <View>
           {mediaType==="Image" ? renderImage() : renderVideo()}
       </View>
    );
};

const styles = StyleSheet.create({
    imageContainer:{
        width:"100%",
        backgroundColor:"#000",
  },
})
export default memo(MediaItem);