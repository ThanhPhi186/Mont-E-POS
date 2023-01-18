import Theme from '@/Colors';
import {TOrderType} from '@/constants/variableConstant';
import React, {memo} from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View<{borderColor: string; background: string}>`
  padding: 12px 16px;
  background: ${p => p.theme.backgroundInput};
  border-radius: 12px;
  background-color: ${p => p.background};
  border: 1px solid ${p => p.borderColor};
`;

const StatusLabel = styled.Text<{color: string}>`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${p => p.color};
`;

export const convertStatus: Record<
  TOrderType,
  {borderColor: string; background: string; label: string}
> = {
  OrderApproved: {
    background: 'rgba(0, 122, 255, 0.1)',
    borderColor: Theme.blue2,
    label: 'Đơn hàng đang xử lý',
  },
  OrderCancelled: {
    background: 'rgba(255, 59, 48, 0.1)',
    borderColor: '#FF3B30',
    label: 'Đơn hàng đã hủy',
  },
  OrderOpen: {
    background: 'rgba(255, 149, 0, 0.1)',
    borderColor: '#FF9500',
    label: 'Đơn hàng đang chờ duyệt',
  },
  OrderCompleted: {
    background: 'rgba(52, 199, 89, 0.1)',
    borderColor: Theme.green,
    label: 'Đơn hàng hoàn thành',
  },
};

const StatusSection = memo(({status}: {status: TOrderType}) => {
  const statusValue = convertStatus[status] || convertStatus['OrderOpen'];

  return (
    <Wrapper
      background={statusValue.background}
      borderColor={statusValue.borderColor}>
      <StatusLabel color={statusValue.borderColor}>
        {statusValue.label}
      </StatusLabel>
    </Wrapper>
  );
});
export default StatusSection;
