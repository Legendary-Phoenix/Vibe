import { useRef } from 'react';
import { Animated, Dimensions, FlatList, StyleSheet, View } from 'react-native';
import MediaItem from './MediaItem';
const { width } = Dimensions.get('window');

function MediaCarousel({ mediaData }) {
  const scrollX = useRef(new Animated.Value(0)).current;
    
  return (
    <View style={
        {
            marginTop: mediaData[0]["renderAspectRatio"]==="4:5" ? -55 : 0,
            zIndex:1
        }
    }>
      <FlatList
        data={mediaData}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}

        renderItem={({item})=>
        <MediaItem 
        mediaPath={item.mediaPath} 
        mediaType={item.mediaType} 
        renderAspectRatio={item.renderAspectRatio}
        cropOption={item.cropOption}
        />}

        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
      <View style={styles.pagination}>
        {mediaData.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [6, 10, 6],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[styles.dot, { width: dotWidth, opacity }]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
    dot: {
        height: 6,
        borderRadius: 3,
        backgroundCpolor: '#fff',
        marginHorizontal: 4,
    },
});

export default MediaCarousel;