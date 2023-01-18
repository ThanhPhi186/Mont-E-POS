import Fetch from '@/services/Fetch';
import moment from 'moment';
import {
  IListCommission,
  IReportDetail,
  IReportGeneral,
  IReportItem,
  IReportStatistic,
} from './type';

export async function getReportTorSalesState() {
  try {
    const {
      data: {result},
    } = await Fetch.get<{
      result: {grandTotal: number; returnTotal: number};
    }>('@api/reports/getReportTorSalesState');

    return result;
  } catch (error: any) {
    console.log('fetchRevShare', error);
    return {grandTotal: 0, returnTotal: 0};
  }
}

export async function fetchListStatistic() {
  try {
    const {
      data: {results},
    } = await Fetch.get<{results: IReportItem[]}>(`@api/reports/salesReport`);
    return results;
  } catch (error: any) {
    console.log('fetchListStatistic', error);
    return [];
  }
}

export async function fetchReportGeneral(timeStartMonth: number) {
  try {
    const month = moment(timeStartMonth);
    const startDate = month.format('YYYY-MM-DD');
    const endDate = month.endOf('month').format('YYYY-MM-DD');
    const {data} = await Fetch.get<IReportGeneral>(
      `@api/reports/turnoverBySalesmanReports`,
      {
        params: {
          startDate,
          endDate,
        },
      },
    );
    return data;
  } catch (error: any) {
    console.log('fetchGenerate', error);
    return null;
  }
}

export async function fetchReportStatistic(name: string) {
  try {
    const {data} = await Fetch.get<IReportStatistic>(
      `@api/reports/customerReports`,
      {
        params: {
          productStoreId: Fetch.current_channel?.productStoreId,
          partyNameTerm: name,
        },
      },
    );
    return {results: data.results};
  } catch (error: any) {
    console.log('fetchReportStatistic', error);
    return {results: []};
  }
}

export async function fetchReportDetail(partyId: string) {
  try {
    const {data} = await Fetch.get<IReportDetail>(
      `@api/reports/customerReports/${partyId}`,
      {
        params: {
          productStoreId: Fetch.current_channel?.productStoreId,
        },
      },
    );
    return data;
  } catch (error: any) {
    console.log('fetchReportStatistic', error);
    return null;
  }
}

export async function fetchListCommission({
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
      results: IListCommission[];
    }>('@api/reports/salesCommissions/detail', {
      params: {
        startDate: startDate,
        endDate: endDate,
        pageIndex: currentPage,
        pageSize: 20,
      },
    });
    return {data: data.results};
  } catch (error: any) {
    console.log('fetchListCommission', error);
    return {
      data: [],
    };
  }
}

export async function requestWithdraw(amount: number) {
  try {
    const {data} = await Fetch.post<{
      success: boolean;
    }>('@api/my/requestWithdraw', {amount});
    return data.success;
  } catch (error: any) {
    console.log('requestWithdraw', error);
    return false;
  }
}
