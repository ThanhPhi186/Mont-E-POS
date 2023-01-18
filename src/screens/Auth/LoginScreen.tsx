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
import {postLogin} from '@/store/auth/api';
import {setSetting} from '@/store/settings/functions';
import {getCurrentSalesShift} from '@/store/store/api';
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

const TxtRegister = styled.Text`
  color: ${p => p.theme.blue2};
  font-weight: 500;
  font-style: italic;
`;

const SButton = styled.TouchableOpacity`
  margin-top: 16px;
  align-items: center;
`;

const LoginScreen = memo(() => {
  const [username, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [message, setMessage] = useState('');
  const savePwd = useRef(false);

  const loginSuccess = useCallback(
    (data, currentSalesShift) => {
      setSetting('me', data);
      setObjectItem(STORE_KEY.CURRENT_USER, data);
      setStringItem(STORE_KEY.CURRENT_USERNAME, username);
      savePwd.current && setStringItem(STORE_KEY.CURRENT_PASSWORD, pwd);
      if (currentSalesShift) {
        Fetch.current_channel = currentSalesShift;
        setStringItem(
          STORE_KEY.CURRENT_CHANNEL,
          JSON.stringify(currentSalesShift),
        );
        Actions.reset('main');
      } else {
        Actions.push('select_sale_channel');
      }
    },
    [username, pwd],
  );

  const onSubmit = useCallback(async () => {
    global.showLoading();
    Fetch.api_key = '';
    const {data, message: errorMessage} = await postLogin(username, pwd);
    global.hideLoading();

    if (data) {
      const currentSalesShift = await getCurrentSalesShift();
      loginSuccess(data, currentSalesShift?.terminalState);
    }

    errorMessage && setMessage(errorMessage);
  }, [username, pwd, loginSuccess]);

  const onCheckSave = useCallback((status: boolean) => {
    savePwd.current = status;
  }, []);

  const getDataSave = useCallback(async () => {
    const userSave = await getStringItem(STORE_KEY.CURRENT_USERNAME, '');
    setUserName(userSave);
    const passSave = await getStringItem(STORE_KEY.CURRENT_PASSWORD, '');
    setPwd(passSave);
  }, []);

  useEffect(() => {
    getDataSave();
  }, []);

  useEffect(() => {
    setMessage('');
  }, [username, pwd]);

  return (
    <ScreenWithTitle hideBack title="Đăng nhập">
      <SScrollView>
        <Row>
          <CompanyKey>Mã công ty: {Fetch.company_code}</CompanyKey>
          <ChangeText
            onPress={() => {
              Fetch.company_code = '';
              Fetch.api_url = '';
              Actions.replace('input_company_screen');
            }}>
            Thay đổi
          </ChangeText>
        </Row>
        <Form>
          <SDynamicInput
            label={'Tên đăng nhập'}
            placeholderStr="NVB000"
            onChangeText={setUserName}
            hasError={!!message}
            textInputProps={{
              value: username,
              style: {textTransform: 'uppercase'},
              autoCapitalize: 'characters',
            }}
          />
          <SDynamicInput
            label={'Mật khẩu'}
            isPassword
            placeholderStr="NVB000"
            onChangeText={setPwd}
            validateMessage={message}
            textInputProps={{value: pwd}}
          />
          <SButtonChecked
            label="Ghi nhớ mật khẩu"
            onChangeStatus={onCheckSave}
          />
          <SSubmitButton
            disabled={!username || !pwd || !!message}
            text="Đăng nhập"
            onPress={onSubmit}
          />
        </Form>
        <SButton onPress={() => Actions.push('company_register')}>
          <TxtRegister>Đăng ký để sử dụng cùng Mont-E!</TxtRegister>
        </SButton>
      </SScrollView>
    </ScreenWithTitle>
  );
});

export default LoginScreen;
