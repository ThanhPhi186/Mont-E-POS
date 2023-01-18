import ListLoading from '@/components/ListLoading';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import {NormalText} from '@/components/TextCommon';
import {TOrderType} from '@/constants/variableConstant';
import SVGIcon from '@/Icons/SVGIcon';
import {fetchListOrderByStatus} from '@/store/order/api';
import {IOrderListItem} from '@/store/order/type';
import {fetchListPriceChange} from '@/store/product/api';
import {IProductPriceChange} from '@/store/product/type';
import Bluebird from 'bluebird';
import moment from 'moment';
import React, {memo, useCallback, useRef, useState} from 'react';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import ListStatus from './components/ListStatus';
import ProductItem from './components/ProductItem';

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

const EmptyView = styled.View`
  padding: 16px;
  align-items: center;
`;
const EmptyText = styled(NormalText)`
  text-align: center;
  margin-top: 12px;
`;
const Container = memo(() => {
  const [data, setData] = useState<IProductPriceChange[]>([]);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const currentPage = useRef(0);
  const totalPage = useRef(1);
  const currentDate = useRef({startDate: 0, endDate: 0});

  const getDataByDate = useCallback(async () => {
    if (currentPage.current >= totalPage.current) return;
    setLoading(true);
    loadingRef.current = true;
    const {data: list} = await fetchListPriceChange({
      thruDate: currentDate.current.endDate || moment().valueOf(),
      fromDate: currentDate.current.startDate,
      currentPage: currentPage.current,
    });
    currentPage.current += 1;
    setData([...data, ...list]);
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
    currentPage.current = 0;
    getDataByDate();
  }, []);

  return (
    <Wrapper>
      <ListStatus onStatusChange={onStatusChange} />
      <SFlatList
        data={data}
        extraData={data.length}
        keyExtractor={(item: any, index) => `${index.toString()}`}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<ListLoading loading={loading} />}
        renderItem={({item}: any) => <ProductItem item={item} />}
        ListEmptyComponent={
          !loading ? (
            <EmptyView>
              <SVGIcon name="item-search-empty" />
              <EmptyText>
                Hiện chưa có dữ liệu nào cả!{'\n'}
                Bạn có thể chọn lại khoảng thời gian khác{'\n'}để xem thêm thông
                tin.
              </EmptyText>
            </EmptyView>
          ) : null
        }
        maxToRenderPerBatch={6}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.01}
      />
    </Wrapper>
  );
});

const ListPriceChangeScreen = (props: any) => {
  return (
    <SScreenWithTitle title="Danh sách thay đổi">
      <Container {...props} />
    </SScreenWithTitle>
  );
};

export default ListPriceChangeScreen;
