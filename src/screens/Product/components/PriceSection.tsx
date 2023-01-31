import ScreenWithTitle from '@/components/ScreenWithTitle';
import {useNavigationParams} from '@/hooks/navigation';
import {getImageUrl} from '@/services/Fetch';
import {IFullProduct} from '@/store/product/type';
import {getLocaleNumber} from '@/utils/convertString';
import React, {memo, useContext} from 'react';
import styled from 'styled-components/native';
import {ProductContext} from '../ProductContext';

const Wrapper = styled.View`
  margin-top: 12px;
`;

const Price = styled.Text`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  color: ${p => p.theme.blue2};
`;

const PriceSection = memo(() => {
  const {selectedConfig} = useContext(ProductContext);
  if (!selectedConfig) return null;
  const {
    priceOut: {price, taxAmount},
  } = selectedConfig;
  return (
    <Wrapper>
      <Price>{getLocaleNumber(price + taxAmount)}</Price>
    </Wrapper>
  );
});

export default PriceSection;
