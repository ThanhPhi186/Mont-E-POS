import CustomerSection from '@/components/CustomerSection';
import ProductRow from '@/components/ProductRow';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import StatusSection from '@/components/StatusSection';
import {IReturnDetail} from '@/store/order/type';
import _ from 'lodash';
import React, {memo} from 'react';
import styled from 'styled-components/native';
import OrderInformation from './components/OrderInformation';

const Wrapper = styled.View`
  flex: 1;
`;

const SScrollView = styled.ScrollView`
  flex: 1;
  margin-top: 12px;
`;

const SScreenWithTitle = styled(ScreenWithTitle)``;

const TotalItem = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: #1c1c1e;
  margin-top: 16px;
`;

const Container = memo(({order}: {order: IReturnDetail}) => {
  return (
    <Wrapper>
      <SScrollView showsVerticalScrollIndicator={false}>
        <StatusSection status={order.returnHeader.statusId} />
        {!_.isEmpty(order.customer) && (
          <CustomerSection customer={order.customer} />
        )}
        <OrderInformation
          grandTotal={order.returnHeader.grandTotal}
          orderId={order.returnHeader.orderId}
          returnId={order.returnHeader.returnId}
        />
        <TotalItem>Danh sách sản phẩm ({order.returnItems.length})</TotalItem>
        {order.returnItems.map(item => (
          <ProductRow
            key={item.productId}
            confirm={{
              count: item.alternativeReturnQuantity,
              productName: item.description,
              quantityUomDesc: item.alternativeReturnQuantityUomId,
              price: item.alternativeReturnPrice,
            }}
          />
        ))}
      </SScrollView>
    </Wrapper>
  );
});

const ReturnOrderDetailScreen = (props: any) => {
  return (
    <SScreenWithTitle
      title="Chi tiết đơn hoàn hàng"
      onPressBack={props.onPressBack}>
      <Container {...props} />
    </SScreenWithTitle>
  );
};

export default ReturnOrderDetailScreen;
