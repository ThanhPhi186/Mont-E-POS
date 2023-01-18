import errorHandler from '@/services/ErrorHandler';
import Fetch from '@/services/Fetch';
import {
  IAddCustomerParams,
  ICustomerDetail,
  ICustomerRecommended,
  ICustomerRoute,
  IListAddress,
  IRoute,
} from './types';

export async function fetchCustomerRoute() {
  try {
    const {data} = await Fetch.get<{
      inRoute: ICustomerRoute;
      outRoute: ICustomerRoute;
    }>(
      `@api/customers?productStoreId=${Fetch.current_channel?.productStoreId}`,
    );
    return data;
  } catch (error: any) {
    console.log('fetchCustomerRoute', error);
    return {inRoute: null, outRoute: null};
  }
}

export async function startCheckin(
  partyId: string,
  position: {
    latitude: number;
    longitude: number;
  },
) {
  try {
    const {data} = await Fetch.post<{checkInOk: string; message: string}>(
      `@api/customers/${partyId}/checkIn`,
      {
        ...position,
        partyId,
      },
    );
    return data;
  } catch (error: any) {
    const message = errorHandler(error).getMessage();
    return {checkInOk: 'N', message};
  }
}

export async function startCheckOut(
  partyId: string,
  position: {
    latitude: number;
    longitude: number;
  },
) {
  try {
    const {data} = await Fetch.post<{checkOutOk: string; message: string}>(
      `@api/customers/${partyId}/checkOut`,
      {
        ...position,
        partyId,
      },
    );
    return data;
  } catch (error: any) {
    const message = errorHandler(error).getMessage();
    return {checkOutOk: 'N', message};
  }
}

export async function fetchListRoute() {
  try {
    const {
      data: {routes},
    } = await Fetch.get<{totalRecords: number; routes: IRoute[]}>(
      '@api/routes',
      {
        params: {
          pageSize: 20,
        },
      },
    );
    return routes;
  } catch (error: any) {
    console.log('fetchListStatistic', error);
    return [];
  }
}

export async function fetchListAddress(geoId: string | undefined) {
  try {
    const {
      data: {resultList},
    } = await Fetch.get<{resultList: IListAddress[]}>(
      `@api-common/geos/${geoId}/regions`,
      {
        params: {
          geoId,
        },
      },
    );
    return resultList;
  } catch (error: any) {
    console.log('fetchListStatistic', error);
    return [];
  }
}

export async function postCreateCustomer(params: IAddCustomerParams) {
  try {
    const {data} = await Fetch.post<{partyId: string}>(
      '@api/customers',
      params,
    );
    return data;
  } catch (error: any) {
    console.log('error', error);

    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return null;
  }
}

export async function fetchCustomerRecommended() {
  try {
    const {
      data: {customerList},
    } = await Fetch.get<{customerList: ICustomerRecommended}>(
      '@api/customers/registration',
    );
    return customerList;
  } catch (error: any) {
    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return null;
  }
}

export async function fetchCustomerDetail(partyId: string) {
  try {
    const {
      data: {customer},
    } = await Fetch.get<{customer: ICustomerDetail}>(
      `@api/customers/${partyId}`,
    );
    return customer;
  } catch (error: any) {
    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return null;
  }
}

export async function editCustomer(
  params: IAddCustomerParams,
  partyId: string,
) {
  try {
    const {data} = await Fetch.post<{partyId: string}>(
      `@api/customers/${partyId}`,
      params,
    );
    console.log('editCustomer', data, params);

    return data;
  } catch (error: any) {
    console.log('error', error);

    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return null;
  }
}
