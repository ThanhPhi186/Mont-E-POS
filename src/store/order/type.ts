import {TOrderType} from '@/constants/variableConstant';
import {ICustomer} from '../customers/types';
import {IProductCart, IProductConfig} from '../product/type';

export interface ICart {
  customer?: ICustomer;
  products: IProductCart[];
}

export interface IOrderItems {
  productId: string;
  quantity: number;
  quantityUomId: string;
  unitAmountVAT: number;
}

export interface ICreateOrderParams {
  productStoreId: string;
  customerPartyId: string;
  orderId?: string;
  orderItems: IOrderItems[];
}

export type TItemTypeEnumId = 'ItemSalesTax' | 'ItemProduct' | 'ItemDiscount';

export interface IOrderProductItem {
  orderItemSeqId: string;
  quantity: number;
  productId: string;
  quantityCancelled: number | null;
  quantityUomId: string;
  alternativeQuantityUomId: string;
  alternativeUnitAmount: number;
  alternativeUnitAmountVAT: number;
  alternativeQuantityUomDesc?: string;
  alternativeReturnableQuantity: number;
  pseudoId: '';
  itemTypeEnumId: TItemTypeEnumId;
  alternativeQuantity: number;
  parentItemSeqId: string;
  unitAmount: number;
  itemDescription: string;
  storePromotionId: string;
  isPromo: 'Y' | 'N';
  contentLocation: string;
  checked?: boolean;
  baseQuantity?: number;
  configs: IProductConfig[];
  countReturn: number;
}

export interface IOrderDetail {
  enteredByPartyId: string;
  otherPartyOrderId: null;
  orderId: string;
  grandTotal: number;
  productItemsTotalNoVAT: number;
  entryDate: number;
  priority: number;
  estimatedDeliveryDate: number;
  productItems: IOrderProductItem[];
  shipBeforeDate: null;
  currencyUomId: 'VND';
  statusId: TOrderType;
  enableAddPromo: boolean;
  orderPartSeqId: string;
  promoApplied: IOrderPromotion[];
  vatTotal: number;
  discountTotal: number;
  customer: ICustomer;
  facility: IFacility;
}

export interface IFacility {
  facilityId: string;
  facilityName: string;
  pseudoId: string;
}

export interface IOrderPromotion {
  fromDate: number;
  thruDate: number;
  promotionGroupId: string;
  orderId: string;
  discountAmount: number;
  promotionGroupDesc: string;
  storePromotionId: string;
  itemDescription: string;
  orderPartSeqId: string;
  wasApplied?: 'Y';
}

type TStatusId = 'PromotionApproved';
export interface IPromotionItem {
  storePromotionId: string;
  productStoreId: string;
  itemDescription: string;
  fromDate: number;
  statusId: TStatusId;
  promotionGroupId: string;
  storeName: string;
}

export interface IPromotionDetail {
  promoDetail: {
    storePromotionId: string;
    productStoreId: string;
    itemDescription: string;
    serviceRegisterId: string;
    fromDate: number;
    statusId: string;
    promotionGroupId: string;
    serviceTypeEnumId: string;
    description: string;
    serviceName: string;
    thruDate?: number;
  };
  conditions: string[];
  gifts: string[];
}

export interface IOrderListItem {
  customerPartyName: string;
  entryDate: number;
  grandTotal: number;
  orderId: string;
  statusDesc: string;
  statusId: string;
}

export interface IReturnOrderListItem {
  currencyUomId: string;
  customerPartyId: string;
  entryDate: number;
  grandTotal: number;
  orderId: string;
  returnId: string;
  statusId: TOrderType;
  customerFullName?: string;
  customerPartyCode?: string;
}

export interface IReturnDetail {
  returnItems: IReturnProductItem[];
  customer: ICustomer;
  returnHeader: IReturnOrderListItem;
}

export interface IReturnProductItem {
  alternativeReturnQuantity: number;
  productId: string;
  alternativeReturnPrice: number;
  alternativeReturnQuantityUomId: string;
  alternativeReturnQuantityUomDesc: string;
  description: string;
}

export interface IReturnItem {
  orderItemSeqId?: string;
  productId: string;
  returnReasonEnumId: string;
  alternativeReturnQuantityUomId: string;
  alternativeReturnQuantity: number;
}

export interface ICreateReturnParams {
  orderId: string;
  facilityId: string;
  returnItems: IReturnItem[];
}

export interface IHoldOrderListItem {
  enteredByPartyId: string;
  enteredByPartyName: string;
  entryDate: number;
  grandTotal: number;
  orderId: string;
}
