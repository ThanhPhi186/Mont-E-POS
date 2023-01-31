import DynamicInput from '@/components/DynamicInput';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import SubmitButton from '@/components/SubmitButton';
import {STORE_KEY} from '@/constants/variableConstant';
import {
  getStringItem,
  setStringItem,
} from '@/services/storage/AsyncStorageService';
import {updatePassword} from '@/store/auth/api';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';

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

const ChangePasswordScreen = memo(() => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [message, setMessage] = useState('');

  const checkDataSave = useCallback(async () => {
    const passSave = await getStringItem(STORE_KEY.CURRENT_PASSWORD, '');
    passSave && setStringItem(STORE_KEY.CURRENT_PASSWORD, newPass);
  }, [newPass]);

  const onSubmit = useCallback(async () => {
    global.showLoading();
    const {updateSuccessful} = await updatePassword({
      oldPassword: oldPass,
      newPassword: newPass,
      newPasswordVerify: confirmPass,
    });
    global.hideLoading();
    updateSuccessful && checkDataSave();

    updateSuccessful && Actions.pop();
  }, [oldPass, newPass, confirmPass, checkDataSave]);

  useEffect(() => {
    setMessage('');
  }, [oldPass, newPass, confirmPass]);

  return (
    <ScreenWithTitle title="Đổi mật khẩu">
      <SScrollView>
        <Form>
          <SDynamicInput
            label={'Mật khẩu cũ'}
            isPassword
            placeholderStr="Vui lòng nhập"
            onChangeText={setOldPass}
            hasError={!!message}
            textInputProps={{
              value: oldPass,
            }}
          />
          <SDynamicInput
            label={'Mật khẩu mới'}
            isPassword
            placeholderStr="Vui lòng nhập"
            onChangeText={setNewPass}
            validateMessage={message}
            textInputProps={{value: newPass}}
          />
          <SDynamicInput
            label={'Xác nhận mật khẩu'}
            isPassword
            placeholderStr="Vui lòng nhập"
            onChangeText={setConfirmPass}
            validateMessage={message}
            textInputProps={{value: confirmPass}}
          />
          <SSubmitButton
            disabled={!oldPass || !newPass || !confirmPass || !!message}
            text="Hoàn tất"
            onPress={onSubmit}
          />
        </Form>
      </SScrollView>
    </ScreenWithTitle>
  );
});

export default ChangePasswordScreen;
