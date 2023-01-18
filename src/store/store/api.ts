import errorHandler from '@/services/ErrorHandler';
import Fetch from '@/services/Fetch';
import {
  ICurrentSalesShiftResponse,
  IFetchSalesShiftResponse,
  IFetchStoreResponse,
  IOpenSalesShiftResponse,
} from './type';

export async function fetchStatisticHome(partyId: string) {
  try {
    const {
      data: {stores},
    } = await Fetch.get<IFetchStoreResponse>(
      `@api-common/storeGroupTypes/PsgtPos/stores/${partyId}`,
    );
    console.log('productStoreList', stores);
    return stores;
  } catch (error: any) {
    console.log('fetchStatisticHome', error);
    return [];
  }
}

export async function fetchListSalesShift(productStoreId: string) {
  try {
    const {data} = await Fetch.get<IFetchSalesShiftResponse>('@api/terminals', {
      params: {
        productStoreId,
      },
    });

    return data;
  } catch (error: any) {
    return {
      terminalsInUse: [],
      terminals: [],
    };
  }
}

export async function openSalesShift(
  posTerminalId: string,
  productStoreId: string,
  startingDrawerAmount: string,
) {
  try {
    const {data} = await Fetch.post<IOpenSalesShiftResponse>(
      '@api/terminals/state/open',
      {
        posTerminalId,
        productStoreId,
        startingDrawerAmount,
      },
    );

    return data;
  } catch (error: any) {
    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return null;
  }
}

export async function closeSalesShift(endingDrawerCashAmount: string) {
  try {
    const {
      data: {closeSuccess},
    } = await Fetch.post<{closeSuccess: boolean}>(
      '@api/terminals/state/close',
      {
        endingDrawerCashAmount,
      },
    );

    return closeSuccess;
  } catch (error: any) {
    const message = errorHandler(error).getMessage();
    console.log('message', message);

    if (message.includes('TerminalStateNotFound')) {
      return true;
    } else {
      global.showMessage(message);
      return null;
    }
  }
}

export async function getCurrentSalesShift() {
  try {
    const {data} = await Fetch.get<{
      terminalState?: ICurrentSalesShiftResponse;
    }>('@api/user/currentTerminalState');

    return data;
  } catch (error: any) {
    return null;
  }
}
