import ListLoading from '@/components/ListLoading';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import {fetchListOrderByDate} from '@/store/order/api';
import {IOrderListItem} from '@/store/order/type';
import Bluebird from 'bluebird';
import React, {memo, useCallback, useRef, useState} from 'react';
import styled from 'styled-components/native';
import ListStatus from './components/ListStatus';
import OrderItem from './components/OrderItem';
import moment from 'moment';
import EmptyComponent from '@/components/EmptyComponent';
import {OrderProvider} from './OrderContext';

const Wrapper = styled.View`
  flex: 1;
`;

const SFlatList = styled.FlatList`
  flex: 1;
  margin-top: 12px;
`;

const SScreenWithTitle = styled(ScreenWithTitle)`
  border-top-right-radius: 0;
`;

const ListOrder = memo(() => {
  const [data, setData] = useState<IOrderListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const currentPage = useRef(0);
  const totalPage = useRef(1);
  const currentDate = useRef({startDate: 0, endDate: 0});

  const getDataByDate = useCallback(async () => {
    if (currentPage.current >= totalPage.current) return;
    setLoading(true);
    loadingRef.current = true;
    const {data: results} = await fetchListOrderByDate({
      entryDateFrom: currentDate.current.startDate,
      entryDateThru: currentDate.current.endDate || moment().valueOf(),
      page: currentPage.current,
    });
    currentPage.current += 1;

    setData([...data, ...results]);
    setLoading(false);
    loadingRef.current = false;
  }, [data.length]);

  const onLoadMore = useCallback(() => {
    if (loading || loadingRef.current) return;
    if (currentPage.current > totalPage.current) {
      return;
    }
    getDataByDate();
  }, [loading]);

  const onStatusChange = useCallback(async date => {
    date && (currentDate.current = date);
    setData([]);
    await Bluebird.delay(100);
    currentPage.current = 0;
    getDataByDate();
  }, []);

  return (
    <Wrapper>
      <ListStatus onStatusChange={onStatusChange} />
      <SFlatList
        data={data}
        extraData={data.length}
        keyExtractor={(item: any, index) => `${item.orderId}`}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<ListLoading loading={loading} />}
        renderItem={({item}: any) => <OrderItem item={item} />}
        ListEmptyComponent={!loading ? <EmptyComponent /> : null}
        maxToRenderPerBatch={6}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.01}
      />
    </Wrapper>
  );
});

const ListOrderScreen = (props: any) => {
  return (
    <OrderProvider>
      <SScreenWithTitle title="Lịch sử đơn hàng">
        <ListOrder {...props} />
      </SScreenWithTitle>
    </OrderProvider>
  );
};

export default ListOrderScreen;
