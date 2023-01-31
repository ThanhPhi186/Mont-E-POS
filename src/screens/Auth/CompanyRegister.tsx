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
  const [username, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [phone, setPhone] = useState(customer?.telecomNumber ?? '');

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
            label={'Tên đăng nhập'}
            placeholderStr="NVB000"
            onChangeText={setUserName}
            textInputProps={{
              value: username,
              style: {textTransform: 'uppercase'},
              autoCapitalize: 'characters',
            }}
          />
          <SDynamicInput
            label={'Mật khẩu'}
            isPassword
            placeholderStr="Mật khẩu"
            onChangeText={setPwd}
            textInputProps={{value: pwd}}
          />
          <SDynamicInput
            label={'Số điện thoại'}
            placeholderStr="Vui lòng nhập"
            onChangeText={setPhone}
            required
            errorMessage={errorMess}
            textInputProps={{value: phone, keyboardType: 'number-pad'}}
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
