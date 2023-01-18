import PopupSelect from '@/components/PopupSelect';
import Icons from '@/Icons';
import {useMe} from '@/store/auth';
import {fetchStatisticHome} from '@/store/store/api';
import {IStoreItem} from '@/store/store/type';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
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
  height: 500px;
`;

const SelectChannel = memo(
  ({
    onSelectChannel,
    selected,
  }: {
    onSelectChannel: (item: IStoreItem) => void;
    selected: string;
  }) => {
    const user = useMe();

    const [listChannel, setListChannel] = useState<IStoreItem[]>([]);

    const label = useRef('Vui lòng chọn');
    const modalSelectRef = useRef<any>(null);

    const onSelectedItem = useCallback(
      (item: IStoreItem) => {
        label.current = item.storeName;
        onSelectChannel(item);
        modalSelectRef?.current?.close();
      },
      [onSelectChannel],
    );

    const getListChannel = useCallback(async () => {
      const listData = await fetchStatisticHome(user.partyId);
      setListChannel(listData);
    }, [user]);

    useEffect(() => {
      getListChannel();
    }, []);

    return (
      <WrapperContainer>
        <Label>Kênh bán hàng</Label>
        <Wrapper onPress={() => modalSelectRef?.current?.open()}>
          <TxtValue isValue={Boolean(selected)}>{label.current}</TxtValue>
          <Icon source={Icons.icDropdown} />
        </Wrapper>
        <SPopupSelect
          ref={modalSelectRef}
          title="Chọn kênh bán hàng"
          data={listChannel}
          renderItem={({item, index}) => (
            <CateWrapper
              key={index.toString()}
              onPress={() => onSelectedItem(item)}>
              <CateLabel selected={item.productStoreId === selected}>
                {item.storeName}
              </CateLabel>
              <Icon
                source={Icons.icSelected}
                style={{opacity: item.productStoreId === selected ? 1 : 0}}
              />
            </CateWrapper>
          )}
        />
      </WrapperContainer>
    );
  },
);

export default SelectChannel;
