import Clipboard from '@react-native-community/clipboard';
import React, {memo, useCallback} from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  padding: 24px;
  background-color: ${p => p.theme.backgroundInput};
  border-radius: 12px;
  margin: 24px;
  margin-bottom: 0px;
`;

const RowItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
  background: ${p => p.theme.backgroundColor};
  border-radius: 12px;
  height: 44px;
`;

const CopyButton = styled.TouchableOpacity`
  justify-content: center;
  border-radius: 12px;
  background-color: ${p => p.theme.blue2};
  height: 96%;
  padding: 0 16px;
`;

const Title = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #1c1c1e;
`;

const Text = styled.Text`
  flex: 1;
  margin: 0 12px;
`;
const ButtonText = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
`;
// TODO
const storeUrl =
  Platform.OS === 'android'
    ? `https://play.google.com/store/apps/details?id=com.montesales`
    : `https://apps.apple.com/tt/app/mont-e-sales/id1600641850`;
const ContactSection = memo(function () {
  const onCopy = useCallback(() => {
    Clipboard.setString(storeUrl);
    global.showMessage('Đã sao chép thành công');
  }, []);
  return (
    <Wrapper>
      <Title>Chia sẻ với bạn bè</Title>
      <RowItem>
        <Text numberOfLines={1}>{storeUrl}</Text>
        <CopyButton onPress={onCopy}>
          <ButtonText>Sao chép</ButtonText>
        </CopyButton>
      </RowItem>
    </Wrapper>
  );
});

export default ContactSection;
