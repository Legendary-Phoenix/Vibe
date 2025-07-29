import usePostStore from '@/store/postStore';
import api from "@/utils/axios.js";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as VideoThumbnails from 'expo-video-thumbnails';
import { memo, useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

function Thumbnail({postData, isVisible, onPressThumbnail}) {
    const [publicUrl, setPublicUrl]=useState("");
    const [loading, setLoading]=useState(false);
    const [thumbnailUri, setThumbnailUri]=useState("");
    const setTargetPostID = usePostStore((state) => state.setTargetPostID);
    const router=useRouter();
    const firstMediaPath=postData.media[0].mediaPath;
    const firstMediaType=postData.media[0].mediaType;
    const renderAspectRatio=postData.media[0].renderAspectRatio;
    const postType=postData.posttype;
    const aspectRatio=renderAspectRatio==="9:16" ? 9/16 : 4/5;

    const fetchPublicUrl=useCallback(async()=>{
        if (loading || publicUrl || !isVisible) return;
        const formattedMediaPath=postType==="Feed" ? firstMediaPath.split("feed/")[1] 
            : firstMediaPath.split("reels/")[1];
        const bucketName=postType==="Feed" ? "feed" : "reels";
        setLoading(true);
        try{
            const response= await api.get(`/public-url?bucketName=${bucketName}&mediaPath=${formattedMediaPath}`);
            const publicUrl=response.data.data.publicUrl;
            setPublicUrl(publicUrl);

            //generate thumbnail using library
            if (firstMediaType==="Video"){
                const {uri}=await VideoThumbnails.getThumbnailAsync(publicUrl, {time:1000});
                setThumbnailUri(uri);
            } else{
                setThumbnailUri(publicUrl);
            }
        } catch (error){
            console.error("Failed to fetch public url for media. Error:",error);
        } finally{
            setLoading(false);
        }
    },[loading, publicUrl, isVisible, firstMediaPath]);

    useEffect(() => {
        if (isVisible) {
            fetchPublicUrl();
        }
    }, [isVisible, publicUrl, loading]);

    const renderVideoIcon=useCallback(()=>{
        if (firstMediaType==="Video" && postType==="Feed"){
            return(
                <View style={{position:"absolute", top:8, right:10}}>
                    <MaterialIcons
                    name="video-library"
                    size={22}
                    color="#fff"
                    />
                </View>
            );
        }
        return;
    },[]);

    return (
        <View style={[styles.thumbnailWrapper,{aspectRatio: aspectRatio}]}>
            <TouchableOpacity
            onPress={() => {onPressThumbnail(postData.postid)}}
            >
                <Image
                    source={{ uri: thumbnailUri }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                />
                {renderVideoIcon()}
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    thumbnailWrapper: {
        flex: 1 / 3,
        margin: 1,
        backgroundColor:"#000",
    },
    thumbnail:{
        width:"100%",
        height:"100%"
    }
})
export default memo(Thumbnail);