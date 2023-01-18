import InputDatePicker from '@/components/InputDatePicker';
import PopupSelect from '@/components/PopupSelect';
import Icons from '@/Icons';
import {fetchListCategory} from '@/store/category/api';
import {ICategoryItem} from '@/store/category/type';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import moment from 'moment';

// @ts-ignore
const SModal = styled(Modal)`
  margin: 0px;
  justify-content: flex-end;
` as unknown as typeof Modal;

const Wrapper = styled.TouchableOpacity`
  background: rgba(0, 122, 255, 0.1);
  /* System/Blue */

  border: 1px solid #007aff;
  padding: 12px 16px;
  border-radius: 12px;
  flex-direction: row;
`;

const Label = styled.Text`
  flex: 1;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: #3a3a3c;
`;

const BodyContainer = styled.View`
  flex: 1;
`;

const Icon = styled.Image``;

const SelectMonthSection = memo(
  ({onChangeMonth}: {onChangeMonth: (time: number) => void}) => {
    const [date, setDate] = useState(moment().startOf('months').toDate());
    const [show, setShow] = useState(false);

    const onValueChange = useCallback(
      (event, newDate) => {
        console.log('event', event, newDate);
        const selectedDate = newDate || date;
        console.log(moment(selectedDate.getTime()).format('MM/YYYY'));
        setShow(false);
        setDate(selectedDate);
      },
      [date],
    );

    useEffect(() => {
      onChangeMonth(date.getTime());
    }, [date]);

    return (
      <>
        {/* <Wrapper onPress={() => setShow(true)}>
          <Label>Tháng {moment(date.getTime()).format('MM/YYYY')}</Label>
          <Icon source={Icons.icDropdown} />
        </Wrapper>
        <SModal
          isVisible={show}
          onBackButtonPress={() => setShow(false)}
          onBackdropPress={() => setShow(false)}>
          <MonthPicker onChange={onValueChange} value={date} />
        </SModal> */}
      </>
    );
  },
);

export default SelectMonthSection;
