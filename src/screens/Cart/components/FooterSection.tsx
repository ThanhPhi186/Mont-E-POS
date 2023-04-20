import Theme from '@/Colors';
import SubmitButton from '@/components/SubmitButton';
import Fetch from '@/services/Fetch';
import {createOrder, editOrder, holdOrder} from '@/store/order/api';
import {ICreateOrderParams, IOrderItems} from '@/store/order/type';
import {getLocaleNumber} from '@/utils/convertString';
import React, {memo, useCallback, useContext} from 'react';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import {CartContext} from '../CartConext';

const Wrapper = styled.View`
  background-color: ${p => p.theme.backgroundInput};
  padding: 0px 24px 24px 24px;
`;

const RowBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const SSubmitButton = styled(SubmitButton)`
  width: 48%;
`;

const SHoldButton = styled(SubmitButton)`
  width: 48%;
  border: 2px solid #007aff;
  background-color: #fff;
`;

const SInfoPayment = styled(RowBetween)`
  padding: 12px 0px;
`;

const Label = styled.Text``;
const SGrandTotal = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
`;

const FooterSection = memo(() => {
  const {orderTentative, products, customer, setProducts, setCustomer} =
    useContext(CartContext);

  console.log('orderTentative', products);

  const disabled = !(products.length > 0);
  const createSuccess = useCallback(order => {
    order && Actions.push('confirm_order_screen', {order});
    global.hideLoading();
  }, []);

  const onHoldOrder = async orderId => {
    const heldOrder = await holdOrder(orderId);
    global.hideLoading();
    if (heldOrder) {
      global.showMessage('Đơn hàng được giữ thành công');
      setProducts([]);
      setCustomer(undefined);
    }
  };

  const onCreateOrder = useCallback(
    async (type: 'hold' | 'create' | 'edit') => {
      console.log('type', type);

      global.showLoading();

      const orderItems: IOrderItems[] = products.map(
        ({product, config, count}) => {
          return {
            productId: product.productId,
            quantity: count,
            quantityUomId: config.quantityUomId,
            unitAmountVAT: config.priceOut.price + config.priceOut.taxAmount,
          };
        },
      );

      const params: ICreateOrderParams = {
        customerPartyId: customer ? customer.partyId : '_NA_',
        productStoreId: Fetch.current_channel?.productStoreId || '',
        orderItems: orderItems,
        ...(type !== 'create' && {orderId: orderTentative}),
      };

      console.log('params', params);

      const result =
        type === 'create' ? await createOrder(params) : await editOrder(params);
      if (result) {
        type === 'hold'
          ? onHoldOrder(result.orderId)
          : createSuccess(result.orderDetail);
      } else {
        global.hideLoading();
      }
    },
    [products, customer, orderTentative],
  );

  const calculatePrice = () => {
    return getLocaleNumber(
      products.reduce((result, item) => {
        return (
          result +
          (item.config.priceOut.price + item.config.priceOut.taxAmount) *
            item.count
        );
      }, 0),
    );
  };

  const onOpenModalHold = useCallback(() => {
    global.showAlert({
      title: 'Giữ đơn hàng',
      description: 'Bạn có muốn giữ đơn hàng này không?',
      textCancel: 'Hủy',
      textNext: 'Giữ đơn',
      onNext: () => {
        onCreateOrder('hold');
      },
    });
  }, [orderTentative]);

  return (
    <Wrapper>
      <SInfoPayment>
        <Label>Tổng tạm tính</Label>
        <SGrandTotal>{calculatePrice()} đ</SGrandTotal>
      </SInfoPayment>
      <RowBetween>
        <SHoldButton
          text="Giữ đơn"
          disabled={disabled}
          onPress={onOpenModalHold}
          textColor={Theme.blue2}
        />
        <SSubmitButton
          text="Tạo đơn ngay"
          disabled={disabled}
          onPress={() =>
            orderTentative ? onCreateOrder('edit') : onCreateOrder('create')
          }
        />
      </RowBetween>
    </Wrapper>
  );
});

export default FooterSection;
