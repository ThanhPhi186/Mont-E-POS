import ListLoading from '@/components/ListLoading';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import SubmitButton from '@/components/SubmitButton';
import {
  applyPromotion,
  fetchListPromotion,
  fetchPromotionOfOrder,
} from '@/store/order/api';
import {
  IOrderDetail,
  IOrderPromotion,
  IPromotionItem,
} from '@/store/order/type';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import PromotionItem from './components/PromotionItem';

const Wrapper = styled.View`
  flex: 1;
`;

const FlatList = styled.FlatList``;

const HeaderView = styled.View`
  margin-bottom: 12px;
`;

const HighLight = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #1c1c1e;
`;

const Description = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: #636366;
`;

const Center = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
`;

const SSubmitButton = styled(SubmitButton)``;

const ListPromotionScreen = ({}: {}) => {
  const [data, setData] = useState<IPromotionItem[] | null>(null);

  const getDataPromotion = useCallback(async () => {
    const orderPromotion = await fetchListPromotion();
    setData(orderPromotion);
  }, []);

  const onItemPress = useCallback((promotionId: string) => {
    Actions.push('promotion_detail_screen', {promotionId});
  }, []);

  useEffect(() => {
    getDataPromotion();
  }, []);

  return (
    <ScreenWithTitle title="Ưu đãi">
      <Wrapper>
        <FlatList
          data={data || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}: {item: any}) => (
            <PromotionItem item={item} onPress={onItemPress} />
          )}
          ListHeaderComponent={
            !data ? (
              <ListLoading loading />
            ) : data.length > 0 ? null : (
              <Center>Không có khuyến mại nào</Center>
            )
          }
        />
      </Wrapper>
    </ScreenWithTitle>
  );
};

export default ListPromotionScreen;
