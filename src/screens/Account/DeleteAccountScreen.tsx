import DynamicInput from '@/components/DynamicInput';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import SubmitButton from '@/components/SubmitButton';
import {deleteAccount} from '@/store/auth/api';
import React, {memo, useCallback, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import styled from 'styled-components/native';
import {startLogout} from '@/store/auth';

const SScrollView = styled.ScrollView``;

const Form = styled(KeyboardAvoidingView)`
  flex: 1;
  margin-top: 12px;
`;

const SDynamicInput = styled(DynamicInput)`
  margin-top: 12px;
`;
const SSubmitButton = styled(SubmitButton)`
  margin-top: 24px;
`;

export const DeleteAccountScreen = memo(() => {
  const [username, setUserName] = useState('');
  const [pwd, setPwd] = useState('');

  const onSubmit = useCallback(async () => {
    global.showLoading();
    const {success} = await deleteAccount(username, pwd);

    global.hideLoading();
    if (success) {
      global.showMessage('Xoá tài khoản thành công');
      startLogout();
    }
  }, [username, pwd]);

  return (
    <ScreenWithTitle title="Xoá tài khoản">
      <SScrollView>
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
          <SSubmitButton
            disabled={!username || !pwd}
            text="Hoàn tất"
            onPress={onSubmit}
          />
        </Form>
      </SScrollView>
    </ScreenWithTitle>
  );
});
