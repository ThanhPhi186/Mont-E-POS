import errorHandler from '@/services/ErrorHandler';
import Fetch from '@/services/Fetch';
import {
  ICreateOrderParams,
  ICreateReturnParams,
  IOrderDetail,
  IOrderListItem,
  IOrderPromotion,
  IPromotionDetail,
  IPromotionItem,
} from './type';

export async function createOrder(params: ICreateOrderParams) {
  try {
    const {data} = await Fetch.post<{
      orderId: string;
      orderPartSeqId: string;
      orderDetail: IOrderDetail;
    }>(`@api/orders/create`, params);

    return data;
  } catch (error: any) {
    console.log('createOrder', error);
    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return null;
  }
}

export async function fetchOrderDetail(orderId: string) {
  try {
    const {data} = await Fetch.get<{orderDetail: IOrderDetail}>(
      `@api/orders/${orderId}`,
    );
    return data.orderDetail;
  } catch (error: any) {
    console.log('fetchOrderDetail', error);
    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return null;
  }
}

export async function completeOrder(orderId: string) {
  try {
    const {data} = await Fetch.post<{
      orderCompleted: boolean;
    }>(`@api/orders/${orderId}/complete`);
    return data;
  } catch (error: any) {
    console.log('createOrder', error);
    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return null;
  }
}

export async function fetchListOrderByDate({
  entryDateFrom,
  entryDateThru,
  page,
}: {
  entryDateFrom: number;
  entryDateThru: number;
  page: number;
}) {
  try {
    const {data} = await Fetch.get<{
      orderList: IOrderListItem[];
      totalRows: number;
    }>('@api/orders', {
      params: {entryDateFrom, entryDateThru, pageSize: 40, pageIndex: page},
    });
    console.log('fetchListOrderByDate', data);

    return {
      data: data.orderList,
      total_page: Math.ceil(data.totalRows / 20),
    };
  } catch (error: any) {
    console.log('fetchOrderDetail', error);
    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return {data: [], total_page: 0};
  }
}

export async function fetchListPromotion() {
  try {
    const {data} = await Fetch.get<{promoList: IPromotionItem[]}>(
      '@api/promotions',
    );
    return data.promoList;
  } catch (error: any) {
    console.log('fetchListPromotion', error);
    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return [];
  }
}

export async function fetchPromotionDetail(id: string) {
  try {
    const {data} = await Fetch.get<IPromotionDetail>(`@api/promotions/${id}`);
    return data;
  } catch (error: any) {
    console.log('fetchListPromotion', error);
    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return null;
  }
}

const rules = [
  {
    condition: 'condition 1',
    value: ['value 1 - example: giảm 50k ...', 'value 2 - tặng 1 gói nabati'],
  },
  {
    condition: 'Condition 2',
    gift: ['value 1'],
  },
];

export async function fetchPromotionOfOrder(order_id: string) {
  try {
    const {data} = await Fetch.get<{results: IOrderPromotion[]}>(
      `@api/orders/${order_id}/checkPromotion`,
    );
    return data.results;
  } catch (error: any) {
    console.log('fetchPromotionOfPromotion', error);
    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return [];
  }
}

export async function applyPromotion(order_id: string, selected: string[]) {
  try {
    const {data} = await Fetch.post<{
      success: boolean;
      orderDetail: IOrderDetail;
    }>(`@api/orders/${order_id}/addPromotions`, {
      orderId: order_id,
      storePromotionIds: selected,
    });
    return data;
  } catch (error: any) {
    console.log('applyPromotion', error);
    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return {success: false, orderDetail: null};
  }
}

export async function getMaximumDiscount() {
  try {
    const {
      data: {discountMaximumValue},
    } = await Fetch.get<{
      discountMaximumValue: string;
    }>(
      `@api/productStores/${Fetch.current_channel?.productStoreId}/setting/retail-discount-maximum-value`,
    );
    return discountMaximumValue;
  } catch (error: any) {
    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return '0';
  }
}

export async function addDiscount(orderId: string, unitAmount: number) {
  try {
    const {
      data: {success},
    } = await Fetch.post<{
      success: boolean;
    }>(`@api/orders/${orderId}/addDiscount`, {
      orderId,
      unitAmount,
    });
    return success;
  } catch (error: any) {
    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return false;
  }
}

export async function fetchReturnOrderDetail(orderId: string) {
  try {
    const {data} = await Fetch.get<{orderDetail: IOrderDetail}>(
      `@api/returns/${orderId}`,
    );
    return data;
  } catch (error: any) {
    console.log('fetchOrderDetail', error);
    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return null;
  }
}

export async function createReturnOrder(params: ICreateReturnParams) {
  try {
    const {
      data: {returnId},
    } = await Fetch.post<{returnId: string}>('@api/returns', params);
    return returnId;
  } catch (error: any) {
    console.log('error', error);

    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return null;
  }
}

export async function holdOrder(orderId: string) {
  try {
    const {
      data: {heldOrder},
    } = await Fetch.post<{
      heldOrder: boolean;
    }>(`@api/orders/${orderId}/hold`, {orderId});

    return heldOrder;
  } catch (error: any) {
    console.log('createOrder', error);
    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return false;
  }
}

export async function reOpenOrder(orderId: string) {
  try {
    const {
      data: {orderDetail},
    } = await Fetch.post<{
      orderDetail: IOrderDetail;
    }>(`@api/orders/${orderId}/reopen`, {orderId});

    return orderDetail;
  } catch (error: any) {
    console.log('createOrder', error);
    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return null;
  }
}

export async function getTentative() {
  try {
    const {
      data: {orderId},
    } = await Fetch.get<{
      orderId: string;
    }>('@api/orders/tentative');

    return orderId;
  } catch (error: any) {
    return null;
  }
}

export async function onCancelOrder(orderId: string) {
  try {
    const {
      data: {cancelledOrder},
    } = await Fetch.post<{
      cancelledOrder: boolean;
    }>(`@api/orders/${orderId}/cancel`, {orderId});

    return cancelledOrder;
  } catch (error: any) {
    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return false;
  }
}

export async function editOrder(params: ICreateOrderParams) {
  try {
    const {data} = await Fetch.post<{
      orderId: string;
      orderPartSeqId: string;
      orderDetail: IOrderDetail;
    }>(`@api/orders/${params.orderId}/edit`, params);
    console.log('edittt', data);

    return data;
  } catch (error: any) {
    console.log('editOrder', error);
    const message = errorHandler(error).getMessage();
    global.showMessage(message);
    return null;
  }
}
