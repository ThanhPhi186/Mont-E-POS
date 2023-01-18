import {ThemeProvider as SThemeProvider} from 'styled-components/native';
import React, {memo, PropsWithChildren} from 'react';
import theme from '@/Colors';

const _ThemeProvider = ({children}: PropsWithChildren<{}>) => {
  return <SThemeProvider theme={theme}>{children}</SThemeProvider>;
};

const ThemeProvider = memo(_ThemeProvider);

export default ThemeProvider;
