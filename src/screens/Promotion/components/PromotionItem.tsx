import ButtonChecked from '@/components/ButtonChecked';
import Icons from '@/Icons';
import {IOrderPromotion} from '@/store/order/type';
import moment from 'moment';
import React, {memo} from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  background: ${p => p.theme.backgroundInput};
  border-radius: 8px;
  margin-top: 12px;
`;

const Icon = styled.Image``;

const Column = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const Desc = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  color: #363636;
`;

const RowTime = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

const Time = styled.Text`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;

  color: #8e8e93;
  margin-top: 2px;
`;

const PromotionItem = memo(
  ({
    item,
    selected,
    onPress,
    hideTime,
  }: {
    item: IOrderPromotion;
    selected?: boolean;
    onPress?: (id: string) => void;
    hideTime?: boolean;
  }) => {
    return (
      <Wrapper onPress={() => onPress?.(item.storePromotionId)}>
        <Icon source={Icons.icPromotion} />
        <Column>
          <Desc numberOfLines={2}>{item.itemDescription}</Desc>
          {!hideTime && (
            <>
              <Time>
                Bắt đầu từ: {moment(item.fromDate).format('DD/MM/YYYY')}
              </Time>
              {!!item.thruDate && (
                <Time>Đến: {moment(item.thruDate).format('DD/MM/YYYY')}</Time>
              )}
            </>
          )}
        </Column>
        {typeof selected === 'boolean' && <ButtonChecked value={selected} />}
      </Wrapper>
    );
  },
);

export default PromotionItem;
