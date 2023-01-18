import ListLoading from '@/components/ListLoading';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import React, {memo, useReducer} from 'react';
import styled from 'styled-components/native';
import OrderItem from './components/OrderItem';
import EmptyComponent from '@/components/EmptyComponent';
import {useFetchCommon} from '@/services/useFetchCommon';
import {RefreshControl} from 'react-native';

const Wrapper = styled.View`
  flex: 1;
`;

const SFlatList = styled.FlatList`
  flex: 1;
`;

const SScreenWithTitle = styled(ScreenWithTitle)`
  border-top-right-radius: 0;
`;

const ListOrder = memo(() => {
  const [paramsRequest, setParamsRequest] = useReducer(
    (oldState, newState) => ({
      ...oldState,
      ...newState,
    }),
    {},
  );

  const {data, isRefreshing, isLoadingMore, handleRefresh, handleLoadMore} =
    useFetchCommon({
      url: '@api/returns',
      params: paramsRequest,
      data: 'returns',
    });

  return (
    <Wrapper>
      <SFlatList
        data={data}
        keyExtractor={(item: any, index) => `${item.entryDate}`}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<ListLoading loading={isLoadingMore} />}
        renderItem={({item}: any) => <OrderItem item={item} />}
        ListEmptyComponent={
          !isLoadingMore ? (
            <EmptyComponent content="Chưa có đơn hoàn nào" />
          ) : null
        }
        maxToRenderPerBatch={6}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.01}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </Wrapper>
  );
});

const ListReturnOrderScreen = (props: any) => {
  return (
    <SScreenWithTitle title="DS Đơn hoàn hàng">
      <ListOrder {...props} />
    </SScreenWithTitle>
  );
};

export default ListReturnOrderScreen;
