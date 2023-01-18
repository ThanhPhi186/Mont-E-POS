import DynamicInput from '@/components/DynamicInput';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import Icons from '@/Icons';
import {fetchCustomerRecommended} from '@/store/customers/api';
import {ICustomerRecommended} from '@/store/customers/types';
import {removeDiacritics} from '@/utils/convertString';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import CustomerRecommendedItem from './components/CustomerRecommendedItem';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;
const Icon = styled.Image``;

const SDynamicInput = styled(DynamicInput)``;
const TextEmpty = styled.Text`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  text-align: center;
  margin-top: 16px;
  color: #000000;
`;

const RecommendedCustomerScreen = memo(() => {
  const [customers, setCustomers] = useState<ICustomerRecommended[]>([]);

  const searchText = useRef('');
  const dataSearch = useRef<ICustomerRecommended[]>([]);

  const onSearch = useCallback(() => {
    const listFilter = dataSearch?.current?.filter(customer =>
      removeDiacritics(customer.customerName).includes(
        removeDiacritics(searchText.current),
      ),
    );
    setCustomers(listFilter || []);
  }, []);

  useEffect(() => {
    const getListCustomer = async () => {
      const customerResponse = await fetchCustomerRecommended();
      dataSearch.current = customerResponse;
      setCustomers(customerResponse);
    };
    getListCustomer();
  }, []);

  return (
    <ScreenWithTitle
      onPressBack={() => Actions.replace('home_tab')}
      title="DS đề xuất đại lý bán lẻ">
      <Wrapper>
        <SDynamicInput
          placeholderStr="Tìm tên khách hàng"
          onChangeText={t => (searchText.current = t)}
          textInputProps={{onEndEditing: () => onSearch()}}
          rightIcon={<Icon source={Icons.icSearch} />}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <TextEmpty>Không tìm thấy khách hàng nào cả!</TextEmpty>
          }
          data={customers}
          keyExtractor={(item, index) => `${item.phone}${index.toString()}`}
          renderItem={({item}) => (
            <CustomerRecommendedItem
              item={item}
              onItemPress={() =>
                Actions.push('recommended_detail_screen', {item})
              }
            />
          )}
        />
      </Wrapper>
    </ScreenWithTitle>
  );
});

export default RecommendedCustomerScreen;
