import DynamicInput from '@/components/DynamicInput';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import {LIST_PADDING_BOTTOM} from '@/utils/Tranform';
import React, {memo, useEffect, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import styled from 'styled-components/native';
import {Actions} from 'react-native-router-flux';
import {ICustomerDetail} from '@/store/customers/types';
import ButtonBottom from '@/components/ButtonBottom';

const SScrollView = styled.ScrollView`
  flex: 1;
  padding: 0px 24px;
`;
const Form = styled(KeyboardAvoidingView)`
  flex: 1;
`;

const SDynamicInput = styled(DynamicInput)`
  margin-top: 12px;
`;
const SButtonBottom = styled(ButtonBottom)``;

function CompanyRegister({customer}: {customer: ICustomerDetail}) {
  const [customerName, setCustomerName] = useState(customer?.fullName ?? '');
  const [phone, setPhone] = useState(customer?.telecomNumber ?? '');
  const [tarAddress, setTarAddress] = useState(customer?.postalAddress ?? '');
  const [address1, setAddress1] = useState('');

  const [address2, setAddress2] = useState('');

  const [errorMess, setErrorMess] = useState('');

  const createCustomer = async () => {
    const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/g;
    if (!regex.test(phone)) {
      setErrorMess('Số điện thoại không đúng định dạng');
      return;
    }
    global.showLoading();
    setTimeout(() => {
      global.hideLoading();
      global.showMessage(
        'Đăng ký thành công, chúng tôi sẽ liên hệ lại cho bạn sớm nhất',
      );
      Actions.pop();
    }, 500);
  };

  useEffect(() => {
    errorMess && setErrorMess('');
  }, [phone]);

  return (
    <ScreenWithTitle removePadding title={'Đăng ký khách hàng'}>
      <SScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LIST_PADDING_BOTTOM,
        }}>
        <Form>
          <SDynamicInput
            label={'Tên khách hàng'}
            placeholderStr="Vui lòng nhập"
            onChangeText={setCustomerName}
            textInputProps={{value: customerName}}
          />
          <SDynamicInput
            label={'Số điện thoại'}
            placeholderStr="Vui lòng nhập"
            onChangeText={setPhone}
            required
            errorMessage={errorMess}
            textInputProps={{value: phone, keyboardType: 'number-pad'}}
          />
          <SDynamicInput
            label={'Tỉnh / Thành phố'}
            placeholderStr="Vui lòng nhập"
            onChangeText={setTarAddress}
            textInputProps={{value: tarAddress}}
          />
          <SDynamicInput
            label={'Quận / Huyện'}
            placeholderStr="Vui lòng nhập"
            onChangeText={setAddress1}
            textInputProps={{value: address1}}
          />
          <SDynamicInput
            label={'Xã / Phường'}
            placeholderStr="Vui lòng nhập"
            onChangeText={setAddress2}
            textInputProps={{value: address2}}
          />
        </Form>
      </SScrollView>
      <SButtonBottom
        disabled={!phone}
        text="Hoàn tất"
        onPress={createCustomer}
      />
    </ScreenWithTitle>
  );
}

export default memo(CompanyRegister);
