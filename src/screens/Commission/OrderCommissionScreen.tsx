import ListLoading from '@/components/ListLoading';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import {NormalText} from '@/components/TextCommon';
import Icons from '@/Icons';
import SVGIcon from '@/Icons/SVGIcon';
import {
  fetchListCommission,
  fetchRevShare,
  requestWithdraw,
} from '@/store/report/api';
import {IListCommission} from '@/store/report/type';
import {getLocaleNumber} from '@/utils/convertString';
import moment from 'moment';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import CommissionItem from './components/CommissionItem';
import ListStatus from './components/ListStatus';

const Wrapper = styled.View`
  flex: 1;
`;
const WrapperCommission = styled.View`
  background-color: ${p => p.theme.backgroundColor};
  padding: 0px 24px 24px;
`;

const ViewCommission = styled.View`
  flex-direction: row;
  align-items: center;
  height: 100px;
  border-radius: 12px;
  background: #ffffff;
`;
const ViewInfoCommission = styled.View`
  flex: 1;
  padding: 0px 24px;
`;

const Label = styled(NormalText)`
  color: ${p => p.theme.backgroundColor};
`;
const TxtValue = styled(Text)`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #ff9500;
`;
const ViewWithdraw = styled.TouchableOpacity`
  width: 48px;
  height: 100px;
  background: #ff9500;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const SFlatList = styled.FlatList`
  flex: 1;
  margin-top: 12px;
`;

const Icon = styled.Image``;

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
  const [data, setData] = useState<IListCommission[]>([]);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const currentPage = useRef(0);
  const totalPage = useRef(1);
  const currentDate = useRef({startDate: 0, endDate: 0});

  const getDataByDate = useCallback(async () => {
    if (currentPage.current >= totalPage.current) return;
    setLoading(true);
    loadingRef.current = true;
    const {data: results} = await fetchListCommission({
      thruDate: currentDate.current.endDate || moment().valueOf(),
      fromDate: currentDate.current.startDate,
      currentPage: currentPage.current,
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
    currentPage.current = 0;
    getDataByDate();
  }, []);

  return (
    <Wrapper>
      <ListStatus onStatusChange={onStatusChange} />
      <SFlatList
        data={data}
        extraData={data.length}
        keyExtractor={(item: any, index) =>
          `${item.lastUpdatedStamp.toString()}`
        }
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<ListLoading loading={loading} />}
        renderItem={({item}: any) => <CommissionItem item={item} />}
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

const OrderCommissionScreen = (props: any) => {
  const [revShare, setRevShare] = useState<number | null>(null);
  const getData = useCallback(async () => {
    const data = await fetchRevShare();
    setRevShare(data.unpaidTotal);
  }, []);

  const showPopup = useCallback(() => {
    global.showAlert({
      title: 'Yêu cầu rút hoa hồng',
      description: `Số sư hoa hồng khả dụng: ${getLocaleNumber(
        `${revShare}`,
      )} ₫ \n Bạn có chắn chắn muốn gửi yêu cầu này ko?`,
      textCancel: 'Hủy',
      textNext: 'Xác nhận',
      cancelStyle: {
        background: '#fff',
      },
      onNext: () => {
        onRequestWithdraw();
      },
    });
  }, [revShare]);

  const onRequestWithdraw = async () => {
    const success = await requestWithdraw(revShare ?? 0);

    setTimeout(() => {
      if (success) {
        global.showMessage(
          'Yêu cầu rút hoa hồng thành công!\nYêu cầu của bạn đang được chờ duyệt',
        );
      } else {
        global.showMessage('Yêu cầu rút hoa hồng thất bại');
      }
    }, 500);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SScreenWithTitle
      title="Hoa hồng đơn hàng"
      renderBottomHeader={
        <WrapperCommission>
          <ViewCommission>
            <ViewInfoCommission>
              <Label>Số dư hoa hồng khả dụng:</Label>
              <TxtValue>{getLocaleNumber(`${revShare}`)} ₫</TxtValue>
            </ViewInfoCommission>
            <ViewWithdraw onPress={showPopup}>
              <Icon source={Icons.icWithdraw} />
            </ViewWithdraw>
          </ViewCommission>
        </WrapperCommission>
      }>
      <Container {...props} />
    </SScreenWithTitle>
  );
};

export default OrderCommissionScreen;
