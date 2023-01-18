import SVGIcon from '@/Icons/SVGIcon';
import React, {memo} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import listNavigation from './listNavigation';

const Wrapper = styled.View`
  border-radius: 12px;
  margin: 24px;
  margin-bottom: 0;
`;

const Navigation = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ItemWrapper = styled(TouchableOpacity)`
  background-color: #fff;
  width: 48%;
  align-items: center;
  margin-top: 4%;
  padding-top: 24px;
  border-radius: 16px;
`;

const Text = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #1c1c1e;
`;

const Label = styled(Text)<{color: string}>`
  font-weight: 700;
  text-align: center;
  height: 40px;
  margin-top: 24px;
  color: ${p => p.color};
`;

const Item = memo(
  ({
    label,
    iconName,
    color,
    ...props
  }: {
    label: string;
    iconName: any;
    color: string;
  } & TouchableOpacityProps) => {
    return (
      <ItemWrapper {...props}>
        <SVGIcon name={iconName} />
        <Label color={color}>{label}</Label>
      </ItemWrapper>
    );
  },
);

const NavigationSection = memo(function () {
  return (
    <Wrapper>
      <Navigation>
        {listNavigation.map((item, index) => (
          <Item
            onPress={() => Actions.push(item.screen)}
            key={index.toString()}
            {...item}
          />
        ))}
      </Navigation>
    </Wrapper>
  );
});

export default NavigationSection;
