import ScreenWithTitle from '@/components/ScreenWithTitle';
import SelectIcon from '@/components/SelectIcon';
import SubmitButton from '@/components/SubmitButton';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.TouchableOpacity<{active: boolean}>`
  background: ${p => p.theme.backgroundInput};
  border-radius: 12px;
  flex-direction: row;
  padding: 12px 16px;
  margin-top: 12px;
  align-items: center;
  ${p =>
    p.active &&
    `
    border: 1px solid #007AFF;

  `}
`;
const Column = styled.View`
  flex: 1;
`;
const Title = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  color: ${p => p.theme.primaryDark};
`;

const Description = styled.Text`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: ${p => p.theme.primaryDark};
`;

const ChannelItem = memo(
  ({
    title,
    code,
    onSelected,
    active,
  }: {
    title: string;
    code: string;
    onSelected: (code: string) => void;
    active: boolean;
  }) => {
    return (
      <Wrapper active={active} onPress={() => onSelected(code)}>
        <Column>
          <Title>{title}</Title>
        </Column>
        <SelectIcon active={active} />
      </Wrapper>
    );
  },
);

export default ChannelItem;
