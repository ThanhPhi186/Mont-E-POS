import {BOTTOM_SPACE, verticalScale} from '@/utils/Tranform';
import React, {memo, useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import DynamicInput from '@/components/DynamicInput';
import SubmitButton from '@/components/SubmitButton';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {checkCompany} from '@/store/auth/api';
import {setStringItem} from '@/services/storage/AsyncStorageService';
import {STORE_KEY} from '@/constants/variableConstant';
import Fetch from '@/services/Fetch';
import {Actions} from 'react-native-router-flux';
import Bluebird from 'bluebird';

const Wrapper = styled(SafeAreaView)`
  flex: 1;
  background-color: ${p => p.theme.blueMain};
  align-items: center;
`;

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 16}px;
`;

const CenterView = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const SSubmitButton = styled(SubmitButton)`
  margin: 16px 24px;
  width: 100%;
`;

const SDynamicInput = styled(DynamicInput)`
  margin-top: ${verticalScale(48)}px;
`;

const IconLogo = styled.Image`
  margin-top: ${verticalScale(64)}px;
`;

const InputCompanyScreen = memo(() => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const saveDomain = useCallback(
    (domain: string) => {
      const fullDomain = domain.includes('http') ? domain : `https://${domain}`;
      setStringItem(STORE_KEY.CURRENT_DOMAIN, fullDomain);
      setStringItem(STORE_KEY.COMPANY_CODE, code);
      Fetch.api_url = fullDomain;
      Fetch.company_code = code;
      setStringItem(STORE_KEY.API_KEY, '');
      Fetch.api_key = '';

      Actions.push('login_screen');
    },
    [code],
  );

  const onSubmit = useCallback(async () => {
    global.showLoading();
    const domain = await checkCompany(code);
    global.hideLoading();
    !domain ? setMessage('Mã công ty không tồn tại') : saveDomain(domain);
  }, [code, saveDomain]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Wrapper>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? undefined : 'padding'}
          style={{flex: 1}}>
          <Container
            extraScrollHeight={Platform.OS == 'ios' ? -170 : 0}
            contentContainerStyle={{paddingBottom: 90}}>
            <CenterView>
              <IconLogo source={require('@/assets/logo/icon-logo-text.png')} />
              <SDynamicInput
                onChangeText={t => {
                  setCode(t.toLocaleLowerCase());
                  setMessage('');
                }}
                errorMessage={message}
                textInputProps={{
                  onFocus: () => setMessage(''),
                  placeholder: 'Nhập mã công ty',
                  value: code,
                }}
              />
              <SSubmitButton
                disabled={!(code.length > 3 && !message)}
                text="Tiếp theo"
                onPress={onSubmit}
              />
            </CenterView>
          </Container>
        </KeyboardAvoidingView>
      </Wrapper>
    </TouchableWithoutFeedback>
  );
});

export default InputCompanyScreen;
