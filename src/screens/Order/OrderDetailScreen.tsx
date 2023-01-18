import Theme from '@/Colors';
import ButtonBottom from '@/components/ButtonBottom';
import CustomerSection from '@/components/CustomerSection';
import ProductRow from '@/components/ProductRow';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import StatusSection from '@/components/StatusSection';
import {fetchOrderDetail} from '@/store/order/api';
import {IOrderDetail} from '@/store/order/type';
import _ from 'lodash';
import React, {memo, useCallback} from 'react';
import {Actions} from 'react-native-router-flux';

import styled from 'styled-components/native';
import OrderInformation from './components/OrderInformation';

const Wrapper = styled.View`
  flex: 1;
`;

const SScrollView = styled.ScrollView`
  flex: 1;
`;

const SScreenWithTitle = styled(ScreenWithTitle)``;

const TotalItem = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #1c1c1e;
  margin-top: 16px;
`;

const SButtonBottom = styled(ButtonBottom)`
  border: 2px solid ${p => p.theme.blue2};
  background-color: #fff;
`;

const Container = memo(({order}: {order: IOrderDetail}) => {
  const onGoCreateReturn = useCallback(async () => {
    global.showLoading();
    const orderResponse = await fetchOrderDetail(order.orderId);

    global.hideLoading();

    if (orderResponse) {
      Actions.push('create_return_order_screen', {order: orderResponse});
    }
  }, []);
  console.log('aaa', order.customer);

  return (
    <Wrapper>
      <SScrollView
        contentContainerStyle={{padding: 24}}
        showsVerticalScrollIndicator={false}>
        <StatusSection status={order.statusId} />
        {!_.isEmpty(order.customer) && (
          <CustomerSection contactNumber customer={order.customer} />
        )}
        <OrderInformation
          orderValue={order.productItemsTotalNoVAT}
          vatTotal={order.vatTotal}
          discountTotal={order.discountTotal}
          grandTotal={order.grandTotal}
          orderId={order.orderId}
        />
        <TotalItem>Danh sách sản phẩm ({order.productItems.length})</TotalItem>
        {order.productItems.map(item => (
          <ProductRow
            key={item.pseudoId}
            confirm={{
              contentLocation: item.contentLocation,
              count: item.alternativeQuantity,
              productName: item.itemDescription,
              quantityUomDesc: item.alternativeQuantityUomId,
              price: item.alternativeUnitAmountVAT,
              isPromo: item.isPromo,
            }}
          />
        ))}
      </SScrollView>
      {order.statusId === 'OrderCompleted' && (
        <SButtonBottom
          text="Tạo đơn hoàn"
          textColor={Theme.blue2}
          onPress={onGoCreateReturn}
        />
      )}
    </Wrapper>
  );
});

const OrderDetailScreen = (props: any) => {
  return (
    <SScreenWithTitle
      removePadding
      title="Chi tiết đơn hàng"
      onPressBack={props.onPressBack}>
      <Container {...props} />
    </SScreenWithTitle>
  );
};

export default OrderDetailScreen;
