import styled from 'styled-components/native';
import React, {memo, useState, useCallback, useRef, useMemo} from 'react';
import {
  StyleSheet,
  TextInputProps,
  TouchableOpacityProps,
  ViewProps,
  Animated,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Icons from '@/Icons';
import Theme from '@/Colors';
import RegexUtils from '@/utils/RegexUtils';
import {formatAmount} from '@/utils/convertString';

const Wrapper = styled.View`
  justify-content: center;
`;

const Label = styled.Text<{customStyle?: string}>`
  color: #8e8e93;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  width: 100%;
  margin-bottom: 4px;
  ${p => p.customStyle}
`;

const InputWrapper = styled.View<{customStyle?: string; focus?: boolean}>`
  flex-direction: row;
  padding: 0 16px;
  width: 100%;
  background: #fff;
  border-radius: 12px;
  align-items: center;
  ${p =>
    p.focus &&
    `
      border-width: 1px;
      border-color: ${p.theme.blue2};
  `}
  ${p => p.customStyle};
`;

const Input = styled(TextInput)`
  flex: 1;
  height: 100%;
  width: 100%;
  font-size: 16px;
  padding: 0;
  margin: 0;
  color: #363636;
`;

const MinText = styled.Text`
  padding: 0;
  margin: 0;
  line-height: 32px;
`;

const Row = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const Touchable = styled.TouchableOpacity`
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
  position: absolute;
`;

const InputMultiLine = styled(TextInput)`
  min-height: 100px;
  max-height: 150px;
  width: 100%;
  color: #363636;
  font-size: 16px;
  padding: 12px 0;
`;

const ArrowDown = styled.Image.attrs({
  // source: require('@/assets/auth/arrow-down.png'),
})``;

const InforError = styled.Image``;
const RowError = styled.View`
  margin-top: 8px;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const TextError = styled.Text`
  font-size: 12px;
  line-height: 20px;
  margin-left: 4px;
  color: ${p => p.theme.error};
`;

const TxtRequired = styled.Text`
  color: ${p => p.theme.error};
  font-weight: bold;
  font-size: 12px;
`;

export interface DynamicInputProps {
  label?: any;
  labelStyle?: string;
  placeholderStr?: string;
  textInputProps?: TextInputProps;
  isTouchable?: boolean;
  touchableProps?: TouchableOpacityProps;
  minText?: string;
  isPassword?: boolean;
  validateMessage?: string;
  rightIcon?: any;
  disabledAnimated?: boolean;
  inputWrapperStyle?: string;
  required?: boolean;
  errorMessage?: string;
  multiline?: boolean;
  hasError?: boolean;
  onChangeText?: (t: string) => void;
  type?: 'input' | 'select';
  inputTheme?: 'dark' | 'light' | 'modal-dark';
  currency?: boolean;
}

const listTheme = {
  'modal-dark': {
    background: '#444446',
    textColor: '#fff',
    placeholderText: '#808080',
  },
  dark: {
    background: Theme.backgroundColor,
    textColor: '#000',
    placeholderText: '#AEAEB2',
    borderColor: '#dddddd',
  },
  light: {
    background: '#fff',
    textColor: '#000',
    placeholderText: '#AEAEB2',
    borderColor: '#dddddd',
  },
};

const ButtonShowPassword = memo(function ({
  show,
  onPress,
}: {
  show?: boolean;
  onPress: (s: boolean) => void;
}) {
  const sOnPress = useCallback(() => {
    onPress(!show);
  }, [show]);
  return (
    <TouchableOpacity
      onPress={sOnPress}
      style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image source={show ? Icons.icPassword : Icons.icShowPassword} />
    </TouchableOpacity>
  );
});

const DynamicInput = memo(function DynamicInput({
  label,
  labelStyle,
  placeholderStr,
  isPassword,
  textInputProps = {},
  isTouchable = false,
  touchableProps = {},
  disabledAnimated = false,
  minText,
  required,
  rightIcon,
  validateMessage = '',
  errorMessage = '',
  inputWrapperStyle,
  multiline,
  inputTheme = 'light',
  hasError,
  onChangeText,
  type = 'input',
  currency = false,
  ...props
}: DynamicInputProps & ViewProps) {
  const showBorder = useRef(false);
  const [showPassword, setShowPassword] = useState(isPassword);
  const [focus, setFocus] = useState(false);
  const aniBorder = useRef(new Animated.Value(0)).current;
  const [value, setValue] = useState('');
  const onShowBorder = useCallback(() => {
    // if (!showBorder.current) {
    //   Animated.timing(aniBorder, {
    //     toValue: 100,
    //     duration: 200,
    //     useNativeDriver: false,
    //   }).start();
    //   showBorder.current = true;
    //   return;
    // }
    // Animated.timing(aniBorder, {
    //   toValue: 0,
    //   duration: 100,
    //   useNativeDriver: false,
    // }).start();
    // showBorder.current = false;
  }, []);
  const sOnFocus = useCallback(
    e => {
      onShowBorder();
      setFocus(true);
      textInputProps.onFocus?.(e);
    },
    [textInputProps],
  );
  const sOnBlur = useCallback(
    e => {
      onShowBorder();
      setFocus(false);

      textInputProps.onBlur?.(e);
    },
    [textInputProps],
  );

  const sonChangeText = useCallback(
    t => {
      if (currency) {
        const formatted = formatAmount(t.replace(/,/g, ''));
        onChangeText?.(formatted);
        setValue(formatted);
      } else {
        onChangeText?.(t);
        setValue(t);
      }
    },
    [onChangeText],
  );

  const styles = useMemo(() => {
    return listTheme[inputTheme];
  }, [inputTheme]);

  const message = validateMessage || errorMessage;
  const inputError = !!message || hasError;

  return (
    // @ts-ignore
    <Wrapper {...props}>
      {typeof label === 'string' ? (
        <Label customStyle={labelStyle}>
          {label} {required && <TxtRequired>*</TxtRequired>}
        </Label>
      ) : (
        label
      )}

      {!multiline ? (
        <Row>
          {minText && <MinText>{minText}</MinText>}
          <InputWrapper
            style={[
              {
                height: 48,
                backgroundColor: styles.background,
              },
              inputError ? {borderWidth: 1, borderColor: '#F4512D'} : {},
            ]}
            focus={focus}
            customStyle={inputWrapperStyle}>
            <Input
              placeholderTextColor={styles.placeholderText}
              secureTextEntry={showPassword}
              placeholder={placeholderStr || 'Please fill to input'}
              style={{color: styles.textColor}}
              value={value}
              autoCapitalize="none"
              {...textInputProps}
              onChangeText={sonChangeText}
              onFocus={sOnFocus}
              onBlur={sOnBlur}
              allowFontScaling={false}
            />
            {!!value && isPassword && (
              <ButtonShowPassword
                show={showPassword}
                onPress={setShowPassword}
              />
            )}
            {rightIcon}
            {!!isTouchable && <Touchable {...touchableProps} />}
          </InputWrapper>
        </Row>
      ) : (
        <InputWrapper
          style={[
            {
              backgroundColor: styles.background,
            },
            inputError ? {borderWidth: 1, borderColor: '#CF0026'} : {},
          ]}
          customStyle={inputWrapperStyle}
          focus={focus}>
          <InputMultiLine
            multiline
            placeholderTextColor={styles.placeholderText}
            placeholder={placeholderStr || 'Please fill to input'}
            style={{color: styles.textColor}}
            {...textInputProps}
            onFocus={sOnFocus}
            onChangeText={sonChangeText}
            onBlur={sOnBlur}
            allowFontScaling={false}
          />
        </InputWrapper>
      )}

      {!!message && (
        <RowError>
          <TextError>{message}</TextError>
        </RowError>
      )}
    </Wrapper>
  );
});

export default DynamicInput;
