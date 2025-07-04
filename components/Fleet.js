import api from "@/utils/axios.js";
import { memo, useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';

function Fleet({size, storyData=null, imagePath, storyAvailable, watched, borderWidth=2, borderRatio=8}) {
    const [watchStatus, setWatchStatus]=useState(watched);
    const [publicUrl, setPublicUrl]=useState("");

    const fetchPublicUrl=async()=>{
        try{
            const response= await api.get(`/public-url?bucketName=avatars&mediaPath=${imagePath}`);
            const publicUrl=response.data.data.publicUrl;
            setPublicUrl(publicUrl);
        } catch (error){
            console.error("Failed to fetch public url for media. Error:",error);
        }
    };

    useEffect(()=>{
        fetchPublicUrl();
    },[]);

    const updateWatchStatus = () => {
        if (!watchStatus) {
          setWatchStatus(true);
        }
      }
    const borderStyle= () => {
        if (!storyAvailable){
            return {};
        }

        return {
            borderRadius: 50,
            borderColor: watchStatus ? "#C0C0C0" : "dodgerblue",
            borderWidth,
            padding:1.5
        };
    };

    return (
        <TouchableOpacity 
        onPress={updateWatchStatus}
        style={[{
            width: size+borderRatio,
            height: size+borderRatio,
            alignItems:"center",
            justifyContent: "center",
        },
        borderStyle()
        ]}>
            <Image
            source={{uri:publicUrl}}
            style={{width: size,height: size,borderRadius:50}}
            />
        </TouchableOpacity>
    );
}

export default memo(Fleet);