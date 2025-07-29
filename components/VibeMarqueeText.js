import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import VibeText from "./VibeText";

const VibeMarqueeText = ({
  children,
  duration = 10000,
  loop = true,
  repeatSpacer = 50,
  weight,
  style,
  ...props
}) => {
  
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (shouldAnimate && containerWidth > 0 && textWidth > 0) {
      startAnimation();
    }
  }, [shouldAnimate, containerWidth, textWidth, duration, loop]);

  const startAnimation = () => {
    animatedValue.setValue(0);
    
    const distance = textWidth + repeatSpacer;
    
    const animation = Animated.timing(animatedValue, {
      toValue: -distance,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear, // Linear easing for consistent speed
    });

    if (loop) {
      Animated.loop(animation, { iterations: -1 }).start();
    } else {
      animation.start();
    }
  };

  const onContainerLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const onTextLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setTextWidth(width);
    setShouldAnimate(width > containerWidth);
  };

  const renderText = (key) => (
    <VibeText
      key={key}
      weight={weight}
      linesNumber={1}
      style={style}
      onLayout={key === 'main' ? onTextLayout : undefined}
      {...props}
    >
      {children}
    </VibeText>
  );

  return (
    <View style={{ overflow: 'hidden'}} onLayout={onContainerLayout}>
      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [{ translateX: shouldAnimate ? animatedValue : 0 }],
        }}
      >
        {renderText('main')}
        {shouldAnimate && loop && (
          <>
            <View style={{ width: repeatSpacer }} />
            {renderText('repeat')}
            <View style={{ width: repeatSpacer }} />
            {renderText('repeat2')}
          </>
        )}
      </Animated.View>
    </View>
  );
};

export default VibeMarqueeText;