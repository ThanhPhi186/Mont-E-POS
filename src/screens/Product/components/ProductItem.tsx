import Icons from '@/Icons';
import SVGIcon from '@/Icons/SVGIcon';
import {getImageUrl} from '@/services/Fetch';
import {IOrderProductItem} from '@/store/order/type';
import {fetchProductDetail} from '@/store/product/api';
import {IFullProduct, IProductItem} from '@/store/product/type';
import {getLocaleNumber} from '@/utils/convertString';
import {widthScreen} from '@/utils/Tranform';
import React, {memo, useCallback} from 'react';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
const ITEM_WIDTH = (widthScreen - 64) / 2;
const Wrapper = styled.TouchableOpacity`
  width: ${ITEM_WIDTH}px;
  border-radius: 12px;
  background: ${p => p.theme.backgroundInput};
  margin: 8px 0;
`;

const Image = styled.Image`
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_WIDTH}px;
  border-radius: 12px;
`;

const Body = styled.View`
  margin: 12px 8px;
`;

const Name = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #1c1c1e;
`;

const Price = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: #1047ac;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

const ButtonProperty = styled.View`
  padding: 4px 8px;
  background: #e5e5ea;
  border-radius: 4px;
  flex-direction: row;
`;

const PropertyText = styled.Text`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: #1c1c1e;
`;

const ProductItem = memo(
  ({index, item}: {item: IFullProduct; index: number}) => {
    const {
      product,
      contents: [content],
    } = item;
    const imageUrl = getImageUrl(content?.contentLocation);

    const onItemPress = useCallback(async () => {
      global.showLoading();
      const detail = await fetchProductDetail(item.product.productId);
      global.hideLoading();
      detail && Actions.push('product_detail_screen', {detail});
    }, []);

    return (
      <Wrapper
        onPress={onItemPress}
        style={index % 2 === 0 ? {marginRight: 8} : {marginLeft: 8}}>
        {imageUrl ? (
          <Image source={{uri: imageUrl}} />
        ) : (
          <SVGIcon
            name="item-empty-image"
            width={ITEM_WIDTH}
            height={ITEM_WIDTH}
          />
        )}
        <Body>
          <Name numberOfLines={2}>{product.productName}</Name>
          <Row>
            <ButtonProperty>
              <PropertyText>{item.product.baseUomDesc}</PropertyText>
            </ButtonProperty>
            <Price>{getLocaleNumber(item.product.basePriceVAT)}</Price>
          </Row>
        </Body>
      </Wrapper>
    );
  },
);
export default ProductItem;
