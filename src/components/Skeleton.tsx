import Theme from '@/Colors';
import {widthScreen} from '@/utils/Tranform';
import React, {useEffect} from 'react';
import {Animated, Easing, View, ViewProps} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

const Wrapper = styled(View)`
  background-color: #a5a5a5;
  width: ${widthScreen}px;
  height: 200px;
  overflow: hidden;
  border-radius: 2px;
`;

const Skeleton = ({...props}: ViewProps) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 700,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-widthScreen, widthScreen],
  });

  return (
    <Wrapper {...props}>
      <AnimatedLG
        colors={['rgba(217, 217, 217, 0.5)', 'rgba(217, 217, 217, 0.1)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transform: [{translateX}],
        }}
      />
    </Wrapper>
  );
};

export default Skeleton;
