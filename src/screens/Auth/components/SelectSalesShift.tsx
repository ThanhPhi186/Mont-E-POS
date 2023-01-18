import PopupSelect from '@/components/PopupSelect';
import Icons from '@/Icons';
import {IGender} from '@/store/customers/types';
import {fetchListSalesShift} from '@/store/store/api';
import {IFetchSalesShiftResponse, ISalesShiftItem} from '@/store/store/type';
import React, {
  memo,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components/native';

const WrapperContainer = styled.View`
  margin-top: 12px;
`;

const Wrapper = styled.TouchableOpacity`
  background: #fff;

  padding: 12px 16px;
  border-radius: 12px;
  flex-direction: row;
`;

const Label = styled.Text`
  color: #8e8e93;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  width: 100%;
  margin-bottom: 4px;
`;

const TxtValue = styled.Text<{isValue: boolean}>`
  flex: 1;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${p => (p.isValue ? '#000' : '#aeaeb2')};
`;

const Icon = styled.Image``;

const CateWrapper = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px 24px;
  border-bottom-width: 1px;
  border-bottom-color: #f2f2f7;
`;

const CateLabel = styled.Text<{selected: boolean}>`
  flex: 1;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: ${p => (p.selected ? p.theme.blue2 : '#1c1c1e')};
`;

const SPopupSelect = styled(PopupSelect)`
  background-color: #fff;
  height: 50%;
`;

const SelectSalesShift = memo(
  ({
    onSelectChannel,
    selected,
    productStoreId,
  }: {
    onSelectChannel: (cateId: string) => void;
    selected: string;
    productStoreId: string;
  }) => {
    const [listSalesShift, setListSalesShift] = useReducer(
      (
        states: IFetchSalesShiftResponse,
        newStates: IFetchSalesShiftResponse,
      ) => ({
        ...states,
        ...newStates,
      }),
      {
        terminalsInUse: [],
        terminals: [],
      },
    );

    const label = useRef('Vui lòng chọn');
    const modalSelectRef = useRef<any>(null);

    const onSelectedItem = useCallback(
      (item: ISalesShiftItem) => {
        label.current = item.terminalName;
        onSelectChannel(item.posTerminalId);
        modalSelectRef?.current?.close();
      },
      [onSelectChannel],
    );

    const getListChannel = useCallback(async () => {
      const data = await fetchListSalesShift(productStoreId);

      setListSalesShift({
        terminalsInUse: data.terminalsInUse,
        terminals: data.terminals,
      });
    }, [productStoreId]);

    useEffect(() => {
      productStoreId && getListChannel();
    }, [productStoreId]);

    return (
      <WrapperContainer>
        <Label>Ca bán hàng</Label>
        <Wrapper onPress={() => modalSelectRef?.current?.open()}>
          <TxtValue isValue={Boolean(selected)}>{label.current}</TxtValue>
          <Icon source={Icons.icDropdown} />
        </Wrapper>
        <SPopupSelect
          ref={modalSelectRef}
          title="Chọn ca bán hàng"
          data={listSalesShift?.terminals}
          renderItem={({item, index}) => (
            <CateWrapper
              key={index.toString()}
              onPress={() => onSelectedItem(item)}>
              <CateLabel selected={item.posTerminalId === selected}>
                {item.terminalName}
              </CateLabel>
              <Icon
                source={Icons.icSelected}
                style={{opacity: item.posTerminalId === selected ? 1 : 0}}
              />
            </CateWrapper>
          )}
        />
      </WrapperContainer>
    );
  },
);

export default SelectSalesShift;
