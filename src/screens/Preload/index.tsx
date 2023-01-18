import React, {memo, useCallback, useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-community/async-storage';
// import {fromPairs} from 'lodash';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';
import {getVersion} from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import {STORE_KEY} from '@/constants/variableConstant';
import AsyncStorage from '@react-native-community/async-storage';
import Fetch from '@/services/Fetch';
import {initial} from './utils';
import {fromPairs} from 'lodash';

const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
  background: ${p => p.theme.blueMain};
  flex: 1;
`;

const Logo = styled.Image``;

const MainView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TextVersion = styled.Text`
  font-weight: normal;
  font-size: 12px;
  text-align: center;
  color: #fff;
  margin-bottom: 20px;
`;

const Preload = memo(() => {
  const init = useCallback(async () => {
    console.log('start init');
    const localData = await AsyncStorage.multiGet([
      STORE_KEY.CURRENT_DOMAIN,
      STORE_KEY.COMPANY_CODE,
      STORE_KEY.CURRENT_CHANNEL,
      STORE_KEY.CURRENT_USER,
      STORE_KEY.CURRENT_USERNAME,
      STORE_KEY.API_KEY,
    ]);

    const data = fromPairs(localData);

    initial(data);

    const loggedIn = !!data[STORE_KEY.CURRENT_USER];

    if (!Fetch.api_url) {
      return Actions.replace('input_company_screen');
    }

    if (!loggedIn) {
      return Actions.replace('login_screen');
    }

    if (!Fetch.current_channel) {
      return Actions.replace('select_sale_channel');
    }

    Actions.reset('main');

    SplashScreen.hide();
  }, []);

  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <MainView>
        <Logo source={require('@/assets/logo/icon-logo-monte.png')} />
      </MainView>
      <TextVersion />
      <TextVersion>Version {getVersion()}</TextVersion>
    </Wrapper>
  );
});

export default Preload;
