import SVGIcon from '@/Icons/SVGIcon';
import React, { memo } from 'react';
import { Linking } from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  padding: 24px;
  background-color: #fff;
  border-radius: 12px;
  margin: 24px;
  margin-bottom: 0px;
`;

const RowItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

const ButtonLabel = styled.Text`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
  margin-top: 8px;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
`;

const Title = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #1c1c1e;
`;

const ContactSection = memo(function () {
  return (
    <Wrapper>
      <Title>Liên hệ với chúng tôi</Title>
      <RowItem>
        <Button onPress={() => Linking.openURL('tel:+84988993333')}>
          <SVGIcon name="ic-contact-phone" />
          <ButtonLabel>Điện thoại</ButtonLabel>
        </Button>
        <Button
          onPress={() =>
            Linking.openURL(
              'https://www.facebook.com/messages/t/ductrung.nguyen.779',
            )
          }>
          <SVGIcon name="ic-contact-messenger" />
          <ButtonLabel>Messeger</ButtonLabel>
        </Button>
        <Button onPress={() => Linking.openURL('https://zalo.me/0988993333')}>
          <SVGIcon name="ic-contact-zalo" />
          <ButtonLabel>Zalo</ButtonLabel>
        </Button>
      </RowItem>
    </Wrapper>
  );
});

export default ContactSection;
