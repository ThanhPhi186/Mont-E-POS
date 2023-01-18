import React, { memo, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import Icons from '@/Icons';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Actions } from 'react-native-router-flux';
import { Animated, Platform, View, ViewProps } from 'react-native';
import { analytics } from '@/global';

const Wrapper = styled(View)<{ customStyle?: string; hideBorder?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-top: ${getStatusBarHeight() + (Platform.OS === 'ios' ? 16 : 8)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${p => (p.hideBorder ? 'transparent' : '#242426')};
  ${p => p.customStyle};
`;
const Text = styled.Text`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
`;

const Button = styled.TouchableOpacity<{ customStyle?: string }>`
  border-radius: 30.5px;
  padding: 4px;
  width: 70px;
  ${p => p.customStyle}
`;

const Icon = styled.Image`
  height: 24px;
  width: 24px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const CenterView = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const RightSection = styled.View`
  min-width: 80px;
  align-items: flex-end;
  justify-content: center;
`;

const DynamicHeader = memo(function ({
  title,
  rightElement,
  onBackPress,
  customStyle,
  subTitleElement,
  hideBorder,
  eventName,
  close,
  scrollY = 0,
  haveAnim = false,
  ...props
}: {
  title?: string;
  rightElement?: any;
  onBackPress?: () => void;
  customStyle?: string;
  eventName?: string;
  subTitleElement?: any;
  hideBorder?: boolean;
  close?: boolean;
  scrollY?: number;
  haveAnim?: boolean;
} & ViewProps) {
  const scrollAnimValue = useRef(new Animated.Value(0));
  const height = 55;
  const totalHeight = getStatusBarHeight() || 0 + height;

  useEffect(() => {
    scrollAnimValue.current.setValue(scrollY);
  }, [scrollY]);

  const headerTranslate = scrollAnimValue.current.interpolate({
    inputRange: [0, height],
    outputRange: [-totalHeight, 0],
    extrapolate: 'clamp',
  });

  const opacityTranslate = scrollAnimValue.current.interpolate({
    inputRange: [0, (totalHeight * 2) / 3, height],
    outputRange: [0, 0.5, 1],
  });

  return (
    <Wrapper {...props} customStyle={customStyle} hideBorder={hideBorder}>
      <Row>
        <Button
          onPress={() => {
            if (eventName) analytics().logEvent(eventName);
            if (onBackPress) return onBackPress();
            Actions.pop();
          }}>
          <Icon source={close ? Icons.icClose : Icons.icBack} />
        </Button>
        <CenterView
          style={[
            haveAnim && { transform: [{ translateY: headerTranslate }] },
            { opacity: haveAnim ? opacityTranslate : 1 },
          ]}>
          <Text numberOfLines={1}>{title}</Text>
          {subTitleElement}
        </CenterView>
        <RightSection>{rightElement}</RightSection>
      </Row>
    </Wrapper>
  );
});

export default DynamicHeader;
