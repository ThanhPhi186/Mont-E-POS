export interface IStoreItem {
  taxGatewayConfigId: string;
  requireInventory: string;
  autoAddPromo: string;
  storeName: string;
  productStoreId: string;
  partyId: string;
  inventoryFacilityId: string;
  roleTypeId: string;
  defaultCurrencyUomId: string;
  fromDate: number;
  organizationPartyId: string;
}
export interface ISalesShiftItem {
  posTerminalId: string;
  productStoreId: string;
  posTerminalTypeId: string;
  terminalName: string;
  statusId: string;
  lastUpdatedStamp: number;
}

export interface IFetchStoreResponse {
  stores: IStoreItem[];
}

export interface IFetchSalesShiftResponse {
  terminalsInUse: ISalesShiftItem[];
  terminals: ISalesShiftItem[];
}

export interface IOpenSalesShiftResponse {
  terminalState: ICurrentSalesShiftResponse;
}

export interface ICurrentSalesShiftResponse {
  openedDate: number;
  lastUpdatedStamp: number;
  terminalName: string;
  openedByUserLoginId: string;
  statusId: string;
  posTerminalStateId: string;
  posTerminalTypeId: string;
  currency: string;
  productStoreId: string;
  startingDrawerAmount: number;
  posTerminalId: string;
}
