import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const {width}=Dimensions.get("window");

function VideoPlayer({source,videoWidth=width,videoHeight=width,contentFit="cover", isVisible=true}) {
    const [playerInitialized, setPlayerInitialized]=useState(false);
    //const playerRef=useRef(null);
    const player=useVideoPlayer(
        isVisible ? source:null,
        (player)=>{
            if (player && isVisible){
                player.loop=true;
                player.muted=false;
                //playerRef.current=player;
                setPlayerInitialized(true);
            }
        }
    );
    //might want to see to remove player ref later
    useEffect(()=>{
        if (!player) return;

        if (isVisible && playerInitialized){
            //play video when visible
            player.play();
        } else if (!isVisible && playerInitialized){
            //pause and mute when not visible
            player.pause();
            player.muted=true;
        }
        return()=>{};
    },[player, isVisible,playerInitialized]);

    return (
        <View style={styles.container}>
            <VideoView
            player={player}
            width={videoWidth}
            height={videoHeight}
            contentFit={contentFit}
            showControls={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        backgroundColor:"#000"
    },
})

export default VideoPlayer;