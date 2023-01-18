import { NormalText } from '@/components/TextCommon';
import { IProductPriceChange } from '@/store/product/type';
import { IListCommission } from '@/store/report/type';
import { getLocaleNumber } from '@/utils/convertString';
import moment from 'moment';
import React, { memo } from 'react';

import styled from 'styled-components/native';

const Container = styled.View``;

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px 16px;
  background: #f2f2f7;
  border-radius: 12px;
  align-items: center;
  margin-top: 12px;
`;

const Name = styled.Text`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #1c1c1e;
`;

const Column = styled.View`
  flex: 1;
  align-items: flex-start;
`;

const TextDate = styled(NormalText)`
  color: #717171;
`;

const TextValue = styled.Text<{ isPayment: boolean }>`
  color: ${p => (p.isPayment ? '#FF9500' : '#34c759')};
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  width: 100%;
`;

const CommissionItem = memo(({ item }: { item: IListCommission }) => {
  return (
    <Container>
      <Wrapper>
        <Column>
          <Name numberOfLines={2}>{item.description}</Name>

          <Row>
            <TextDate>
              {moment(item.lastUpdatedStamp).format('DD/MM/YYYY')}
            </TextDate>
            <TextValue isPayment={item.statusId === 'PmntConfirmed'}>
              {item.statusId !== 'PmntConfirmed' && '+ '}
              {getLocaleNumber(item.amount)}
            </TextValue>
          </Row>
        </Column>
      </Wrapper>
    </Container>
  );
});

export default CommissionItem;
