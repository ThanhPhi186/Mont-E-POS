import React, {PureComponent} from 'react';
import styled from 'styled-components/native';
import DynamicInput from '@/components/DynamicInput';
import DateTimePickerModal, {
  DateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {
  TextInputProps,
  Keyboard,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native';

interface InputDatePickerProps {
  defaultValue?: number | undefined;
  label?: string;
  textInputProps?: TextInputProps;
  labelStyle?: string;
  showIconCalendar?: boolean;
  onChangeDate?: (date: number) => void;
  datePickerProps?: DateTimePickerProps;
  disabled?: boolean;
  outterStyle?: ViewStyle;
  inputWrapperStyle?: string;
  children?: any;
}

interface InputDatePickerState {
  showDatePicker: boolean;
  date?: number;
}

const Wrapper = styled.View``;

class InputDatePicker extends PureComponent<
  InputDatePickerProps,
  InputDatePickerState
> {
  constructor(props: InputDatePickerProps) {
    super(props);
    this.state = {
      showDatePicker: false,
      date: props.defaultValue,
    };
  }
  setShowDatePicker = (show = true) => {
    this.setState({showDatePicker: show});
  };
  setDate = (date: number) => {
    this.setState({date});
    this.props.onChangeDate?.(date);
  };
  getDate = () => {
    return this.state.date;
  };
  render() {
    const {showDatePicker, date} = this.state;
    const {
      label,
      textInputProps = {},
      labelStyle,
      showIconCalendar = true,
      datePickerProps = {},
      disabled,
      outterStyle,
      inputWrapperStyle,
      children,
      ...props
    } = this.props;
    return (
      <Wrapper {...props}>
        {children ? (
          <TouchableWithoutFeedback
            onPress={() => this.setShowDatePicker(true)}>
            {children}
          </TouchableWithoutFeedback>
        ) : (
          <>
            <DynamicInput
              style={outterStyle}
              label={label}
              labelStyle={labelStyle}
              inputWrapperStyle={inputWrapperStyle}
              textInputProps={{
                ...textInputProps,
                defaultValue: !disabled
                  ? date
                    ? moment(date * 1000).format('DD/MM/YYYY')
                    : undefined
                  : undefined,
              }}
              isTouchable
              touchableProps={{
                onPress: () => {
                  Keyboard.dismiss();
                  if (disabled) return;
                  this.setShowDatePicker(true);
                },
              }}
            />
          </>
        )}
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          display="spinner"
          date={date ? new Date(date) : undefined}
          onConfirm={v => {
            this.setShowDatePicker(false);
            this.setDate(moment(v).valueOf());
          }}
          onCancel={() => {
            this.setShowDatePicker(false);
          }}
          {...datePickerProps}
        />
      </Wrapper>
    );
  }
}

export default InputDatePicker;
