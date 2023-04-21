import ScreenWithTitle from '@/components/ScreenWithTitle';
import {useNavigationParams} from '@/hooks/navigation';
import {fetchOrderDetail, getTentative, onCancelOrder} from '@/store/order/api';
import _ from 'lodash';
import React, {useCallback, useContext, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import {CartContext} from './CartConext';
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

const CreateOrderScreen = () => {
  const {
    orderTentative,
    setProducts,
    setCustomer,
    setOrderTentative,
    clearOrder,
  } = useContext(CartContext);

  const {productFromQr} = useNavigationParams<{
    productFromQr: boolean;
  }>();

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
    const orderId = await getTentative();
    if (orderId) {
      setOrderTentative(orderId);

      if (!productFromQr) {
        const detailOrder = await fetchOrderDetail(orderId);
        if (!detailOrder) {
          return;
        }

        const convertProduct = detailOrder.productItems.map(elm => {
          const config = elm.configs.find(
            elmConfig =>
              elmConfig.quantityUomId === elm.alternativeQuantityUomId,
          );
          const product = {
            baseUomDesc: elm.alternativeQuantityUomDesc,
            configs: elm.configs,
            productId: elm.productId,
            productName: elm.itemDescription,
            pseudoId: elm.pseudoId,
            quantityUomId: elm.alternativeQuantityUomId,
          };

          const count = elm.alternativeQuantity;
          return {config, product, count};
        });
        !_.isEmpty(detailOrder.customer) && setCustomer(detailOrder.customer);
        setProducts(convertProduct);
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
  }, [orderTentative]);

  useEffect(() => {
    getOrderTentative();
    return () => {
      clearOrder();
    };
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
};

export default CreateOrderScreen;
