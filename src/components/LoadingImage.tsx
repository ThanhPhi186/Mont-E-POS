import React, {memo, useState} from 'react';
import styled from 'styled-components/native';
import {ImageProps} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';

const ImageBackground = styled(FastImage)``;

const ActiviIndicator = styled.ActivityIndicator`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const LoadingImage = memo(function ({
  children,
  ...props
}: {children?: any} & FastImageProps) {
  const [loading, setLoading] = useState(true);
  return (
    <ImageBackground
      {...props}
      onLoadEnd={() => {
        setLoading(false);
      }}>
      {loading && <ActiviIndicator color={'#fff'} />}
      {children}
    </ImageBackground>
  );
});

export default LoadingImage;
