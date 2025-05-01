import { Video } from "expo-av";
import React, { useRef } from 'react';
import { StyleSheet, View } from "react-native";

function VideoPlayer({sourceUri, height}) {
    const video=useRef(null);
    return (
        <View style={{width:"100%", height}}>
            <Video
                ref={video}
                source={{uri:sourceUri}}
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
    }
})
export default VideoPlayer;