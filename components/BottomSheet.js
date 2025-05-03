import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BottomSheet = ({
  isVisible = false,
  onClose = () => {},
  height = '50%',
  children,
  backgroundColor = '#fff',
  borderRadius = 20,
  indicatorColor = '#DDDDDD',
  overlayColor = 'rgba(0, 0, 0, 0.5)',
}) => {
  // Convert height to numeric value
  const sheetHeight = typeof height === 'string' && height.includes('%')
    ? SCREEN_HEIGHT * (parseInt(height) / 100)
    : typeof height === 'string'
      ? parseInt(height)
      : height;

  const translateY = useRef(new Animated.Value(sheetHeight)).current;
  const dismissThreshold = sheetHeight * 0.25;

  useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        tension: 50,
        friction: 16,
        overshootClamping: true,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > dismissThreshold) {
          closeSheet();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            tension: 50,
            friction: 16,
            overshootClamping: true,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: sheetHeight,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={closeSheet}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={closeSheet}>
          <View style={[styles.overlay, { backgroundColor: overlayColor }]} />
        </TouchableWithoutFeedback>
        
        <Animated.View
          style={[
            styles.sheetContainer,
            {
              height: sheetHeight,
              backgroundColor,
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
              transform: [{ translateY }],
            },
          ]}
        >
          {/* Handle indicator */}
          <View style={styles.indicatorContainer} {...panResponder.panHandlers}>
            <View style={[styles.indicator, { backgroundColor: indicatorColor }]} />
          </View>
          
          {/* Content */}
          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  sheetContainer: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 16,
  },
  indicatorContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  indicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    //paddingHorizontal: 16,
  },
});

export default BottomSheet;