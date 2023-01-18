import Icons from '@/Icons';
import { IOrderDetail } from '@/store/order/type';
import React, { memo } from 'react';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components/native';

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background: rgba(255, 204, 0, 0.1);
  border: 1px solid #ffcc00;
  border-radius: 12px;
  padding: 8px 12px;
  margin-bottom: 16px;
  border: 1px solid transparent;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const Icon = styled.Image`
  width: 32px;
  height: 32px;
`;

const HighlightText = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #363636;
  margin-left: 8px;
`;

const ArrowIcon = styled.Image``;

const PromotionSection = memo(
  ({
    orderId,
    onAppleChange,
    itemLength,
  }: {
    orderId: string;
    onAppleChange: (order: IOrderDetail) => void;
    itemLength: number;
  }) => {
    const hasPromotion = itemLength > 0;
    return (
      <Wrapper
        onPress={() =>
          Actions.push('select_promotion_screen', {
            orderId,
            onApplySuccess: onAppleChange,
          })
        }
        style={{
          backgroundColor: hasPromotion
            ? 'rgba(52, 199, 89, 0.1)'
            : 'rgba(255, 204, 0, 0.1)',
          borderColor: hasPromotion ? '#34C759' : '#FFCC00',
        }}>
        <Row>
          <Icon source={Icons.icPromotion} />
          <HighlightText>
            {itemLength === 0
              ? 'Chọn mã ưu đãi'
              : `Đã áp dụng ${itemLength} Ưu đãi`}
          </HighlightText>
        </Row>
        <ArrowIcon source={Icons.icArrowRight24} />
      </Wrapper>
    );
  },
);

export default PromotionSection;
