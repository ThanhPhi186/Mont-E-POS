import React, {forwardRef, memo, useImperativeHandle, useState} from 'react';
import styled from 'styled-components/native';
import {View, ViewProps} from 'react-native';
import Icons from '@/Icons';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';

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

const ModalBottomSheet = forwardRef(
  (
    {
      title,
      viewProps,
      children,
    }: {
      title: string;
      viewProps?: ViewProps;
      children?: React.ReactElement;
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
        isVisible={isVisible}
        onBackButtonPress={onRequestClose}
        propagateSwipe
        swipeDirection={'down'}
        onSwipeComplete={onRequestClose}
        onBackdropPress={onRequestClose}>
        <Wrapper {...viewProps}>
          <HeaderWrapper>
            <Title>{title}</Title>
            <CloseButton onPress={onRequestClose}>
              <CloseIcon source={Icons.icClose} />
            </CloseButton>
          </HeaderWrapper>
          {children}
        </Wrapper>
      </SModal>
    );
  },
);

export default memo(ModalBottomSheet);
