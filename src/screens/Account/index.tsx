import SubmitButton from '@/components/SubmitButton';
import Icons from '@/Icons';
import {startLogout} from '@/store/auth';
import {LIST_PADDING_BOTTOM} from '@/utils/Tranform';
import React, {memo, useCallback} from 'react';
import {ScrollView} from 'react-native';
import {getVersion} from 'react-native-device-info';
import styled from 'styled-components/native';
import ListComponents from './components/ListComponents';
import {listProfileItem} from './components/listItems';
import UserSection from './components/UserSection';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${p => p.theme.backgroundColor};
`;

const SSubmitButton = styled(SubmitButton)`
  margin: 24px;
  margin-bottom: 0;
`;

const Version = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #8e8e93;
  margin-top: 24px;
  width: 100%;
  text-align: center;
`;

function Account() {
  const onLogout = useCallback(() => {
    global.showAlert({
      title: 'Đăng xuất tài khoản',
      description: 'Bạn có chắc chắn muốn đăng xuất?',
      textCancel: 'Hủy',
      textNext: 'Xác nhận',
      cancelStyle: {
        background: '#fff',
      },
      onNext: () => {
        startLogout();
      },
    });
  }, []);

  return (
    <Wrapper>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: LIST_PADDING_BOTTOM}}>
        <UserSection />
        <ListComponents list={listProfileItem} />
        <SSubmitButton
          leftIcon={Icons.icLogout}
          onPress={onLogout}
          text="Đăng xuất"
        />
        <Version>Phiên bản: {getVersion()}</Version>
      </ScrollView>
    </Wrapper>
  );
}

export default memo(Account);
