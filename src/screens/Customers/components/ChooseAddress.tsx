import DynamicInput from '@/components/DynamicInput';
import PopupSelect from '@/components/PopupSelect';
import {height} from '@/global';
import Icons from '@/Icons';
import {fetchListAddress} from '@/store/customers/api';
import {ICustomerDetail, IListAddress} from '@/store/customers/types';
import {removeDiacritics} from '@/utils/convertString';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components/native';

const WrapperContainer = styled.View``;

const Wrapper = styled.TouchableOpacity`
  background: ${p => p.theme.backgroundInput};
  padding: 12px 16px;
  border-radius: 12px;
  flex-direction: row;
`;

const Label = styled.Text`
  color: #8e8e93;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  width: 100%;
  margin-bottom: 4px;
  margin-top: 12px;
`;

const TxtValue = styled.Text<{isValue: boolean}>`
  flex: 1;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${p => (p.isValue ? '#000' : '#aeaeb2')};
`;

const Icon = styled.Image``;

const CateWrapper = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px 24px;
  border-bottom-width: 1px;
  border-bottom-color: #f2f2f7;
`;

const CateLabel = styled.Text<{selected: boolean}>`
  flex: 1;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: ${p => (p.selected ? p.theme.blue2 : '#1c1c1e')};
`;

const SPopupSelect = styled(PopupSelect)`
  background-color: #fff;
`;

const SDynamicInput = styled(DynamicInput)`
  padding: 12px 16px 0 16px;
`;

interface ChooseAddressProps {
  customer: ICustomerDetail;
}

const ChooseAddress = forwardRef((props: ChooseAddressProps, ref: any) => {
  const {customer} = props;
  const [openSelect, setOpenSelect] = useState(false);
  const [dataAddress, setDataAddress] = useState<IListAddress[]>([]);

  const [address, setAddress] = useReducer(
    (states, newStates) => ({
      ...states,
      ...newStates,
    }),
    {
      province: null,
      districts: null,
      wards: null,
    },
  );
  const typeRef = useRef('PROVINCE');
  const searchText = useRef('');
  const dataSearch = useRef<any[]>([]);

  const getRegion = useCallback(async geoId => {
    const listAddress = await fetchListAddress(geoId);
    setDataAddress(listAddress);
    dataSearch.current = listAddress;
  }, []);

  const chooseAddress = item => {
    if (typeRef.current === 'PROVINCE') {
      setAddress({
        province: item,
        districts: null,
        wards: null,
      });
    }
    if (typeRef.current === 'DISTRICT') {
      setAddress({
        districts: item,
        wards: null,
      });
    }
    if (typeRef.current === 'WARDS') {
      setAddress({wards: item});
    }

    closeModal();
  };

  const onSearch = useCallback(() => {
    const listFilter = dataSearch?.current?.filter(address =>
      removeDiacritics(address.geoNameLocal).includes(
        removeDiacritics(searchText.current),
      ),
    );
    setDataAddress(listFilter || []);
  }, []);

  const closeModal = () => {
    setOpenSelect(false);
  };

  const openModalProvince = () => {
    setOpenSelect(true);
    typeRef.current = 'PROVINCE';
    getRegion('VNM');
  };

  const openModalDistrict = () => {
    if (!address.province) {
      return global.showMessage('Vui lòng chọn Tỉnh / Thành Phố');
    }
    setOpenSelect(true);
    typeRef.current = 'DISTRICT';
    getRegion(address.province?.geoId);
  };

  const openModalWards = () => {
    if (!address.province) {
      return global.showMessage('Vui lòng chọn Tỉnh / Thành Phố');
    }
    if (!address.districts) {
      return global.showMessage('Vui lòng chọn Quận / Huyện');
    }
    setOpenSelect(true);
    typeRef.current = 'WARDS';
    getRegion(address.districts?.geoId);
  };

  const handleCheckSelected = item => {
    return (
      item.geoId === address.province?.geoId ||
      item.geoId === address.districts?.geoId ||
      item.geoId === address.wards?.geoId
    );
  };

  const initData = async () => {
    const listProvince = await fetchListAddress('VNM');
    const listDistricts = await fetchListAddress(customer?.stateProvinceGeoId);
    console.log('listDistricts', listDistricts);

    const listWards = await fetchListAddress(customer?.countyGeoId);
    const currentProvince = listProvince.find(
      elm => elm.geoId === customer?.stateProvinceGeoId,
    );
    const currentDistrict = listDistricts.find(
      elm => elm.geoId === customer?.countyGeoId,
    );
    const currentWard = listWards.find(
      elm => elm.geoId === customer?.wardGeoId,
    );

    setAddress({
      province: currentProvince,
      districts: currentDistrict,
      wards: currentWard,
    });
  };

  const renderSearch = () => {
    return (
      <SDynamicInput
        placeholderStr="Tìm kiếm"
        onChangeText={t => (searchText.current = t)}
        textInputProps={{onEndEditing: () => onSearch()}}
        rightIcon={<Icon source={Icons.icSearch} />}
        inputTheme="dark"
      />
    );
  };

  useEffect(() => {
    ref.current = address;
  }, [address, ref]);

  useEffect(() => {
    customer && initData();
  }, []);

  return (
    <WrapperContainer>
      <Label>Tỉnh/Thành phố</Label>
      <Wrapper onPress={openModalProvince}>
        <TxtValue isValue={Boolean(address.province)}>
          {address.province?.geoNameLocal || 'Vui lòng chọn'}
        </TxtValue>
        <Icon source={Icons.icDropdown} />
      </Wrapper>
      <Label>Quận/Huyện</Label>
      <Wrapper onPress={openModalDistrict}>
        <TxtValue isValue={Boolean(address.districts)}>
          {address.districts?.geoNameLocal || 'Vui lòng chọn'}
        </TxtValue>
        <Icon source={Icons.icDropdown} />
      </Wrapper>
      <Label>Xã/Phường</Label>
      <Wrapper onPress={openModalWards}>
        <TxtValue isValue={Boolean(address.wards)}>
          {address.wards?.geoNameLocal || 'Vui lòng chọn'}
        </TxtValue>
        <Icon source={Icons.icDropdown} />
      </Wrapper>
      <SPopupSelect
        viewProps={{
          style: {
            height: height * 0.9,
          },
        }}
        visibleProps={openSelect}
        onCloseProps={() => setOpenSelect(false)}
        title="Chọn địa chỉ"
        renderTopComponent={renderSearch()}
        data={dataAddress}
        renderItem={({item, index}) => (
          <CateWrapper
            key={index.toString()}
            onPress={() => chooseAddress(item)}>
            <CateLabel selected={handleCheckSelected(item)}>
              {item.geoNameLocal}
            </CateLabel>
            <Icon
              source={Icons.icSelected}
              style={{opacity: handleCheckSelected(item) ? 1 : 0}}
            />
          </CateWrapper>
        )}
      />
    </WrapperContainer>
  );
});

export default ChooseAddress;
