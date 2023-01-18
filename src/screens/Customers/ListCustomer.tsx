import CustomerItem from '@/components/CustomerItem';
import DynamicInput from '@/components/DynamicInput';
import ListLoading from '@/components/ListLoading';
import SubmitButton from '@/components/SubmitButton';
import {useNavigationParams} from '@/hooks/navigation';
import Icons from '@/Icons';
import {ICustomerRoute} from '@/store/customers/types';
import {removeDiacritics} from '@/utils/convertString';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 24px;
`;
const Icon = styled.Image``;

const Flex = styled.View`
  flex: 1;
`;

const SDynamicInput = styled(DynamicInput)``;
const TextEmpty = styled.Text`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  text-align: center;
  margin-top: 16px;
  color: #000000;
`;

const WrapperAddCustomerBtn = styled.View`
  padding: 12px 0px;
`;

const SAddCustomerBtn = styled(SubmitButton)`
  width: 100%;
`;

const ListCustomer = memo(({route}: {route: ICustomerRoute}) => {
  const [customers, setCustomers] = useState(route?.customers || []);
  const {onSelectCustomer} = useNavigationParams<any>();

  const searchText = useRef('');

  const onSearch = useCallback(() => {
    const listFilter = route.customers.filter(customer =>
      removeDiacritics(customer.fullName).includes(
        removeDiacritics(searchText.current),
      ),
    );
    setCustomers(listFilter);
  }, [route]);

  const goDetail = item => {
    Actions.push('detail_customer', {item});
  };

  useEffect(() => {
    setCustomers(route?.customers || []);
  }, [route]);

  return (
    <Wrapper>
      <Flex>
        {route ? (
          <FlatList
            ListHeaderComponent={
              route.customers.length > 0 ? (
                <>
                  <SDynamicInput
                    placeholderStr="Tìm tên khách hàng"
                    onChangeText={t => (searchText.current = t)}
                    textInputProps={{onEndEditing: () => onSearch()}}
                    rightIcon={<Icon source={Icons.icSearch} />}
                  />
                </>
              ) : null
            }
            ListEmptyComponent={
              <TextEmpty>Không tìm thấy khách hàng nào cả!</TextEmpty>
            }
            data={customers}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) =>
              `${item.telecomNumber}${index.toString()}`
            }
            renderItem={({item}) => (
              <CustomerItem
                item={item}
                onItemPress={
                  onSelectCustomer ? onSelectCustomer : () => goDetail(item)
                }
              />
            )}
          />
        ) : (
          <ListLoading loading />
        )}
      </Flex>
      {!onSelectCustomer && (
        <WrapperAddCustomerBtn>
          <SAddCustomerBtn
            text="Thêm khách hàng mới"
            onPress={() => Actions.push('add_customer_screen')}
          />
        </WrapperAddCustomerBtn>
      )}
    </Wrapper>
  );
});

export default ListCustomer;
