import {NavigationContext} from 'react-navigation';
import {useContext} from 'react';

export const useNavigationContext = () => {
  return useContext(NavigationContext);
};

export const useNavigationParams = <ParamsType>() => {
  const {state} = useNavigationContext();
  return state.params as unknown as ParamsType & {
    title?: string;
    sort?: string;
    id?: string;
    slug?: string;
  };
};
export const getParamRequest = (params: Record<string, any>) => {
  return {
    sort: params.sort,
    slug: params.slug,
    title: params.title,
    id: params.id,
    page: 1,
  };
};
