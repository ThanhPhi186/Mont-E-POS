import Fetch from '@/services/Fetch';
import moment from 'moment';
import {IFullProduct, IProductItem, IProductPriceChange} from './type';

export async function fetchListProduct({
  name,
  currentPage = 0,
}: {
  name?: string;
  currentPage?: number;
}) {
  try {
    const {data} = await Fetch.get<{
      totalRecords: number;
      products: IFullProduct[];
    }>('@api/products/search', {
      params: {
        documentType: 'MonteProduct',
        pageIndex: currentPage,
        pageSize: 20,
        queryString: name,
        productStoreId: Fetch.current_channel?.productStoreId,
      },
    });
    const total_page = Math.ceil(data.totalRecords / 20);
    console.log('data', data);

    return {
      total_page,
      data: data.products,
      totalRecords: data.totalRecords,
    };
  } catch (error: any) {
    console.log('fetchListStatistic', error);
    return {
      total_page: 0,
      data: [],
      totalRecords: 0,
    };
  }
}

export async function fetchProductDetail(productId: string) {
  try {
    const {data} = await Fetch.get<IFullProduct>(
      `@api/stores/${Fetch.current_channel?.productStoreId}/products/${productId}`,
    );
    return data;
  } catch (error: any) {
    console.log('fetchProductDetail', error);
    return null;
  }
}

export async function fetchListPriceChange({
  fromDate,
  thruDate,
  currentPage = 0,
}: {
  fromDate: number;
  thruDate?: number;
  currentPage?: number;
}) {
  try {
    const startDate = moment(fromDate).format('YYYY-MM-DD');
    const endDate = moment(thruDate || new Date().getTime()).format(
      'YYYY-MM-DD',
    );
    const {data} = await Fetch.get<{
      results: IProductPriceChange[];
    }>(`@api/stores/${Fetch.current_channel?.productStoreId}/priceChange`, {
      params: {
        fromDate: startDate,
        thruDate: endDate,
      },
    });
    // const total_page = Math.ceil(data.totalRecords / 20);
    return {data: data.results};
  } catch (error: any) {
    console.log('fetchListStatistic', error);
    return {
      data: [],
    };
  }
}
