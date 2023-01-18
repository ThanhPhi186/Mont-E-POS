import React, {memo, useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import SubmitButton from '../SubmitButton';
import Theme from '@/Colors';

export interface IAlertType {
  title: string;
  description: string;
  onCancel?: () => void;
  onNext?: () => void;
  textCancel?: string;
  textNext?: string;
  nextStyle?: {textColor?: string; background?: string};
  cancelStyle?: {textColor?: string; background?: string};
  image?: any;
  imageSize?: number;
  doNotClose?: boolean;
}

// @ts-ignore
const SModal = styled(Modal)`
  margin: 0px;
  justify-content: center;
` as unknown as typeof Modal;

const Container = styled.View``;
const Wrapper = styled.View`
  background: #fff;
  border-radius: 12px;
  padding: 24px 16px 16px 16px;
  align-items: center;
  overflow: hidden;
  margin: 0 16px;
`;

const Title = styled.Text`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;

  color: #000;
`;

const Description = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin-top: 16px;
  text-align: center;
  color: #242426;
`;

const Footer = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;

const SSubmitButton = styled(SubmitButton)`
  flex: 1;
  margin: 0 4px;
`;

const Image = styled.Image<{size?: number}>`
  margin-top: 24px;
`;

const AlertPopup = memo(() => {
  const [content, setContent] = useState<IAlertType | null>(null);

  const sonClose = useCallback(() => {
    setContent(null);
    content?.onCancel?.();
  }, [content]);

  const backToClose = useCallback(() => {
    if (content?.doNotClose) return;
    sonClose();
  }, [content, sonClose]);

  const onNext = useCallback(() => {
    setContent(null);

    content?.onNext?.();
  }, [content]);

  useEffect(() => {
    global.showAlert = _content => setContent(_content);
  }, []);

  return (
    <SModal
      isVisible={!!content}
      propagateSwipe={true}
      swipeDirection="down"
      onBackdropPress={backToClose}
      onSwipeComplete={backToClose}
      onBackButtonPress={backToClose}>
      {!!content && (
        <Wrapper>
          <Title>{content.title}</Title>
          <Description>{content.description}</Description>
          {content.image && <Image source={content.image} />}
          <Footer>
            <SSubmitButton
              text={content.textCancel || 'Got it'}
              type="light-line"
              onPress={sonClose}
              textColor={content.cancelStyle?.textColor}
              background={content.cancelStyle?.background}
            />
            {!!content.textNext && (
              <SSubmitButton
                text={content.textNext}
                type="light"
                onPress={onNext}
                textColor={content.nextStyle?.textColor || '#fff'}
                background={content.nextStyle?.background || Theme.blue2}
              />
            )}
          </Footer>
        </Wrapper>
      )}
    </SModal>
  );
});

export default AlertPopup;
