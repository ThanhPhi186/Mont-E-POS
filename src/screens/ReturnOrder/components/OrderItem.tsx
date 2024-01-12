import Theme from '@/Colors';
import {TOrderType, TReturnType} from '@/constants/variableConstant';
import {fetchReturnOrderDetail} from '@/store/order/api';
import {IReturnOrderListItem} from '@/store/order/type';
import {getLocaleNumber} from '@/utils/convertString';
import moment from 'moment';
import React, {memo, useCallback} from 'react';
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

const StatusLabel = styled.Text<{color: string}>`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${p => p.color};
`;

const convertStatus: Record<
  TReturnType,
  {borderColor: string; background: string; label: string}
> = {
  ReturnApproved: {
    background: 'rgba(0, 122, 255, 0.1)',
    borderColor: Theme.blue2,
    label: 'Đã duyệt',
  },
  ReturnCreated: {
    background: 'rgba(255, 149, 0, 0.1)',
    borderColor: '#FF9500',
    label: 'Mới tạo',
  },
  ReturnCompleted: {
    background: 'rgba(52, 199, 89, 0.1)',
    borderColor: Theme.green,
    label: 'Đã hoàn thành',
  },
  ReturnCancelled: {
    background: 'rgba(52, 199, 89, 0.1)',
    borderColor: Theme.error,
    label: 'Đã Hủy',
  },
};

const OrderItem = memo(({item}: {item: IReturnOrderListItem}) => {
  const onItemPress = useCallback(async () => {
    global.showLoading();
    const order = await fetchReturnOrderDetail(item.returnId);

    global.hideLoading();

    order && Actions.push('return_order_detail_screen', {order});
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
        <StatusLabel color={convertStatus[item.statusId].borderColor}>
          {convertStatus[item.statusId].label}
        </StatusLabel>
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
        <DetailText>Chi tiết</DetailText>
      </Button>
    </ItemWrapper>
  );
});
export default OrderItem;
