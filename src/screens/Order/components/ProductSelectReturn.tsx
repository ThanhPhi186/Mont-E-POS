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
  margin-top: 4px;
`;

const ContainerCount = styled(Row)`
  /* justify-content: space-between; */
  /* width: 100%; */
  margin-top: 4px;
  height: 24px;
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
  background-color: transparent;
`;

const ViewChecked = styled.View`
  width: 28px;
`;

const ProductSelectReturn = memo(
  ({
    onCountChange,
    count,
    productName,
    quantityUomDesc,
    price,
    checked,
    index,
    countReturnable,
  }: {
    onCountChange?: (count: number) => void;
    count: number;
    productName: string;
    quantityUomDesc: string;
    price: number;
    checked: boolean;
    index: number;
    countReturnable: number;
  }) => {
    const {productReturn, setProductReturn} = useContext(OrderContext);
    const [tempCount, setTempCount] = useState<number>(1);

    const onChecked = useCallback(
      isChecked => {
        setTempCount(1);
        const item = {...productReturn[index]};
        item.checked = isChecked;
        item.countReturn = isChecked ? 1 : 0;
        productReturn[index] = {...item};
        setProductReturn([...productReturn]);
      },
      [productReturn, tempCount],
    );

    const onChangeCountByInput = useCallback(
      (t: string) => {
        if (!t) return setTempCount(0);
        if (!/\d+$/g.test(t) || !!Number.isNaN(Number(t))) return;
        if (Number(t) > countReturnable) {
          setTempCount(countReturnable);
          global.showMessage(
            `Số lượng sản phẩm nhập vào vượt quá số lượng có thể trả lại`,
          );
        } else {
          setTempCount(Math.floor(Number(t)));
        }
      },
      [tempCount],
    );

    const onBlurInput = useCallback(() => {
      onCountChange?.(tempCount || 1);
    }, [tempCount, onCountChange]);

    const minusCount = () => {
      if (tempCount > 1) {
        onCountChange(tempCount - 1);
        setTempCount(tempCount - 1);
      }
    };
    const addCount = () => {
      if (tempCount < countReturnable) {
        onCountChange(tempCount + 1);
        setTempCount(tempCount + 1);
      } else {
        global.showMessage(
          `Số lượng sản phẩm nhập vào vượt quá số lượng có thể trả lại`,
        );
      }
    };

    return (
      <ContainerItem>
        {countReturnable ? (
          <ButtonChecked
            style={{marginRight: 12}}
            hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}
            value={checked}
            onChangeStatus={onChecked}
          />
        ) : (
          <ViewChecked />
        )}
        <WrapperProduct>
          <SVGIcon name="item-empty-image" />
          <Column>
            <Name numberOfLines={1}>{productName}</Name>
            <ButtonProperty>
              <PropertyText>{quantityUomDesc}</PropertyText>
            </ButtonProperty>
            <ContainerCount>
              {checked && typeof count === 'number' ? (
                <Row>
                  <CountText style={{marginRight: 12}}>Trả lại: </CountText>

                  <Button
                    hitSlop={{top: 15, left: 15, bottom: 15}}
                    onPress={minusCount}>
                    <IconCount source={Icons.icCountReduce} />
                  </Button>
                  <CountInput
                    hitSlop={{top: 15, bottom: 15}}
                    style={{width: 60}}
                    selectTextOnFocus
                    value={`${tempCount}`}
                    onBlur={onBlurInput}
                    keyboardType="numeric"
                    onChangeText={onChangeCountByInput}
                  />
                  <Button
                    hitSlop={{top: 15, right: 15, bottom: 15}}
                    onPress={addCount}>
                    <IconCount source={Icons.icCountRaise} />
                  </Button>
                </Row>
              ) : (
                <CountText>SL có thể trả: {countReturnable || 0}</CountText>
              )}
            </ContainerCount>

            <ContainerFooter>
              <Price>{getLocaleNumber(price ?? 0)} đ</Price>

              <CountText>Số lượng : {count || 0}</CountText>
            </ContainerFooter>
          </Column>
        </WrapperProduct>
      </ContainerItem>
    );
  },
);

export default ProductSelectReturn;
