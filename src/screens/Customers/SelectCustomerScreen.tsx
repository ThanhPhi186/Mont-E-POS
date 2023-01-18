import CustomerItem from '@/components/CustomerItem';
import DynamicInput from '@/components/DynamicInput';
import ListLoading from '@/components/ListLoading';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import {useNavigationParams} from '@/hooks/navigation';
import Icons from '@/Icons';
import Fetch from '@/services/Fetch';
import {useFetchCommon} from '@/services/useFetchCommon';
import {fetchCustomerDetail} from '@/store/customers/api';
import {ICustomer} from '@/store/customers/types';
import Emitter from '@/utils/Emitter';
import React, {memo, useEffect, useReducer, useRef} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import {LIST_PADDING_BOTTOM} from '@/utils/Tranform';
import ButtonBottom from '@/components/ButtonBottom';

const Wrapper = styled.View`
  flex: 1;
`;
const Icon = styled.Image``;

const Flex = styled.View`
  flex: 1;
  padding: 0px 24px;
`;

const SDynamicInput = styled(DynamicInput)``;
const TextEmpty = styled.Text`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #000000;
  margin-top: 50%;
`;

const SButtonBottom = styled(ButtonBottom)``;

function SelectCustomerScreen() {
  const {onSelectCustomer} = useNavigationParams<any>();

  const [paramsRequest, setParamsRequest] = useReducer(
    (oldState, newState) => ({
      ...oldState,
      ...newState,
    }),
    {
      productStoreId: Fetch.current_channel?.productStoreId,
      searchText: '',
    },
  );

  const {
    data,
    isRefreshing,
    isLoadingMore,
    handleRefresh,
    handleLoadMore,
    isLoading,
  } = useFetchCommon({
    url: '@api/customers',
    params: paramsRequest,
    data: 'customers',
  });

  const searchText = useRef('');

  const onSearch = () => {
    setParamsRequest({...paramsRequest.params, searchText: searchText.current});
  };

  const goEdit = async (item: ICustomer) => {
    global.showLoading();
    const customer = await fetchCustomerDetail(item.partyId);

    global.hideLoading();

    if (customer) {
      Actions.push('add_customer_screen', {customer});
    }
  };

  useEffect(() => {
    const __sub = Emitter.listen(Emitter.UPDATE_LIST_CUSTOMER, () => {
      handleRefresh();
    });
    return () => __sub.remove();
  }, []);

  return (
    <ScreenWithTitle
      removePadding
      title={onSelectCustomer ? 'Chọn khách hàng' : 'Danh sách khách hàng'}>
      <Wrapper>
        <Flex>
          {data ? (
            <FlatList
              ListHeaderComponent={
                <SDynamicInput
                  placeholderStr="Tìm tên khách hàng"
                  onChangeText={t => (searchText.current = t)}
                  textInputProps={{onEndEditing: () => onSearch()}}
                  rightIcon={<Icon source={Icons.icSearch} />}
                />
              }
              ListEmptyComponent={
                <TextEmpty>Không tìm thấy khách hàng nào cả!</TextEmpty>
              }
              onEndReached={handleLoadMore}
              data={data}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.partyId}
              onEndReachedThreshold={0.1}
              contentContainerStyle={{paddingBottom: LIST_PADDING_BOTTOM}}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                />
              }
              renderItem={({item}: ICustomer) => (
                <CustomerItem
                  item={item}
                  onItemPress={
                    onSelectCustomer ? onSelectCustomer : () => goEdit(item)
                  }
                />
              )}
            />
          ) : (
            <ListLoading loading={isLoading} />
          )}
        </Flex>
        {!onSelectCustomer && (
          <SButtonBottom
            text="Thêm khách hàng mới"
            onPress={() => Actions.push('add_customer_screen')}
          />
        )}
      </Wrapper>
    </ScreenWithTitle>
  );
}

export default memo(SelectCustomerScreen);
