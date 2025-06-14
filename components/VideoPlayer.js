import { useVideoPlayer, VideoView } from "expo-video";
import { Dimensions, StyleSheet, View } from "react-native";

const {width}=Dimensions.get("window");

function VideoPlayer({source,videoWidth=width,videoHeight=width,contentFit="cover"}) {
    const player=useVideoPlayer(
        source,
        (player)=>{
            player.loop=true;
            player.play();
        }
    );
    return (
        <View style={styles.container}>
            <VideoView
            player={player}
            width={videoWidth}
            height={videoHeight}
            contentFit={contentFit}
            showControls
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