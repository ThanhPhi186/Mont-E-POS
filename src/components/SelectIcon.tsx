import React, {memo, useState} from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View<{active: boolean; size: number}>`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  border: 1px solid ${p => p.theme.primaryDark};
  padding: 2px;
  border-radius: 20px;
  ${p => p.active && `border-color: ${p.theme.blue2}`}
`;

const Icon = styled.View<{active: boolean}>`
  border-radius: 20px;
  flex: 1;
  ${p => p.active && `background: ${p.theme.blue2}; `}
`;

const SelectIcon = memo(
  ({active, size = 16}: {active: boolean; size?: number}) => {
    return (
      <Wrapper active={active} size={size}>
        <Icon active={active} />
      </Wrapper>
    );
  },
);
export default SelectIcon;
