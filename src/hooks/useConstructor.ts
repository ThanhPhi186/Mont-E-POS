import {useRef} from 'react';

export const useConstructor = (callback = () => {}) => {
  const hasBeenCalled = useRef(false);
  const active = () => {
    callback();
    hasBeenCalled.current = true;
  };
  !hasBeenCalled.current && active();
};
