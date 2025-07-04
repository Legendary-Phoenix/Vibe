import { memo, useCallback, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, StyleSheet, View } from 'react-native';
import MediaItem from './MediaItem';
const { width } = Dimensions.get('window');

function MediaCarousel ({ mediaData, isVisible=false }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex]=useState(0);

  const onScroll=useCallback(
    Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
      { 
        useNativeDriver: false ,
        listener: (event) => {
          const offsetX=event.nativeEvent.contentOffset.x;
          const index=Math.round(offsetX/width);
          setCurrentIndex(index);
        }
      }
    ),[]);

  const renderMediaItem=useCallback(({item, index})=>(
    <MediaItem 
      mediaPath={item.mediaPath} 
      mediaType={item.mediaType} 
      renderAspectRatio={item.renderAspectRatio}
      cropOption={item.cropOption}
      isVisible={isVisible}
      isFocused={index===currentIndex}
    />
  ), [isVisible,currentIndex]);

  const keyExtractor=useCallback((_,index)=>index.toString(),[]);
    
  return (
    <View style={
        {
            marginTop: mediaData[0]["renderAspectRatio"]==="4:5" ? -55 : 0,
            zIndex:2,
        }
    }>
      <FlatList
        data={mediaData}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}

        renderItem={renderMediaItem}
        onScroll={onScroll}
        //to change
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews={true}
        scrollEventThrottle={16}
      />
      {mediaData.length>1&&(
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        zIndex:1
    },
    dot: {
        height: 6,
        borderRadius: 3,
        backgroundColor: '#fff',
        marginHorizontal: 4,
        zIndex:1
    },
});

export default memo(MediaCarousel);