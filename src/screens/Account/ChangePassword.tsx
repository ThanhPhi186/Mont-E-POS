import ButtonChecked from '@/components/ButtonChecked';
import DynamicInput from '@/components/DynamicInput';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import SubmitButton from '@/components/SubmitButton';
import {Title} from '@/components/TextCommon';
import {STORE_KEY} from '@/constants/variableConstant';
import Fetch from '@/services/Fetch';
import {
  getStringItem,
  setObjectItem,
  setStringItem,
} from '@/services/storage/AsyncStorageService';
import {postLogin, updatePassword} from '@/store/auth/api';
import {setSetting} from '@/store/settings/functions';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, SafeAreaView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${p => p.theme.blueMain};
`;

const Container = styled(SafeAreaView)`
  flex: 1;
`;

const STitle = styled(Title)`
  margin: 24px;
`;

const SScrollView = styled.ScrollView``;

const CompanyKey = styled.Text`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  flex: 1;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ChangeText = styled.Text`
  color: ${p => p.theme.blue2};
  font-weight: 700;
`;

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

const SButtonChecked = styled(ButtonChecked)`
  margin-top: 16px;
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
