import {useSelector} from 'react-redux';
import {RawCurrentUser} from './type';
import {RootState} from '@/types';

export const useMe = (): RawCurrentUser => {
  return useSelector(
    (state: RootState) =>
      (state.settings.me || {}) as unknown as RawCurrentUser,
  );
};
