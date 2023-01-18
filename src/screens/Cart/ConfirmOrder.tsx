import CustomerItem from '@/components/CustomerItem';
import ProductRow from '@/components/ProductRow';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import {NormalText} from '@/components/TextCommon';
import {IOrderDetail} from '@/store/order/type';
import {LIST_PADDING_BOTTOM} from '@/utils/Tranform';
import _ from 'lodash';
import React, {memo, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import {CartProvider} from './CartConext';
import ConfirmFooter from './components/ConfirmFooter';
import CustomerInfo from './components/CustomerInfo';
import PromotionSection from './components/PromotionSection';

const SScrollView = styled.ScrollView`
  flex: 1;
`;

const ListItem = styled.View``;
const Value = styled(NormalText)`
  color: #1c1c1e;
  margin-top: 12px;
`;

const ConfirmOrder = memo(({order}: {order: IOrderDetail}) => {
  const {
    customer,
    productItems,
    promoApplied,
    grandTotal,
    vatTotal,
    discountTotal,
    productItemsTotalNoVAT,
    enableAddPromo,
  } = order;

  const onApplyChange = useCallback(
    async orderDetail => {
      Actions.pop();
      Actions.refresh({order: orderDetail});
    },
    [order],
  );

  console.log('customer', customer);

  return (
    <ScreenWithTitle removePadding title="Xác nhận đơn">
      <SScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}>
        {enableAddPromo ? (
          <PromotionSection
            orderId={order.orderId}
            onAppleChange={onApplyChange}
            itemLength={promoApplied.length}
          />
        ) : null}
        {!_.isEmpty(customer) && <CustomerInfo item={customer} />}
        <Value>Sản phẩm ({productItems.length})</Value>

        <ListItem>
          {productItems.map(item => (
            <ProductRow
              key={item.productId}
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
        </ListItem>
      </SScrollView>
      <ConfirmFooter
        total={grandTotal}
        vat={vatTotal}
        promo={discountTotal}
        order={order}
        productPrice={productItemsTotalNoVAT}
      />
    </ScreenWithTitle>
  );
});

const ConfirmOrderScreen = ({order}: {order: IOrderDetail}) => {
  return (
    <CartProvider>
      <ConfirmOrder order={order} />
    </CartProvider>
  );
};

export default ConfirmOrderScreen;

const styles = StyleSheet.create({
  list: {
    paddingBottom: LIST_PADDING_BOTTOM,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
});
