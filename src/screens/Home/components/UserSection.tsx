import DynamicInput from '@/components/DynamicInput';
import ModalBottomSheet from '@/components/ModalBottomSheet';
import SubmitButton from '@/components/SubmitButton';
import {height} from '@/global';
import Icons from '@/Icons';
import SVGIcon from '@/Icons/SVGIcon';
import Fetch from '@/services/Fetch';
import {startLogout, useMe} from '@/store/auth';
import {closeSalesShift} from '@/store/store/api';
import React, {memo, useRef, useState} from 'react';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Wrapper = styled(Row)`
  flex-direction: row;
  align-items: center;
  margin-top: ${getStatusBarHeight()}px;
  padding: 24px;
  padding-right: 0;
`;
const AvatarWrapper = styled.View`
  background-color: ${p => p.theme.blueMain};
  height: 44px;
  width: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
`;

const AvatarIcon = styled.Image``;

const Column = styled.View`
  margin-left: 12px;
  flex: 1;
`;

const Hello = styled.Text`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;

  color: #8e8e93;
`;

const UserCode = styled.Text`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;

  color: ${p => p.theme.black};
`;

const ChannelButton = styled.TouchableOpacity`
  padding: 8px 8px 8px 16px;
  background: ${p => p.theme.blue2};
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  flex-direction: row;
  align-items: center;
`;

const ChannelText = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  margin-right: 4px; ;
`;

const WrapperModal = styled.View`
  padding: 0px 16px;
  height: ${height * 0.6}; ;
`;

const SDynamicInput = styled(DynamicInput)`
  margin-top: 12px;
`;

const SPaymentButton = styled(SubmitButton)`
  margin-top: 12px;
`;

const UserSection = memo(function () {
  const user = useMe();
  const channel = Fetch.current_channel;
  const [money, setMoney] = useState('0');

  const modalCLoseRef = useRef<any>(null);

  const onChangeChannel = () => {
    modalCLoseRef.current.open();
  };

  const onChangeMoney = e => {
    setMoney(e);
  };

  const onCloseTerminate = async () => {
    const response = await closeSalesShift(money.replace(/,/g, ''));
    console.log('onCloseTerminate', response);

    modalCLoseRef.current.close();

    if (response) {
      startLogout();
    }
  };

  return (
    <Wrapper>
      <Row>
        <AvatarWrapper>
          <AvatarIcon source={Icons.icAvatar} />
        </AvatarWrapper>
        <Column>
          <UserCode>{user.username}</UserCode>
          <Hello>{channel?.productStoreId}</Hello>
        </Column>
        <ChannelButton onPress={onChangeChannel}>
          <ChannelText>Đóng ca</ChannelText>
          <SVGIcon name="ic-arrow-right" />
        </ChannelButton>
      </Row>
      <ModalBottomSheet title="Đóng ca" ref={modalCLoseRef}>
        <WrapperModal>
          <SDynamicInput
            label="Tổng số tiền trong ca"
            placeholderStr="0"
            onChangeText={onChangeMoney}
            textInputProps={{value: money, keyboardType: 'number-pad'}}
            required
            inputTheme="dark"
            currency
          />
          <SPaymentButton text="Hoàn tất" onPress={onCloseTerminate} />
        </WrapperModal>
      </ModalBottomSheet>
    </Wrapper>
  );
});

export default UserSection;
