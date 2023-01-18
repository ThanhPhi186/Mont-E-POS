import ListLoading from '@/components/ListLoading';
import ListSearchEmpty from '@/components/ListSearchEmpty';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import SubmitButton from '@/components/SubmitButton';
import SVGIcon from '@/Icons/SVGIcon';
import { applyPromotion, fetchPromotionOfOrder } from '@/store/order/api';
import { IOrderDetail, IOrderPromotion } from '@/store/order/type';
import React, { memo, useCallback, useEffect, useState } from 'react';
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

const ListPromotionScreen = ({
  orderId,
  onApplySuccess,
}: {
  orderId: string;
  onApplySuccess: (order: IOrderDetail) => void;
}) => {
  const [data, setData] = useState<IOrderPromotion[] | null>(null);
  const [listSelected, setSelected] = useState<string[]>([]);

  const getDataPromotion = useCallback(async () => {
    const orderPromotion = await fetchPromotionOfOrder(orderId);
    const selected = orderPromotion
      .filter(item => item.wasApplied === 'Y')
      .map(item => item.storePromotionId);
    setSelected(selected);
    setData(orderPromotion);
  }, [orderId]);

  const onItemPress = useCallback(
    (promotionId: string) => {
      const checkExist = listSelected.findIndex(id => promotionId === id);
      checkExist !== -1
        ? listSelected.splice(checkExist, 1)
        : listSelected.push(promotionId);
      setSelected([...listSelected]);
    },
    [listSelected],
  );

  const onApplyPromotion = useCallback(async () => {
    global.showLoading();

    const result = await applyPromotion(orderId, listSelected);
    global.hideLoading();

    result.orderDetail && onApplySuccess(result.orderDetail);
  }, [listSelected, onApplySuccess]);

  useEffect(() => {
    getDataPromotion();
  }, []);

  return (
    <ScreenWithTitle title="Chọn ưu đãi">
      <Wrapper>
        <FlatList
          data={data || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: { item: any }) => (
            <PromotionItem
              item={item}
              selected={listSelected.includes(item.storePromotionId)}
              onPress={onItemPress}
            />
          )}
          ListEmptyComponent={data ? <ListSearchEmpty /> : null}
          ListHeaderComponent={
            !data ? (
              <ListLoading loading />
            ) : data.length > 0 ? (
              <HeaderView>
                <HighLight>Các ưu đãi có thể áp dụng:</HighLight>
                <Description>
                  *Có thể chọn nhiều ưu đãi khác loại nhau.
                </Description>
              </HeaderView>
            ) : (
              <Center>Không tìm có khuyến mại nào</Center>
            )
          }
        />
        {data && data.length > 0 && (
          <SSubmitButton text="Áp dụng" onPress={onApplyPromotion} />
        )}
      </Wrapper>
    </ScreenWithTitle>
  );
};

export default ListPromotionScreen;
