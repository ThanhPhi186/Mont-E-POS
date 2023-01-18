import ButtonBottom from '@/components/ButtonBottom';
import CustomerSection from '@/components/CustomerSection';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import StatusSection from '@/components/StatusSection';
import {createReturnOrder} from '@/store/order/api';
import {IOrderDetail} from '@/store/order/type';
import _ from 'lodash';
import React, {memo, useCallback, useContext, useEffect} from 'react';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import OrderInformation from './components/OrderInformation';
import ProductSelectReturn from './components/ProductSelectReturn';
import {OrderContext, OrderProvider} from './OrderContext';

const SScrollView = styled.ScrollView`
  flex: 1;
  margin-top: 12px;
  padding: 0 24px;
`;

const SScreenWithTitle = styled(ScreenWithTitle)``;

const TotalItem = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: #1c1c1e;
  margin-top: 16px;
`;

const SButtonBottom = styled(ButtonBottom)``;

const Container = memo(({order}: {order: IOrderDetail}) => {
  const {productReturn, setProductReturn} = useContext(OrderContext);

  const onCountChange = useCallback(
    (idxProduct: number, newCount: number) => {
      const item = {...productReturn[idxProduct]};
      item.alternativeQuantity = newCount;
      productReturn[idxProduct] = {...item};
      setProductReturn([...productReturn]);
    },
    [productReturn],
  );

  const onCreateReturn = async () => {
    global.showLoading();
    const returnItems = productReturn
      .filter(elm => elm.checked)
      .map(elm => ({
        orderItemSeqId: elm.orderItemSeqId,
        productId: elm.productId,
        returnReasonEnumId: 'RrsnDidNotWant',
        alternativeReturnQuantityUomId: elm.alternativeQuantityUomId,
        alternativeReturnQuantity: elm.alternativeQuantity,
      }));

    const params = {
      orderId: order.orderId,
      facilityId: order.facility.facilityId,
      returnItems,
    };
    const response = await createReturnOrder(params);
    global.hideLoading();
    if (response) {
      global.showMessage('Tạo đơn hoàn hàng thành công');
      Actions.pop();
    }
  };

  useEffect(() => {
    const newArray = [...order.productItems].map(elm => ({
      ...elm,
      checked: false,
      baseQuantity: elm.alternativeQuantity,
    }));

    setProductReturn(newArray);
  }, []);

  return (
    <SScreenWithTitle title="Tạo đơn hoàn hàng" removePadding>
      <SScrollView
        contentContainerStyle={{paddingBottom: 24}}
        showsVerticalScrollIndicator={false}>
        <StatusSection status={order.statusId} />
        {!_.isEmpty(order.customer) && (
          <CustomerSection customer={order.customer} />
        )}
        <OrderInformation
          orderValue={order.productItemsTotalNoVAT}
          vatTotal={order.vatTotal}
          discountTotal={order.discountTotal}
          grandTotal={order.grandTotal}
          orderId={order.orderId}
        />
        <TotalItem>Danh sách sản phẩm ({order.productItems.length})</TotalItem>
        {productReturn.map((item, index) => (
          <ProductSelectReturn
            key={item.pseudoId}
            onCountChange={newCount => onCountChange(index, newCount)}
            count={item.alternativeQuantity}
            baseCount={item.baseQuantity}
            productName={item.itemDescription}
            quantityUomDesc={item.alternativeQuantityUomId}
            price={item.alternativeUnitAmountVAT}
            checked={item.checked ?? false}
            index={index}
          />
        ))}
      </SScrollView>
      <SButtonBottom
        disabled={!productReturn.some(elm => elm.checked !== false)}
        text="Hoàn tất"
        onPress={onCreateReturn}
      />
    </SScreenWithTitle>
  );
});

const CreateReturnOrderScreen = (props: any) => {
  return (
    <OrderProvider>
      <Container {...props} />
    </OrderProvider>
  );
};

export default CreateReturnOrderScreen;
