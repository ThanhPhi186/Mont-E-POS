import {Title} from '@/components/TextCommon';
import Icons from '@/Icons';
import React, {memo} from 'react';
import {View, ViewProps} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${p => p.theme.backgroundColor};
`;

const Container = styled.View`
  flex: 1;
  margin-top: ${getStatusBarHeight()}px;
`;

const STitle = styled(Title)`
  color: ${p => p.theme.black};
`;

const Body = styled(View)<{removePadding: boolean}>`
  background-color: ${p => p.theme.backgroundColor};
  flex: 1;
  padding: ${p => (p.removePadding ? '0px' : '24px')};
`;

const BackButton = styled.TouchableOpacity`
  margin-right: 12px;
  padding: 4px;
  padding-top: 8px;
  padding-left: 0;
`;

const IconBack = styled.Image``;

const RowTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;
const RowBetween = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 12px 24px 12px 24px;
`;

const ScreenWithTitle = memo(
  ({
    title,
    children,
    rightComponent,
    hideBack = false,
    onPressBack,
    renderBottomHeader,
    removePadding = false,
    ...bodyProps
  }: {
    title: string;
    children: any;
    rightComponent?: React.ReactElement | React.ReactElement[];
    hideBack?: boolean;
    onPressBack?: () => void;
    renderBottomHeader?: React.ReactElement | React.ReactElement[];
    removePadding?: boolean;
  } & ViewProps) => {
    return (
      <Wrapper>
        <Container>
          <RowBetween>
            <RowTitle>
              {!hideBack && (
                <BackButton
                  onPress={onPressBack ? onPressBack : () => Actions.pop()}>
                  <IconBack source={Icons.icon_back_black} />
                </BackButton>
              )}
              <STitle>{title}</STitle>
            </RowTitle>
            {rightComponent && rightComponent}
          </RowBetween>
          {renderBottomHeader && renderBottomHeader}
          <Body removePadding={removePadding} {...bodyProps}>
            {children}
          </Body>
        </Container>
      </Wrapper>
    );
  },
);

export default ScreenWithTitle;
