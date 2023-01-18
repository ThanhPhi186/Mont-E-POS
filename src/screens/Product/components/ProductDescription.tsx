import ScreenWithTitle from '@/components/ScreenWithTitle';
import { useNavigationParams } from '@/hooks/navigation';
import { getImageUrl } from '@/services/Fetch';
import { IFullProduct } from '@/store/product/type';
import { widthScreen } from '@/utils/Tranform';
import React, { memo } from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  border-top-width: 1px;
  border-top-color: #f2f2f7;
  padding: 16px 0px;
`;

const Description = styled.Text`
  width: 100%;
`;

const ProductDescription = memo(() => {
  const {
    detail: {
      product: { description },
    },
  } = useNavigationParams<{ detail: IFullProduct }>();
  if (!description) return null;
  return (
    <Wrapper>
      <Description>{description.trim()}</Description>
    </Wrapper>
  );
});

export default ProductDescription;
