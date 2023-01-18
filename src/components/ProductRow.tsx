import Icons from '@/Icons';
import SVGIcon from '@/Icons/SVGIcon';
import {IFullProduct, IProductConfig} from '@/store/product/type';
import {getLocaleNumber} from '@/utils/convertString';
import React, {memo, useCallback, useEffect, useState} from 'react';

import styled from 'styled-components/native';
import ButtonChecked from './ButtonChecked';

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px;
  background: ${p => p.theme.backgroundInput};
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
  padding: 0 12px;
  align-items: flex-start;
`;

const ButtonProperty = styled.View`
  padding: 4px 8px;
  background: #e5e5ea;
  border-radius: 4px;
  margin-top: 4px;
  flex-direction: row;
`;

const PropertyText = styled.Text`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: #1c1c1e;
`;

const Icon = styled.Image`
  margin-top: -2px;
  margin-left: 4px;
`;

const Footer = styled.View`
  margin-top: 8px;
`;

const Price = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: ${p => p.theme.blueMain};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Button = styled.TouchableOpacity``;

const IconCount = styled.Image`
  width: 24px;
  height: 24px;
`;

const CountText = styled.Text`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #1c1c1e;
`;

const ProductImage = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 8px;
`;

const CountInput = styled.TextInput`
  width: 60px;
  text-align: center;
  padding: 0;
  background-color: transparent;
`;

const FooterSection = memo(
  ({
    config,
    count,
    onCountChange,
    onDelete,
  }: {
    config: IProductConfig;
    count?: number;
    onCountChange?: (count: number) => void;
    onDelete?: () => void;
  }) => {
    const {
      priceOut: {price, taxAmount},
    } = config;
    const priceToShow = price + taxAmount;
    const [tempCount, setTempCount] = useState<number>(1);

    const onDeletePress = useCallback(() => {
      global.showAlert({
        title: 'Xóa sản phẩm',
        description: 'Bạn có chắc chắn muốn xóa sản phẩm không?',
        textNext: 'Xác nhận',
        textCancel: 'Hủy',
        onNext: onDelete,
      });
    }, [onDelete]);

    const onChangeCountByInput = useCallback((t: string) => {
      if (!t) return setTempCount(0);
      if (!/\d+$/g.test(t) || !!Number.isNaN(Number(t))) return;
      setTempCount(Math.floor(Number(t)));
    }, []);

    const onBlurInput = useCallback(() => {
      onCountChange?.(tempCount || 1);
    }, [tempCount, onCountChange]);

    useEffect(() => {
      setTempCount(count || 1);
    }, [count]);

    return (
      <Footer>
        <Row
          style={{
            marginTop: 10,
            justifyContent: 'space-between',
            width: '100%',
          }}>
          {!!onCountChange && typeof count === 'number' ? (
            <Row>
              <Button
                hitSlop={{top: 15, left: 15, bottom: 15}}
                // disabled={count < 2}
                onPress={() => count > 1 && onCountChange(count - 1)}>
                <IconCount source={Icons.icCountReduce} />
              </Button>
              <CountInput
                hitSlop={{top: 15, bottom: 15}}
                style={{width: 60}}
                selectTextOnFocus
                value={tempCount + ''}
                onBlur={onBlurInput}
                keyboardType="numeric"
                onChangeText={onChangeCountByInput}
              />
              <Button
                hitSlop={{top: 15, right: 15, bottom: 15}}
                onPress={() => onCountChange(count + 1)}>
                <IconCount source={Icons.icCountRaise} />
              </Button>
            </Row>
          ) : (
            <CountText>Số lượng: {count || 0}</CountText>
          )}
          {!!onDelete && (
            <Button onPress={onDeletePress}>
              <IconCount source={Icons.icDelete} />
            </Button>
          )}
        </Row>
      </Footer>
    );
  },
);

const PromotionView = styled.View`
  padding: 2px 4px;
  background-color: ${p => p.theme.green};
  border-radius: 4px;
`;

const PromotionLabel = styled.Text`
  color: #fff;
`;

interface IConfirmProps {
  contentLocation?: string;
  productName: string;
  quantityUomDesc: string;
  count: number;
  price: number;
  isPromo?: 'Y' | 'N';
}

const ConfirmProduct = ({
  contentLocation,
  productName,
  quantityUomDesc,
  count,
  price,
  isPromo,
}: IConfirmProps) => {
  return (
    <Wrapper>
      {/* {!!imageUrl ? (
        <ProductImage source={{uri: imageUrl}} />
      ) : ( */}
      <SVGIcon name="item-empty-image" />
      {/* )} */}
      <Column>
        {isPromo === 'Y' && (
          <PromotionView>
            <PromotionLabel>SP Ưu đãi</PromotionLabel>
          </PromotionView>
        )}
        <Name numberOfLines={1}>{productName}</Name>
        <ButtonProperty>
          <PropertyText>{quantityUomDesc}</PropertyText>
        </ButtonProperty>
        <Row
          style={{
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 8,
          }}>
          <Price>{getLocaleNumber(price)} đ</Price>

          <CountText>Số lượng: {count}</CountText>
        </Row>
      </Column>
    </Wrapper>
  );
};

const ProductRow = memo(
  ({
    item,
    selectedId,
    onItemPress,
    config,
    count,
    onCountChange,
    onDelete,
    confirm,
  }: {
    item?: IFullProduct;
    selectedId?: string;
    onItemPress?: (item: IFullProduct) => void;
    config?: IProductConfig;
    count?: number;
    onCountChange?: (count: number) => void;
    onDelete?: () => void;
    confirm?: IConfirmProps;
  }) => {
    if (confirm) return <ConfirmProduct {...confirm} />;
    if (!item) return null;

    const selected = selectedId === item.productId;

    const priceConfig = config
      ? config.priceOut.price + config.priceOut.taxAmount
      : 0;
    return (
      <Wrapper onPress={() => !!item && onItemPress?.(item)}>
        <SVGIcon name="item-empty-image" />
        <Column>
          <Name numberOfLines={1}>{item.productName}</Name>
          <Row
            style={{
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 8,
            }}>
            <ButtonProperty>
              <PropertyText>
                {config?.quantityUomDesc || item.baseUomDesc}
              </PropertyText>
              {!config && <Icon source={Icons.icDropdown} />}
            </ButtonProperty>
            <Price>
              {priceConfig
                ? getLocaleNumber(priceConfig)
                : getLocaleNumber(
                    item?.basePriceVAT || item.configs[0].priceOut.price,
                  )}
              đ
            </Price>
          </Row>

          {!!config && (
            <FooterSection
              config={config}
              onCountChange={onCountChange}
              count={count}
              onDelete={onDelete}
            />
          )}
        </Column>
        {!!selectedId && <ButtonChecked value={selected} />}
      </Wrapper>
    );
  },
);

export default ProductRow;
