import { Video } from "expo-av";
import React, { useRef } from 'react';
import { StyleSheet, View } from "react-native";

function VideoPlayerLegacy({sourceUri, height}) {
    const video=useRef(null);
    return (
        <View style={{width:"100%",paddingBottom: '125%', // 4:5 ratio (5/4 = 1.25)
            position: 'relative',}}>
            <Video
                ref={video}
                source={{uri:sourceUri}}
                //source={require("../assets/images/bucks-bunny-clip-2.mp4")}
                //source={require("../assets/images/family-time 4-5 pad black.mp4")}
                //source={require("../assets/images/processed_bucks-bunny-clip-2.mp4")}
                style={styles.video}
                useNativeControls
                resizeMode="cover"
                isLooping
                shouldPlay
            />
        </View>
    );
}
const styles = StyleSheet.create({
    video: {
        flex: 1,
        position: 'absolute', // Ensures the video stays within the container bounds
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
})
export default VideoPlayerLegacy;