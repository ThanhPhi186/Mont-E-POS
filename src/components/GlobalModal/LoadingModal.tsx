import React, {memo, useEffect, useCallback, useState} from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
  elevation: 999;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

const Loading = styled.ActivityIndicator.attrs(p => ({
  color: '#fff',
}))``;

const Text = styled.Text`
  margin-top: 16px;
  color: #fff;
  text-transform: capitalize;
`;

const LoadingModal = memo(function () {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState('');

  const showLoading = useCallback((_content?: string) => {
    setContent(_content || 'Loading');
    setShow(true);
  }, []);
  const hideLoading = useCallback(() => {
    setContent('');
    setShow(false);
  }, []);

  useEffect(() => {
    global.showLoading = showLoading;
    global.hideLoading = hideLoading;
  }, []);
  if (!show) return null;
  return (
    <Wrapper>
      <Loading />
      {!!content && <Text>{content}</Text>}
    </Wrapper>
  );
});

export default LoadingModal;
