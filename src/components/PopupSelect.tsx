import React, {forwardRef, memo, useImperativeHandle, useState} from 'react';
import styled from 'styled-components/native';
import {View, ViewProps} from 'react-native';
import Icons from '@/Icons';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Theme from '@/Colors';
import Modal from 'react-native-modal';
import {height} from '@/global';

// @ts-ignore
const SModal = styled(Modal)`
  margin: 0px;
  justify-content: flex-end;
  margin-top: ${getStatusBarHeight()}px;
` as unknown as typeof Modal;

const Wrapper = styled(View)`
  border-radius: 16px;
  padding-top: 16px;
  padding-bottom: 24px;
  background: #fff;
  min-height: ${height * 0.4};
  max-height: ${height * 0.9}; ;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-align: center;

  color: #1c1c1e;
`;

const CloseIcon = styled.Image``;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  padding: 4px;
  z-index: 1;
`;

const HeaderWrapper = styled.View`
  padding-bottom: 4px;
`;

const SFlatList = styled.FlatList`
  border-top-color: ${Theme.border};
`;

const PopupSelect = forwardRef(
  (
    {
      title,
      data,
      renderItem,
      renderTopComponent,
      viewProps,
      visibleProps,
      onCloseProps,
    }: {
      title: string;
      renderItem: any;
      data: any[];
      renderTopComponent?: React.ReactElement | React.ReactElement[];
      viewProps?: ViewProps;
      visibleProps?: boolean;
      onCloseProps?: () => void;
    },
    ref?: React.Ref<any>,
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    const onRequestClose = () => setIsVisible(false);

    useImperativeHandle(
      ref,
      () => ({
        open: () => setIsVisible(true),
        close: () => setIsVisible(false),
      }),
      [],
    );

    return (
      <SModal
        isVisible={visibleProps ?? isVisible}
        onBackButtonPress={onCloseProps ?? onRequestClose}
        propagateSwipe
        swipeDirection={'down'}
        onSwipeComplete={onCloseProps ?? onRequestClose}
        onBackdropPress={onCloseProps ?? onRequestClose}>
        <Wrapper {...viewProps}>
          <HeaderWrapper>
            <Title>{title}</Title>
            <CloseButton onPress={onCloseProps ?? onRequestClose}>
              <CloseIcon source={Icons.icClose} />
            </CloseButton>
          </HeaderWrapper>
          {renderTopComponent && renderTopComponent}
          <SFlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={20}
          />
        </Wrapper>
      </SModal>
    );
  },
);

export default memo(PopupSelect);
