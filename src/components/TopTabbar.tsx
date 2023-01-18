import React, { memo, useEffect, useCallback, useRef, useMemo } from 'react';
import styled from 'styled-components/native';
import {
  Animated,
  TouchableOpacityProps,
  ViewProps,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import _ from 'lodash';
import { widthScreen } from '@/utils/Tranform';
import { ScrollView } from 'react-native-gesture-handler';

const Wrapper = styled(View)<{ customStyle?: string }>`
  flex-direction: row;
  height: 46px;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #1c1c1e;
  justify-content: space-around;
  padding: 0 12px;
  ${p => p.customStyle}
`;

const TabWrapper = styled(TouchableOpacity)<{ customStyle?: string }>`
  height: 100%;
  align-items: center;
  justify-content: center;
  ${p => p.customStyle}
`;

const TabText = styled.Text<{ isActive: boolean }>`
  text-align: center;
  font-weight: ${p => (p.isActive ? 600 : 400)};
  font-size: 16px;
  color: ${p => (p.isActive ? '#fff' : '#C7C7CC')};
`;

const LineBottom = styled(Animated.View)`
  height: 4px;
  border-radius: 4px;
  background: ${p => p.theme.orange};
  width: 80px;
  position: absolute;
  bottom: 0;
`;

const TextWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const NotiDot = styled.View`
  background: #fff;
  border-radius: 8px;
  width: 6px;
  height: 6px;
  margin-left: 4px;
`;

const NotiWrapper = styled.View`
  background: #fff;
  border-radius: 6px;
  padding: 0 2px;
  min-width: 12px;
  height: 12px;
  align-items: center;
  margin-left: 4px;
`;

const NotiText = styled.Text`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #000;
`;

const Tab = memo(function ({
  text,
  isActive,
  customStyle,
  textstyle,
  onPress,
  onInitLayout,
  onLoadDone,
  numOfNoti,
  maxOfTab,
  ...props
}: {
  text: string;
  isActive: boolean;
  customStyle?: string;
  onPress: (x: number) => void;
  textstyle?: TextStyle;
  numOfNoti?: number | boolean;
  onLoadDone?: (offset: number) => void;
  onInitLayout?: (offset: number) => void;
  maxOfTab: number;
} & TouchableOpacityProps) {
  const aniWidth = useMemo(() => {
    return new Animated.Value(0);
  }, []);
  const offset = useRef(0);

  useEffect(() => {
    Animated.timing(aniWidth, {
      toValue: isActive ? 1 : 0,
      duration: 120,
      useNativeDriver: false,
    }).start();
  }, [aniWidth, isActive]);
  return (
    <TabWrapper
      customStyle={customStyle}
      style={
        maxOfTab < 4
          ? { width: (widthScreen - 48) / maxOfTab }
          : { marginLeft: 24 }
      }
      onLayout={({
        nativeEvent: {
          layout: { x, width },
        },
      }) => {
        offset.current = x - widthScreen / 2 + width / 2;
        onLoadDone?.(offset.current);
        if (isActive)
          setTimeout(() => {
            onInitLayout?.(offset.current);
          }, 100);
      }}
      {...props}
      onPress={() => onPress(offset.current)}>
      <TextWrapper>
        <TabText
          style={{ ...textstyle, backgroundColor: 'transparent' }}
          isActive={isActive}>
          {text}
        </TabText>
        {!!numOfNoti && numOfNoti !== -1 && typeof numOfNoti === 'boolean' && (
          <NotiDot />
        )}
        {!!numOfNoti && numOfNoti !== -1 && typeof numOfNoti === 'number' && (
          <NotiWrapper>
            <NotiText>{numOfNoti > 9 ? '9+' : numOfNoti}</NotiText>
          </NotiWrapper>
        )}
      </TextWrapper>
      <LineBottom
        style={{
          width: aniWidth.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '80%'],
          }),
          ...textstyle,
        }}
      />
    </TabWrapper>
  );
});

const List = styled(ScrollView)<{ customStyle?: string }>`
  width: 100%;
  height: 100%;
  ${p => p.customStyle}
`;

const ListContainer = styled.View`
  flex-direction: row;
  height: 45px;
`;

const TopTabbar = memo(function ({
  listTab,
  onPress,
  currentTab,
  customStyle,
  textstyle,
  scrollEnable,
  withOffset,
  ...props
}: {
  currentTab: number;
  customStyle?: string;
  scrollEnable?: boolean;
  textstyle?: TextStyle;
  withOffset?: boolean;
  listTab: { label: string; numOfNoti?: number | boolean }[];
  onPress: (index: number) => void;
} & ViewProps) {
  const listRef = useRef<ScrollView | null>(null);
  const currentOffset = useRef(0);
  const listOffset = useRef<number[]>([]);

  const sOnPress = useCallback(
    (offset: any, index: number) => {
      if (offset) {
        currentOffset.current = offset;
      }
      if (index !== currentTab) {
        onPress(index);
      }
    },
    [onPress, currentTab],
  );

  useEffect(() => {
    const tmpOffset = listOffset.current[currentTab];
    if (tmpOffset) currentOffset.current = tmpOffset;
    onLayoutChange();
  }, [currentTab]);

  const onTabLoadDone = useCallback((x: number, index: number) => {
    listOffset.current[index] = x;
  }, []);

  const onLayoutChange = useCallback(
    (offset?: number) => {
      if (offset) currentOffset.current = offset;
      if (listRef.current) {
        setTimeout(() => {
          if (listRef.current && currentTab < listTab.length) {
            listRef.current.scrollTo({ x: currentOffset.current });
          }
        }, 20);
      }
    },
    [currentTab],
  );

  return (
    <Wrapper customStyle={customStyle} {...props}>
      <List ref={listRef} horizontal showsHorizontalScrollIndicator={false}>
        <ListContainer>
          {listTab.map((tab, index) => (
            <Tab
              key={tab.label + '-' + tab.numOfNoti}
              textstyle={textstyle}
              numOfNoti={tab.numOfNoti}
              text={tab.label}
              isActive={currentTab === index}
              onPress={x => sOnPress(x, index)}
              onInitLayout={onLayoutChange}
              onLoadDone={x => {
                onTabLoadDone(x, index);
              }}
              maxOfTab={listTab.length}
            />
          ))}
        </ListContainer>
      </List>
    </Wrapper>
  );
});

export default TopTabbar;
