import ScreenWithTitle from '@/components/ScreenWithTitle';
import {useNavigationParams} from '@/hooks/navigation';
import {fetchOrderDetail, getTentative, onCancelOrder} from '@/store/order/api';
import {useCart} from '@/store/order/hook';
import {IOrderDetail} from '@/store/order/type';
import {IProductCart} from '@/store/product/type';
import Emitter from '@/utils/Emitter';
import _ from 'lodash';
import React, {memo, useCallback, useContext, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import {CartContext, CartProvider} from './CartConext';
import CustomerSection from './components/CustomerSection';
import FooterSection from './components/FooterSection';
import ProductSection from './components/ProductSection';

const SScrollView = styled(KeyboardAwareScrollView)`
  flex: 1;
  padding-right: 24px;
  padding-left: 24px;
`;

const WrapperSection = styled.View``;

const Label = styled.Text``;

const TextCancel = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #ff3b30;
`;
const SButton = styled.TouchableOpacity``;

const CreateOrder = memo(() => {
  const {
    orderTentative,
    customer,
    products,
    setProducts,
    setCustomer,
    setOrderTentative,
  } = useContext(CartContext);
  const {deleteCart} = useCart();

  const {productFromQr} = useNavigationParams<{
    productFromQr: IProductCart[];
  }>();

  const clearOrder = () => {
    deleteCart();
    setProducts([]);
    setCustomer(undefined);
  };

  const onCancel = async () => {
    if (orderTentative) {
      global.showLoading();
      const cancelledOrder = await onCancelOrder(orderTentative);
      global.hideLoading();
      cancelledOrder && clearOrder();
    } else {
      clearOrder();
    }
  };

  const getOrderTentative = async () => {
    clearOrder();
    const orderId = await getTentative();
    productFromQr && setProducts(productFromQr);

    if (orderId) {
      setOrderTentative(orderId);
      const detailOrder = await fetchOrderDetail(orderId);

      if (detailOrder) {
        !_.isEmpty(detailOrder.customer) && setCustomer(detailOrder.customer);
        if (!productFromQr) {
          const convertProduct = detailOrder.productItems.map(elm => {
            return {
              config: elm.configs.find(
                elmConfig =>
                  elmConfig.quantityUomId === elm.alternativeQuantityUomId,
              ),
              count: elm.alternativeQuantity,
              product: {
                baseUomDesc: elm.alternativeQuantityUomDesc,
                configs: elm.configs,
                productId: elm.productId,
                productName: elm.itemDescription,
                pseudoId: elm.pseudoId,
                quantityUomId: elm.alternativeQuantityUomId,
              },
            };
          });
          setProducts(convertProduct);
        }
      }
    }
  };

  const onOpenModalCancel = useCallback(() => {
    global.showAlert({
      title: 'Huỷ đơn hàng',
      description: 'Bạn có muốn huỷ đơn hàng này không?',
      textCancel: 'Hủy',
      textNext: 'Xác nhận',
      onNext: () => {
        onCancel();
      },
    });
  }, []);

  useEffect(() => {
    getOrderTentative();
  }, []);

  useEffect(() => {
    const __sub = Emitter.listen(Emitter.CLEAR_CART, () => {
      console.log('clearOrder');

      clearOrder();
    });
    return () => __sub.remove();
  }, []);

  const renderRightComponent = () => {
    return (
      <SButton onPress={onOpenModalCancel}>
        <TextCancel>Huỷ đơn</TextCancel>
      </SButton>
    );
  };

  return (
    <ScreenWithTitle
      title="Tạo đơn hàng"
      removePadding
      onPressBack={() => {
        Actions.popTo('_home_tab');
      }}
      rightComponent={renderRightComponent()}>
      <SScrollView showsVerticalScrollIndicator={false}>
        <WrapperSection>
          <Label>Khách hàng</Label>
          <CustomerSection disabled />
        </WrapperSection>
        <ProductSection />
      </SScrollView>
      <FooterSection />
    </ScreenWithTitle>
  );
});

const CreateOrderScreen = () => {
  return (
    <CartProvider>
      <CreateOrder />
    </CartProvider>
  );
};

export default CreateOrderScreen;
