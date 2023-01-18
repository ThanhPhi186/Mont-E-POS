import {convertStatus} from '@/components/StatusSection';
import {fetchOrderDetail} from '@/store/order/api';
import {IOrderListItem} from '@/store/order/type';
import {getLocaleNumber} from '@/utils/convertString';
import moment from 'moment';
import React, {memo, useCallback, useContext} from 'react';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import {OrderContext} from '../OrderContext';

const ItemWrapper = styled.View`
  padding: 12px 16px;
  background: ${p => p.theme.backgroundInput};
  border-radius: 12px;
  margin-top: 12px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
`;

const OrderCode = styled.Text`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #1c1c1e;
`;

const Value = styled.Text`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;

  color: #1c1c1e;
`;

const NormalText = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #1c1c1e;
`;

const Line = styled.View`
  border: 1px solid #e5e5ea;
  margin: 12px 0;
`;

const Button = styled.TouchableOpacity<{detail?: boolean; fullWidth?: boolean}>`
  border: 2px solid ${p => p.theme.blue2};
  border-radius: 12px;
  padding: 8px 0;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  width: ${p => (p.fullWidth ? '100%' : ' 48%')};
  background-color: ${p => (p.detail ? p.theme.blue2 : '#fff')};
`;

const DetailText = styled.Text<{detail?: boolean}>`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  color: ${p => (p.detail ? '#fff' : p.theme.blue2)};
`;

const OrderItem = memo(({item}: {item: IOrderListItem}) => {
  const onItemPress = useCallback(async () => {
    global.showLoading();
    const order = await fetchOrderDetail(item.orderId);

    global.hideLoading();

    order && Actions.push('order_detail_screen', {order});
  }, []);

  const onGoCreateReturn = useCallback(async () => {
    global.showLoading();
    const order = await fetchOrderDetail(item.orderId);

    global.hideLoading();

    if (order) {
      Actions.push('create_return_order_screen', {order});
    }
  }, []);

  return (
    <ItemWrapper>
      <Row>
        <OrderCode>Mã đơn hàng:</OrderCode>
        <OrderCode>{item.orderId}</OrderCode>
      </Row>
      <Line />
      <Row>
        <NormalText>Trạng thái:</NormalText>
        {/* <StatusLabel color={convertStatus[item.statusId].borderColor}>
          {convertStatus[item.statusId].label}
        </StatusLabel> */}
        <NormalText>{item.statusDesc}</NormalText>
      </Row>
      <Row>
        <NormalText>Thời gian tạo:</NormalText>
        <NormalText>{moment(item.entryDate).format('DD/MM/YYYY')}</NormalText>
      </Row>
      <Row>
        <NormalText>Tổng tiền:</NormalText>
        <Value>{getLocaleNumber(item.grandTotal)}</Value>
      </Row>
      <Row>
        {item.statusId === 'OrderCompleted' && (
          <Button onPress={onGoCreateReturn}>
            <DetailText>Tạo đơn hoàn</DetailText>
          </Button>
        )}
        <Button
          detail
          fullWidth={item.statusId !== 'OrderCompleted'}
          onPress={onItemPress}>
          <DetailText detail>Chi tiết</DetailText>
        </Button>
      </Row>
    </ItemWrapper>
  );
});
export default OrderItem;
