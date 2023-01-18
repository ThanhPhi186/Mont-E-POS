import { TOrderType } from '@/constants/variableConstant';

export interface IReportStatusItem {
  statusDesc: string;
  statusId: string;
  grandTotal: number;
  orderNum: number;
}
export interface IReportItem {
  reports: IReportStatusItem[];
  dateString: string;
}

export interface IReportGeneral {
  grandTotal: number;
  numberOrders: number;
  results: {
    numberOrders: number;
    statusId: TOrderType;
    statusDesc: string;
  }[];
  invoiceTotal: number;
}

export interface IReportStatisticItem {
  grandTotal: number;
  partyName: string;
  partyId: string;
  numberOrders: number;
}
export interface IReportStatistic {
  results: IReportStatisticItem[];
}

export interface IReportDetail {
  reports: {
    grandTotal: number;
    dateString: string;
    monthString: string;
  }[];
  grandTotal: number;
  telecomNumber: string;
  fullName: string;
  fullAddressLocal: string;
  numberOrders: number;
  officeSiteName: '';
}

export interface IListCommission {
  description: string;
  paymentId: string;
  statusId: string;
  lastUpdatedStamp: number;
  amount: number;
}
