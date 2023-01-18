import {NormalText} from '@/components/TextCommon';
import {useNavigationParams} from '@/hooks/navigation';
import {IReportDetail, IReportStatisticItem} from '@/store/report/type';
import {getLocaleNumber} from '@/utils/convertString';
import React, {memo, useCallback, useMemo, useState} from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.TouchableOpacity`
  background: ${p => p.theme.backgroundInput};
  border-radius: 12px;
  padding: 12px 16px;
  margin-top: 12px;
  padding-top: 4px;
`;

const Name = styled.Text`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: rgb(28, 28, 30);
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

const Label = styled(NormalText)`
  color: #8e8e93;
  width: 120px;
`;

const Value = styled(NormalText)`
  flex: 1;
  text-align: right;
`;

const CustomerInformation = memo(() => {
  const {detail} = useNavigationParams<{detail: IReportDetail}>();
  return (
    <Wrapper>
      <Row>
        <Label>Cửa hàng:</Label>
        <Value>{detail.fullName}</Value>
      </Row>
      <Row>
        <Label>Số điện thoại:</Label>
        <Value>{detail.telecomNumber || '--Chưa có--'}</Value>
      </Row>
      <Row>
        <Label>Địa chỉ:</Label>
        <Value numberOfLines={2}>{detail.fullAddressLocal}</Value>
      </Row>
    </Wrapper>
  );
});

export default CustomerInformation;
