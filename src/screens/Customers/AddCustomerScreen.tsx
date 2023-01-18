import DynamicInput from '@/components/DynamicInput';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import Fetch from '@/services/Fetch';
import {LIST_PADDING_BOTTOM} from '@/utils/Tranform';
import React, {memo, useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import styled from 'styled-components/native';
import ChooseAddress from './components/ChooseAddress';
import {postCreateCustomer, editCustomer} from '@/store/customers/api';
import {Actions} from 'react-native-router-flux';
import {IAddCustomerParams, ICustomerDetail} from '@/store/customers/types';
import Emitter from '@/utils/Emitter';
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

function AddCustomerScreen({customer}: {customer: ICustomerDetail}) {
  const [customerName, setCustomerName] = useState(customer?.fullName ?? '');
  const [phone, setPhone] = useState(customer?.telecomNumber ?? '');
  const [tarAddress, setTarAddress] = useState(customer?.postalAddress ?? '');
  const [errorMess, setErrorMess] = useState('');

  const refAddress = useRef<any>(null);

  const createCustomer = async () => {
    const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/g;
    if (!regex.test(phone)) {
      setErrorMess('Số điện thoại không đúng định dạng');
      return;
    }
    const params: IAddCustomerParams = {
      fullName: customerName,
      productStoreId: Fetch.current_channel?.productStoreId,
      countryGeoId: 'VNM',
      telecomNumber: phone,
      partyTypeEnumId: 'PtyPerson',
      tarAddress: tarAddress,
    };
    if (refAddress?.current?.province?.geoId) {
      params.stateProvinceGeoId = refAddress?.current?.province?.geoId;
    }
    if (refAddress?.current?.districts?.geoId) {
      params.districtId = refAddress?.current?.districts?.geoId;
    }
    if (refAddress?.current?.wards?.geoId) {
      params.wardGeoId = refAddress?.current?.wards?.geoId;
    }

    const response = customer
      ? await editCustomer(params, customer?.partyId)
      : await postCreateCustomer(params);

    if (response?.partyId) {
      Emitter.send(Emitter.UPDATE_LIST_CUSTOMER);
      Actions.pop();
      global.showMessage(
        customer
          ? 'Chỉnh sửa khách hàng thành công'
          : 'Tạo mới khách hàng thành công',
      );
    } else {
      global.showMessage(
        customer
          ? 'Chỉnh sửa khách hàng thất bại'
          : 'Tạo mới khách hàng thất bại',
      );
    }
  };

  useEffect(() => {
    errorMess && setErrorMess('');
  }, [phone]);

  return (
    <ScreenWithTitle
      removePadding
      title={customer ? 'Chỉnh sửa khách hàng' : 'Thêm mới khách hàng'}>
      <SScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: LIST_PADDING_BOTTOM,
        }}>
        <Form>
          <SDynamicInput
            label={'Tên khách hàng'}
            placeholderStr="Vui lòng nhập"
            required
            onChangeText={setCustomerName}
            textInputProps={{value: customerName}}
          />
          <SDynamicInput
            label={'Số điện thoại'}
            placeholderStr="Vui lòng nhập"
            onChangeText={setPhone}
            required
            errorMessage={errorMess}
            textInputProps={{value: phone, keyboardType: 'number-pad'}}
          />
          <ChooseAddress customer={customer} ref={refAddress} />
          <SDynamicInput
            label={'Số nhà/Đường'}
            placeholderStr="Vui lòng nhập"
            onChangeText={setTarAddress}
            textInputProps={{value: tarAddress}}
          />
        </Form>
      </SScrollView>
      <SButtonBottom
        disabled={!customerName || !phone}
        text="Hoàn tất"
        onPress={createCustomer}
      />
    </ScreenWithTitle>
  );
}

export default memo(AddCustomerScreen);
