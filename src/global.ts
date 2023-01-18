import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Dimensions, StatusBar, StatusBarProps} from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import {IAlertType} from './components/GlobalModal/AlertPopup';

export const ArrowRight = styled.Image<{
  customStyle?: string;
  size?: number;
}>`
  ${p => p.size && `width: ${p.size}px; height: ${p.size}px;`}
  ${p => p.customStyle}
`;

export const useBoolean: (
  initValue?: boolean,
) => [boolean, () => void, () => void] = (initValue = false) => {
  const [val, setVal] = useState(initValue);

  const setTrue = useCallback(() => {
    setVal(true);
  }, []);

  const setFalse = useCallback(() => {
    setVal(false);
  }, []);

  return [val, setTrue, setFalse];
};

export const scale = (size: number) => {
  return (Dimensions.get('window').width / 414) * size;
};
export const Wrapper = styled.View<{customStyle?: string}>`
  margin: 8px 0;
  padding: 16px;
  background-color: #fff;
  ${p => p.customStyle};
`;

export const LineBorder = styled.View<{customStyle?: string}>`
  width: 100%;
  height: 1px;
  background-color: ${p => p.theme.backgroundColor};
  margin: 12px 0;
  ${p => p.customStyle};
`;
const {width, height} = Dimensions.get('window');
export {width, height};

export const useStatusBarPushStackEntry = (stackEntry: StatusBarProps) => {
  useEffect(() => {
    // @ts-ignore
    const rs = StatusBar.pushStackEntry(stackEntry);
    return () => {
      // @ts-ignore
      StatusBar.popStackEntry(rs);
    };
  }, [stackEntry]);
};

export {default as bluebird} from 'bluebird';

export {default as _} from 'lodash';

export const ColFlex1 = styled.View`
  flex: 1;
`;

export const useGetSetRef = <Type>(
  initialValue: Type,
): [MutableRefObject<Type>, Dispatch<SetStateAction<Type>>] => {
  const refVal = useRef<Type>(initialValue);

  const setRefVal: Dispatch<SetStateAction<Type>> = useCallback(value => {
    if (typeof value === 'function') {
      // @ts-ignore
      refVal.current = value(refVal.current);
      return;
    }

    refVal.current = value;
  }, []);

  return [refVal, setRefVal];
};

declare global {
  namespace NodeJS {
    interface Global {
      showLoading: (_content?: string) => void;
      hideLoading: () => void;
      showMessage: (content: string, timeout?: number) => void;

      showAlert: (content: IAlertType | null) => void;
    }
  }
}

export default global;
