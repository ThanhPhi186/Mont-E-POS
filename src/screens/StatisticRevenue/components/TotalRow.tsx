import Theme from '@/Colors';
import { getLocaleNumber } from '@/utils/convertString';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components/native';

const Block = styled.View`
  width: 48%;
  padding: 12px 16px;
  background-color: #fff;
  border-radius: 12px;
`;

const Label = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: #636366;
`;
const Value = styled.Text<{ color: string }>`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: ${p => p.color};
  margin-top: 4px;
`;

const RowItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

const TotalRow = memo(
  ({
    grandTotal,
    revShare,
    revShareUnit,
    revShareLabel,
  }: {
    grandTotal: number;
    revShare: number;
    revShareUnit?: string;
    revShareLabel?: string;
  }) => {
    return (
      <RowItem>
        <Block style={{ backgroundColor: '#F2F3FF' }}>
          <Label>Tổng doanh thu</Label>
          <Value color={Theme.blue2}>{getLocaleNumber(grandTotal)} đ</Value>
        </Block>
        <Block style={{ backgroundColor: '#FFF7F2' }}>
          <Label>{revShareLabel || 'Tổng hoa hồng'}</Label>
          <Value color={Theme.orange}>
            {getLocaleNumber(revShare)} {revShareUnit || 'đ'}
          </Value>
        </Block>
      </RowItem>
    );
  },
);

export default TotalRow;
