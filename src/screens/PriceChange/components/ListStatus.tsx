import React, { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import InputDatePicker from '@/components/InputDatePicker';
import Icons from '@/Icons';

const Container = styled.View``;

const SFlatList = styled.View`
  max-height: 36px;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

const ItemWrapper = styled.TouchableOpacity<{ active: boolean }>`
  padding: 8px 12px;
  background: #e5e5ea;
  border-radius: 8px;
  margin-left: 8px;
  border: 1px solid transparent;
  ${p =>
    p.active &&
    `
    border-color: ${p.theme.blueMain};
    background: rgba(0, 122, 255, 0.1);
  `}
`;

const ItemLabel = styled.Text<{ active: boolean }>`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;

  color: ${p => (p.active ? p.theme.blueMain : '#1c1c1e')};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 12px;
`;

const SInputDate = styled(InputDatePicker)``;

const DateView = styled.View`
  border: 1px solid #e5e5ea;
  padding: 8px 12px;
  border-radius: 12px;
`;

const DateText = styled.Text``;

const DirectView = styled.View`
  padding: 0 16px;
`;
const Icon = styled.Image``;

const listLabel = [
  {
    label: '1 Tháng',
    value: moment().add(-30, 'days').valueOf(),
  },
  {
    label: '3 Tháng',
    value: moment().add(-90, 'days').valueOf(),
  },
  {
    label: 'Chọn ngày',
    value: 0,
  },
];

const Item = memo(
  ({
    label,
    selected,
    onSelected,
  }: {
    label: string;
    selected: boolean;
    onSelected: () => void;
  }) => {
    const onItemPress = useCallback(() => {}, []);
    return (
      <ItemWrapper active={selected} onPress={onSelected}>
        <ItemLabel active={selected}>{label}</ItemLabel>
      </ItemWrapper>
    );
  },
);

const ListStatus = memo(
  ({
    onStatusChange,
  }: {
    onStatusChange: (params: { startDate: number; endDate?: number }) => void;
  }) => {
    const [selected, setSelected] = useState(0);
    const [startDate, setStateDate] = useState(
      moment().add(-30, 'days').valueOf(),
    );
    const [endDate, setEndDate] = useState(moment().valueOf());

    const onDateSelected = useCallback(
      (value, type: 'start' | 'end') => {
        const timestamp = new Date(value).getTime();
        type === 'start' && setStateDate(timestamp);
        type === 'end' && setEndDate(timestamp);
      },
      [startDate, endDate, onStatusChange],
    );

    useEffect(() => {
      listLabel[selected].value &&
        onStatusChange({ startDate: listLabel[selected].value });
    }, [selected, onStatusChange]);

    useEffect(() => {
      selected === 2 && onStatusChange({ startDate, endDate });
    }, [selected, startDate, endDate]);

    return (
      <Container>
        <SFlatList>
          {listLabel.map((item, index) => (
            <Item
              {...item}
              key={index.toString()}
              selected={selected === index}
              onSelected={() => setSelected(index)}
            />
          ))}
        </SFlatList>
        {selected === 2 && (
          <Row>
            <SInputDate onChangeDate={date => onDateSelected(date, 'start')}>
              <DateView>
                <DateText>{moment(startDate).format('DD/MM/YYYY')}</DateText>
              </DateView>
            </SInputDate>
            <DirectView>
              <Icon source={Icons.icDirectRight} />
            </DirectView>
            <SInputDate onChangeDate={date => onDateSelected(date, 'end')}>
              <DateView>
                <DateText>{moment(endDate).format('DD/MM/YYYY')}</DateText>
              </DateView>
            </SInputDate>
          </Row>
        )}
      </Container>
    );
  },
);

export default ListStatus;
