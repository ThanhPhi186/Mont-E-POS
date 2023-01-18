import React, { memo, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
const Wrapper = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

function Customer() {
  return (
    <Wrapper>
      <Text>Customers</Text>
    </Wrapper>
  );
}

export default memo(Customer);
