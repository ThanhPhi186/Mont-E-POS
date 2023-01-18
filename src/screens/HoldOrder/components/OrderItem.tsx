import Theme from '@/Colors';
import {TOrderType, TReturnType} from '@/constants/variableConstant';
import {CartContext} from '@/screens/Cart/CartConext';
import {fetchReturnOrderDetail, reOpenOrder} from '@/store/order/api';
import {IHoldOrderListItem, IReturnOrderListItem} from '@/store/order/type';
import {getLocaleNumber} from '@/utils/convertString';
import moment from 'moment';
import React, {memo, useCallback, useContext} from 'react';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';

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

const Button = styled.TouchableOpacity`
  border: 2px solid ${p => p.theme.blue2};
  border-radius: 12px;
  padding: 8px 0;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  background-color: '#fff';
`;

const DetailText = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  color: ${p => p.theme.blue2};
`;

const OrderItem = memo(({item}: {item: IHoldOrderListItem}) => {
  const onItemPress = useCallback(async () => {
    global.showLoading();
    const order = await reOpenOrder(item.orderId);
    // console.log('fetchReturnOrderDetail', order);
    global.hideLoading();
    order && Actions.push('create_order');
  }, []);

  return (
    <ItemWrapper>
      <Row>
        <OrderCode>Mã đơn hàng:</OrderCode>
        <OrderCode>{item.orderId}</OrderCode>
      </Row>
      <Line />
      <Row>
        <NormalText>Người tạo:</NormalText>
        <NormalText>{item.enteredByPartyName}</NormalText>
      </Row>
      <Row>
        <NormalText>Thời gian tạo:</NormalText>
        <NormalText>{moment(item.entryDate).format('DD/MM/YYYY')}</NormalText>
      </Row>
      <Row>
        <NormalText>Tổng tiền:</NormalText>
        <Value>{getLocaleNumber(item.grandTotal)}</Value>
      </Row>
      <Button onPress={onItemPress}>
        <DetailText>Tiếp tục</DetailText>
      </Button>
    </ItemWrapper>
  );
});
export default OrderItem;
