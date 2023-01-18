import ListLoading from '@/components/ListLoading';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import { fetchPromotionDetail } from '@/store/order/api';
import { IPromotionDetail } from '@/store/order/type';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import PromotionItem from './components/PromotionItem';

const MoreView = styled.View`
  margin-top: 8px;
`;

const Title = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;

  color: #363636;
  margin-top: 16px;
`;

const NormalText = styled.Text`
  margin-top: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: #363636;
`;

const PromotionDetail = ({ promotionId }: { promotionId: string }) => {
  const [data, setData] = useState<IPromotionDetail | null>(null);

  const getData = useCallback(async () => {
    const newData = await fetchPromotionDetail(promotionId);
    console.log(newData);
    setData(newData);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  if (!data) return <ListLoading loading />;
  return (
    <ScrollView>
      <PromotionItem item={data.promoDetail as any} hideTime />
      <MoreView>
        <Title>Mã ưu đãi</Title>
        <NormalText>{data.promoDetail.storePromotionId}</NormalText>
        <Title>Hạn sử dụng</Title>
        <NormalText>
          Bắt đầu từ:{' '}
          {moment(data.promoDetail.fromDate).format('DD/MM/YYYY hh:mm')}
        </NormalText>
        {data.promoDetail.thruDate ? (
          <NormalText>
            Hết hạn:{' '}
            {moment(data.promoDetail.thruDate).format('DD/MM/YYYY hh:mm')}
          </NormalText>
        ) : null}
        <Title>Điều kiện áp dụng:</Title>
        {data.conditions.map((txt, index) => (
          <NormalText key={index.toString()}>- {txt}</NormalText>
        ))}
        <Title>Quà tặng ưu đãi</Title>
        {data.gifts.map((txt, index) => (
          <NormalText key={index.toString()}>- {txt}</NormalText>
        ))}
      </MoreView>
    </ScrollView>
  );
};

const PromotionDetailScreen = ({ promotionId }: { promotionId: string }) => (
  <ScreenWithTitle title="Chi tiết ưu đãi">
    <PromotionDetail promotionId={promotionId} />
  </ScreenWithTitle>
);
export default PromotionDetailScreen;
