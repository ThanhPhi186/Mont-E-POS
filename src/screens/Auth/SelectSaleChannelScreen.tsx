import DynamicInput from '@/components/DynamicInput';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import {STORE_KEY} from '@/constants/variableConstant';
import Fetch from '@/services/Fetch';
import {setStringItem} from '@/services/storage/AsyncStorageService';
import {openSalesShift} from '@/store/store/api';
import {IStoreItem} from '@/store/store/type';
import _ from 'lodash';
import React, {memo, useCallback, useState} from 'react';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import SelectChannel from './components/SelectChannel';
import SelectSalesShift from './components/SelectSalesShift';
import {startLogout} from '@/store/auth';
import ButtonBottom from '@/components/ButtonBottom';

const SScrollView = styled.ScrollView`
  padding: 0px 24px;
`;

const SButtonBottom = styled(ButtonBottom)``;

const SDynamicInput = styled(DynamicInput)`
  margin-top: 12px;
`;

const SelectSaleChannelScreen = memo(() => {
  const [channelSelected, setChanelSelected] = useState<IStoreItem>();
  const [salesShiftSelected, setSalesShiftSelected] = useState('');
  const [money, setMoney] = useState('0');

  const onSubmit = useCallback(async () => {
    const response = await openSalesShift(
      salesShiftSelected,
      `${channelSelected?.productStoreId}`,
      money.replace(/,/g, ''),
    );

    if (response) {
      Fetch.current_channel = response.terminalState;
      setStringItem(
        STORE_KEY.CURRENT_CHANNEL,
        JSON.stringify(response.terminalState),
      );
      Actions.reset('main');
    }
  }, [salesShiftSelected, channelSelected, money]);

  const onSelectChannel = productStoreId => {
    setChanelSelected(productStoreId);
  };

  const onSelectSalesShift = posId => {
    setSalesShiftSelected(posId);
  };

  const goBack = () => {
    startLogout();
  };

  return (
    <ScreenWithTitle onPressBack={goBack} title="Ca bán hàng" removePadding>
      <SScrollView>
        <SelectChannel
          onSelectChannel={onSelectChannel}
          selected={channelSelected?.productStoreId || ''}
        />
        <SelectSalesShift
          onSelectChannel={onSelectSalesShift}
          selected={salesShiftSelected}
          productStoreId={channelSelected?.productStoreId || ''}
        />
        <SDynamicInput
          label={'Số tiền'}
          placeholderStr="Vui lòng nhập"
          required
          onChangeText={setMoney}
          textInputProps={{value: money, keyboardType: 'number-pad'}}
          currency
        />
      </SScrollView>
      <SButtonBottom
        disabled={
          _.isEmpty(channelSelected) &&
          _.isEmpty(salesShiftSelected) &&
          _.isEmpty(money)
        }
        text={'Mở ca bán hàng'}
        onPress={onSubmit}
      />
    </ScreenWithTitle>
  );
});

export default SelectSaleChannelScreen;
