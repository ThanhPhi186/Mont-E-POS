import store from '@/store';
import {IAlertType} from './components/GlobalModal/AlertPopup';

export interface IParamsFromLink {}

export type RootState = ReturnType<typeof store.getState>;

declare module 'styled-components' {
  export interface DefaultTheme {
    transparent: string;
    secondColor: string;
    backgroundColor: string;
    error: string;
    primaryDark: string;
    blueMain: string;
    blue2: string;
    orange: string;
    border: string;
    green: string;
    black: string;
    backgroundInput: string;
  }
}
