import React, {memo, useEffect, useState, useRef, useCallback} from 'react';
import styled from 'styled-components/native';
import {
  ImageSourcePropType,
  TouchableOpacityProps,
  Animated,
  Keyboard,
  ImageBackground,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {BOTTOM_SPACE, widthScreen} from '@/utils/Tranform';
import LinearGradient from 'react-native-linear-gradient';

export const Wrapper = styled(Animated.View)<{customStyle?: string}>`
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 1;
  background-color: transparent;
  overflow: hidden;
  shadow-color: 'black';
  ${p => p.customStyle};
`;

const BackgroundContainer = styled(ImageBackground)`
  justify-content: flex-end;
`;

const Container = styled.View`
  padding-top: 8px;
  padding-bottom: ${BOTTOM_SPACE}px;

  width: 100%;
`;

const Row = styled.View`
  flex-direction: row;
  width: 100%;
`;

const ItemWrapper = styled.TouchableOpacity<{
  customStyle?: string;
}>`
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  ${p => p.customStyle}
`;

const ItemImage = styled.Image<{active: boolean}>`
  tint-color: ${p => (p.active ? p.theme.blueMain : '#8E8E93')};
`;

const HighlightImage = styled.Image``;

const ItemName = styled.Text<{isActive?: boolean}>`
  font-size: 12px;
  color: ${p => (p.isActive ? p.theme.blueMain : '#8E8E93')};
  line-height: 16px;
  margin: 4px 0;
`;

const ItemContainer = styled.View<{active: boolean}>`
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;

const LineNearView = styled(LinearGradient)`
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const Item = memo(function Item({
  icon,
  activeIcon,
  name,
  isActive,
  index,
  customStyle,
  onActive,
  ...props
}: {
  icon: ImageSourcePropType;
  activeIcon: ImageSourcePropType;
  name: string | undefined;
  customStyle?: string;
  index?: number;
  isActive: boolean;
  onActive: () => void;
} & TouchableOpacityProps) {
  useEffect(() => {
    isActive && onActive();
  }, [isActive]);

  return (
    // @ts-ignore
    <ItemWrapper {...props} customStyle={customStyle}>
      <ItemContainer active={isActive}>
        {index === 2 ? (
          <HighlightImage source={icon} />
        ) : (
          <ItemImage source={icon} active={isActive} />
        )}
        <ItemName isActive={isActive}>{name}</ItemName>
      </ItemContainer>
    </ItemWrapper>
  );
});

export type BottomBarProps = {
  navigation?: {
    state: {
      index: number;
      routes: Array<any>;
    };
  };
};
const BottomBar = memo(function BottomBar({
  navigation = {state: {index: 0, routes: []}},
}: BottomBarProps) {
  const [show, setShow] = useState(true);
  const [index, setIndex] = useState(0);
  const [background, setBackground] = useState('');
  const ani = useRef(new Animated.Value(100)).current;
  useEffect(() => {
    if (show) {
      return Animated.timing(ani, {
        toValue: 200,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
    Animated.timing(ani, {
      toValue: -50,
      duration: 1,
      useNativeDriver: false,
    }).start();
  }, [ani, show]);

  const onItemActive = useCallback((item: any, _index: number) => {
    setIndex(_index);
    !!item.backgroundColor && setBackground(item.backgroundColor);
  }, []);

  if (!navigation) return null;

  const routes = navigation.state?.routes || [];

  return (
    <Wrapper
      style={{
        maxHeight: ani,
        backgroundColor: background,
      }}>
      <BackgroundContainer
        source={require('@/assets/navigation/item-background.png')}>
        <Container>
          <Row>
            {routes.map((itemScene, _index) => {
              const item = itemScene.routes[0].params;
              const key = itemScene.key;
              const isActive = navigation.state.index === _index;

              return (
                <Item
                  index={_index}
                  key={key}
                  isActive={isActive}
                  icon={item.icon}
                  activeIcon={item.activeIcon}
                  name={item.tabTitle}
                  onActive={() => onItemActive(item, _index)}
                  onPress={() => {
                    if (item.tabBarOnPress) {
                      item.tabBarOnPress();
                    } else {
                      Actions[key]();
                    }
                  }}
                />
              );
            })}
          </Row>
        </Container>
      </BackgroundContainer>
    </Wrapper>
  );
});

export default BottomBar;
