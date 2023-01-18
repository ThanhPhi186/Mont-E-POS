import ScreenWithTitle from '@/components/ScreenWithTitle';
import { useNavigationParams } from '@/hooks/navigation';
import { getImageUrl } from '@/services/Fetch';
import { IFullProduct } from '@/store/product/type';
import { widthScreen } from '@/utils/Tranform';
import React, { memo } from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View``;

const Image = styled.Image`
  width: 100%;
  height: ${widthScreen}px;
`;

const ImageSection = memo(() => {
  const {
    detail: {
      contents: [content],
    },
  } = useNavigationParams<{ detail: IFullProduct }>();
  if (!content) return null;
  const imageUrl = getImageUrl(content.contentLocation);
  if (!imageUrl) return null;
  return (
    <Wrapper>
      <Image source={{ uri: imageUrl }} />
    </Wrapper>
  );
});

export default ImageSection;
