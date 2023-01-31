import React, {memo} from 'react';
import styled from 'styled-components/native';
import {TouchableOpacityProps, TouchableOpacity} from 'react-native';
import Icons from '@/Icons';
import {Actions} from 'react-native-router-flux';
import Theme from '@/Colors';

const Wrapper = styled.View`
  padding: 12px 24px;
  background-color: #fff;
  border-radius: 12px;
  margin: 24px;
  margin-bottom: 0px;
`;

const ItemRow = styled(TouchableOpacity)<{end?: boolean}>`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
  ${p =>
    !p.end &&
    `
    border-bottom-width: 1px;
    border-bottom-color: #F2F2F7;
  `}
`;

const Icon = styled.Image``;
const Title = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: #1c1c1e;
  margin-left: 8px;
  flex: 1;
`;

export const ItemProfileFooter = memo(function ({
  title,
  icon,
  screen,
  end,
  onItemPress,
  ...props
}: {
  title?: string;
  icon: any;
  screen?: string;
  end?: boolean;
  onItemPress?: () => void;
} & TouchableOpacityProps) {
  return (
    <ItemRow
      end={end}
      onPress={onItemPress || (() => screen && Actions.push(screen))}
      {...props}>
      <Icon style={{tintColor: Theme.blue2}} source={icon} />
      <Title>{title}</Title>
      <Icon source={Icons.icArrowRight24} />
    </ItemRow>
  );
});

const ListComponents = memo(function ({list}: {list: any[]}) {
  return (
    <Wrapper>
      {list.map((item, index) => (
        <ItemProfileFooter
          key={index.toString()}
          {...item}
          end={index === list.length - 1}
        />
      ))}
    </Wrapper>
  );
});

export default ListComponents;
