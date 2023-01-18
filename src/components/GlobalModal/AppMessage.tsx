import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  padding: 12px 16px;
  background-color: rgba(0, 0, 0, 0.93);
  border-radius: 40px;
  opacity: 0.9;
`;

const Wrapper = styled.View`
  position: absolute;
  z-index: 1000;
  top: 72px;
  elevation: 3;
  align-items: center;
  left: 0;
  right: 0;
`;
const Content = styled.Text`
  color: #fff;
  font-weight: 500;
`;

function AppMessage() {
  const [content, setContent] = useState('');

  const showMessage = useCallback((_content: string, timeout = 3000) => {
    setContent(_content);
    setTimeout(() => {
      setContent('');
    }, timeout);
  }, []);

  useEffect(() => {
    global.showMessage = showMessage;
  }, []);

  if (!content) return null;

  return (
    <Wrapper>
      <Container>
        <Content>{content}</Content>
      </Container>
    </Wrapper>
  );
}

export default AppMessage;
