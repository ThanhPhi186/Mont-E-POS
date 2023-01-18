import {NormalText} from '@/components/TextCommon';
import Icons from '@/Icons';
import SVGIcon from '@/Icons/SVGIcon';
import Fetch, {getImageUrl} from '@/services/Fetch';
import {
  IFullProduct,
  IProductConfig,
  IProductItem,
  IProductPriceChange,
} from '@/store/product/type';
import {getLocaleNumber} from '@/utils/convertString';
import React, {memo, useCallback} from 'react';

import styled from 'styled-components/native';

const Container = styled.View``;

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px;
  background: ${p => p.theme.backgroundInput};
  border-radius: 12px;
  align-items: center;
  margin-top: 12px;
`;

const Name = styled.Text`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #1c1c1e;
`;

const Column = styled.View`
  flex: 1;
  padding: 0 12px;
  align-items: flex-start;
`;

const ButtonProperty = styled.View`
  padding: 4px 8px;
  background: #e5e5ea;
  border-radius: 4px;
  margin-top: 4px;
  flex-direction: row;
`;

const PropertyText = styled.Text`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: #1c1c1e;
`;

const Label = styled(NormalText)``;

const NewPrice = styled(NormalText)`
  color: ${p => p.theme.blue2};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
`;

const ProductImage = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 8px;
`;

const ProductRow = memo(({item}: {item: IProductPriceChange}) => {
  return (
    <Container>
      <Label style={{marginTop: 16}}>{item.dateString}</Label>
      {item.priceChanges.map(product => (
        <Wrapper key={product.productId}>
          {!!getImageUrl(product.contentLocation) ? (
            <ProductImage
              source={{uri: getImageUrl(product.contentLocation)}}
            />
          ) : (
            <SVGIcon name="item-empty-image" />
          )}
          <Column>
            <Name numberOfLines={2}>{product.productName}</Name>
            <ButtonProperty>
              <PropertyText>{product.quantityUomDesc}</PropertyText>
            </ButtonProperty>
            <Row>
              <Label>Giá cũ: </Label>
              <Label>{getLocaleNumber(product.oldPrice)}</Label>
            </Row>
            <Row>
              <Label>Giá mới: </Label>
              <NewPrice>{getLocaleNumber(product.newPrice)}</NewPrice>
            </Row>
          </Column>
        </Wrapper>
      ))}
    </Container>
  );
});

export default ProductRow;
