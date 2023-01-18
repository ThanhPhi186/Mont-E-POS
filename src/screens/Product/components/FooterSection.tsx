import Theme from '@/Colors';
import Icons from '@/Icons';
import {useCart} from '@/store/order/hook';
import {BOTTOM_SPACE} from '@/utils/Tranform';
import React, {memo, useCallback, useContext} from 'react';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import {ProductContext} from '../ProductContext';

const Wrapper = styled.View`
  margin-top: 12px;
  border-top-width: 1px;
  border-top-color: #f2f2f7;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${BOTTOM_SPACE}px;
  padding: 12px 24px;
`;

const Image = styled.Image``;

const CartWrapper = styled.TouchableOpacity``;

const CartCountView = styled.View`
  position: absolute;
  background: #ff9500;
  border-radius: 8px;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  right: 0;
  top: -3px;
`;
const CartCountLabel = styled.Text`
  font-size: 10px;
  color: #fff;
`;

const ButtonView = styled.View`
  flex: 1;
  height: 48px;
  margin-left: 16px;
  border-radius: 12px;
  border: 2px solid ${p => p.theme.blue2};
  overflow: hidden;
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Label = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  color: #007aff;
`;

const FooterSection = memo(() => {
  const {selectedConfig, detail} = useContext(ProductContext);
  const {
    cart: {products},
    updateCart,
  } = useCart();
  const {product} = detail;
  const onSelectProduct = useCallback(() => {
    const indexExisted = products.findIndex(
      p =>
        p.product.productId === product.productId &&
        p.config.quantityUomId === selectedConfig.quantityUomId,
    );
    const findExistItem = indexExisted !== -1 ? products[indexExisted] : null;
    const item = {
      product: detail,
      config: selectedConfig,
      count: !findExistItem ? 1 : findExistItem.count + 1,
    };
    const newList = [...products, item];

    indexExisted !== -1 && (products[indexExisted] = item);

    updateCart({products: indexExisted !== -1 ? [...products] : newList});
  }, [products, selectedConfig, product, detail]);

  const onOrderNow = useCallback(() => {
    onSelectProduct();
    Actions.push('create_order');
  }, []);

  if (!selectedConfig) return null;

  return (
    <Wrapper>
      <CartWrapper onPress={() => Actions.push('create_order')}>
        <Image source={Icons.icCart} />
        <CartCountView>
          <CartCountLabel>{products?.length || 0}</CartCountLabel>
        </CartCountView>
      </CartWrapper>
      <ButtonView>
        <Button onPress={onSelectProduct}>
          <Label>Thêm vào đơn</Label>
        </Button>
        <Button onPress={onOrderNow} style={{backgroundColor: Theme.blue2}}>
          <Label style={{color: '#fff'}}>Lên đơn ngay</Label>
        </Button>
      </ButtonView>
    </Wrapper>
  );
});

export default FooterSection;
