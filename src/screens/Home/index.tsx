import {STORE_KEY} from '@/constants/variableConstant';
import Fetch from '@/services/Fetch';
import {removeKey, setStringItem} from '@/services/storage/AsyncStorageService';
import {getCurrentSalesShift} from '@/store/store/api';
import {LIST_PADDING_BOTTOM} from '@/utils/Tranform';
import React, {memo, useEffect, useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import NavigationSection from './components/NavigationSection';
import RevShareSection from './components/RevShareSection';
import UserSection from './components/UserSection';
const Wrapper = styled.View`
  flex: 1;
  background-color: ${p => p.theme.backgroundColor};
`;

function Home() {
  const [loading, setLoading] = useState(false);

  const getTerminal = async () => {
    const response = await getCurrentSalesShift();
    if (response?.terminalState) {
      Fetch.current_channel = response?.terminalState;
      setStringItem(
        STORE_KEY.CURRENT_CHANNEL,
        JSON.stringify(response?.terminalState),
      );
    } else {
      Fetch.current_channel = undefined;
      await removeKey(STORE_KEY.CURRENT_CHANNEL);
      Actions.reset('root');
    }
  };

  useEffect(() => {
    getTerminal();
  }, []);

  return (
    <Wrapper>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              Actions.refresh({random: Math.random()});
              setLoading(true);
              setTimeout(() => setLoading(false), 1000);
            }}
            refreshing={loading}
            tintColor="#fff"
            colors={['#000']}
            progressViewOffset={getStatusBarHeight()}
          />
        }
        contentContainerStyle={{paddingBottom: LIST_PADDING_BOTTOM}}>
        <UserSection />
        <RevShareSection />
        <NavigationSection />
      </ScrollView>
    </Wrapper>
  );
}

export default memo(Home);
