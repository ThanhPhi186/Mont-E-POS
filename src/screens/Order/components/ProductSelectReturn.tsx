import ButtonChecked from '@/components/ButtonChecked';
import Icons from '@/Icons';
import SVGIcon from '@/Icons/SVGIcon';
import {getLocaleNumber} from '@/utils/convertString';
import React, {memo, useCallback, useContext, useEffect, useState} from 'react';

import styled from 'styled-components/native';
import {OrderContext} from '../OrderContext';

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ContainerItem = styled(Row)`
  margin-top: 12px;
`;

const ContainerFooter = styled(Row)`
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;
`;

const ContainerCount = styled(Row)`
  margin-top: 10;
  justify-content: space-between;
  width: 100%;
`;

const WrapperProduct = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 12px;
  background: ${p => p.theme.backgroundInput};
  border-radius: 12px;
  align-items: center;
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

const CountInput = styled.TextInput`
  width: 60px;
  text-align: center;
  padding: 0;
  background-color: transparent;
`;

const SButtonChecked = styled(ButtonChecked)`
  margin-right: 16px;
`;

const FooterSection = memo(
  ({
    edited,
    count,
    baseCount,
    onCountChange,
  }: {
    edited: boolean;
    count: number;
    baseCount: number;
    onCountChange?: (count: number) => void;
  }) => {
    const [tempCount, setTempCount] = useState<number>(1);

    const onChangeCountByInput = useCallback((t: string) => {
      if (!t) return setTempCount(0);
      if (!/\d+$/g.test(t) || !!Number.isNaN(Number(t))) return;
      if (Number(t) > baseCount) {
        setTempCount(baseCount);
        global.showMessage(
          `Số lượng sản phẩm nhập vào không được lớn hơn ${baseCount}`,
        );
      } else {
        setTempCount(Math.floor(Number(t)));
      }
    }, []);

    const onBlurInput = useCallback(() => {
      onCountChange?.(tempCount || 1);
    }, [tempCount, onCountChange]);

    useEffect(() => {
      setTempCount(count || 1);
    }, [count]);

    return (
      <Footer>
        <ContainerCount>
          {edited && typeof count === 'number' ? (
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
                onPress={() => baseCount > count && onCountChange(count + 1)}>
                <IconCount source={Icons.icCountRaise} />
              </Button>
            </Row>
          ) : (
            <CountText>Số lượng: {count || 0}</CountText>
          )}
        </ContainerCount>
      </Footer>
    );
  },
);

const ProductSelectReturn = memo(
  ({
    onCountChange,
    count,
    productName,
    quantityUomDesc,
    price,
    checked,
    index,
    baseCount,
  }: {
    onCountChange?: (count: number) => void;
    count: number;
    productName: string;
    quantityUomDesc: string;
    price: number;
    checked: boolean;
    index: number;
    baseCount: number;
  }) => {
    const {productReturn, setProductReturn} = useContext(OrderContext);

    const onChecked = useCallback(() => {
      const item = {...productReturn[index]};
      item.checked = !item.checked;
      productReturn[index] = {...item};
      setProductReturn([...productReturn]);
    }, [productReturn]);

    return (
      <ContainerItem>
        <SButtonChecked
          hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}
          value={checked}
          onChangeStatus={onChecked}
        />
        <WrapperProduct>
          <SVGIcon name="item-empty-image" />
          <Column>
            <Name numberOfLines={1}>{productName}</Name>
            <ButtonProperty>
              <PropertyText>{quantityUomDesc}</PropertyText>
            </ButtonProperty>
            <ContainerFooter>
              <Price>{getLocaleNumber(price ?? 0)} đ</Price>
              <FooterSection
                onCountChange={onCountChange}
                count={count}
                baseCount={baseCount}
                edited={checked}
              />
            </ContainerFooter>
          </Column>
        </WrapperProduct>
      </ContainerItem>
    );
  },
);

export default ProductSelectReturn;
