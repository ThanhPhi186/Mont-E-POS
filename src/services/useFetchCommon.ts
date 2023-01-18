import {useEffect, useReducer} from 'react';

import ResponseCode from '@/constants/ResponseCode';
import Fetch from './Fetch';

interface GetDataParams {
  typeFetch: 'FETCH' | 'REFRESH' | 'LOAD_MORE';
  page: number;
}

interface UseFetchCommonProps {
  url: string;
  params;
  perPage?: number;
  data: string;
  total_record?: string;
}

interface ResponseData<T> {
  currentPage: number;
  pageCount: number;
  data: T[];
}

interface LoadingState<T> {
  totalItem: number;

  currentPage: number;
  lastPage: boolean;
  data: T[];
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
}

const useFetchCommon = <T>({
  url,
  params,
  perPage = 10,
  data = 'data',
  total_record = 'totalRecords',
}: UseFetchCommonProps) => {
  const [state, setState] = useReducer(
    (oldState: LoadingState<T>, newState: Partial<LoadingState<T>>) => ({
      ...oldState,
      ...newState,
    }),
    {
      totalItem: 0,
      currentPage: 0,
      lastPage: false,
      data: [],
      isLoading: false,
      isRefreshing: false,
      isLoadingMore: false,
    },
  );

  const setData = newData => {
    setState({
      data: newData,
    });
  };

  const handleGetData = async ({typeFetch, page}: GetDataParams) => {
    switch (typeFetch) {
      case 'FETCH':
        setState({isLoading: true});
        break;
      case 'REFRESH':
        setState({isRefreshing: true});
        break;
      case 'LOAD_MORE':
        setState({isLoadingMore: true});
        break;
      default:
        break;
    }
    const dataParams = {
      ...params,
      pageSize: perPage,
      pageIndex: page,
    };

    const response = await Fetch.get<ResponseData<T>>(url, {
      params: dataParams,
    });
    console.log('useFetchCommon', response);

    if (response.status === ResponseCode.SUCCESS) {
      if (typeFetch === 'LOAD_MORE') {
        const newData = [...state.data, ...response.data[data]];
        setState({
          totalItem: response.data[total_record],
          currentPage: page,
          lastPage: newData.length === response.data[total_record],
          data: newData,
        });
      } else {
        setState({
          totalItem: response.data[total_record],
          currentPage: 0,
          lastPage: response.data[data].length < perPage,
          data: response.data[data],
        });
      }
    } else {
      // setTimeout(() => {
      //   SimpleToast.show(response.error);
      // }, 700);
    }

    switch (typeFetch) {
      case 'FETCH':
        setState({isLoading: false});
        break;
      case 'REFRESH':
        setState({isRefreshing: false});
        break;
      case 'LOAD_MORE':
        setState({isLoadingMore: false});
        break;
      default:
        break;
    }
  };

  const handleFetchData = () => {
    handleGetData({typeFetch: 'FETCH', page: 0});
  };

  const handleRefresh = () => {
    console.log('handleRefresh', state.isRefreshing);
    if (!state.isRefreshing) {
      handleGetData({typeFetch: 'REFRESH', page: 0});
    }
  };

  const handleLoadMore = () => {
    if (!state.isLoadingMore && !state.lastPage) {
      const nextPage = state.currentPage + 1;
      handleGetData({typeFetch: 'LOAD_MORE', page: nextPage});
    }
  };

  useEffect(() => {
    if (!state.isLoading) {
      handleFetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return {
    isLoading: state.isLoading,
    isRefreshing: state.isRefreshing,
    isLoadingMore: state.isLoadingMore,
    data: state.data,
    handleRefresh,
    handleLoadMore,
    setData,
  };
};

export {useFetchCommon};
