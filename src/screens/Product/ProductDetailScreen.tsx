import ScreenWithTitle from '@/components/ScreenWithTitle';
import { useNavigationParams } from '@/hooks/navigation';
import { IFullProduct } from '@/store/product/type';
import React, { memo, useContext } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import ConfigSection from './components/ConfigSection';
import FooterSection from './components/FooterSection';
import ImageSection from './components/ImageSection';
import PriceSection from './components/PriceSection';
import ProductDescription from './components/ProductDescription';
import { ProductProvider } from './ProductContext';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

const SScreenWithTitle = styled(ScreenWithTitle)`
  border-top-right-radius: 0;
  padding: 0;
`;

const Container = styled.View`
  padding: 24px;
`;

const Name = styled.Text`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  color: #1c1c1e;
`;

const ProductDetail = memo(() => {
  const {
    detail: { product },
  } = useNavigationParams<{ detail: IFullProduct }>();
  return (
    <SScreenWithTitle title="Chi tiết sản phẩm">
      <Wrapper>
        <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
          <ImageSection />
          <Container>
            <Name numberOfLines={2}>{product.productName}</Name>
            <PriceSection />
            <ConfigSection />
            <ProductDescription />
          </Container>
        </ScrollView>
        <FooterSection />
      </Wrapper>
    </SScreenWithTitle>
  );
});

function ProductDetailScreen() {
  return (
    <ProductProvider>
      <ProductDetail />
    </ProductProvider>
  );
}

export default ProductDetailScreen;
