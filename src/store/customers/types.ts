export interface ICustomer {
  countryGeoId: string;
  stateProvinceGeoName: string;
  webAddress: null;
  latitude: number;
  countryGeoName: string;
  telecomNumber: string;
  fullName: string;
  wardName: string;
  total: string;
  emailAddress: string;
  postalAddress: string;
  countyGeoId: string;
  wardGeoId: string;
  checkInOk: 'N' | 'Y';
  partyCode: string;
  fullAddress: string;
  checkOutOk: 'N' | 'Y';
  stateProvinceGeoId: string;
  storeName: string;
  productStoreId: string;
  partyId: string;
  countyGeoName: string;
  officeSiteName: string;
  longitude: number;
  contactNumber?: string;
}

export interface ICustomerRoute {
  total: number;
  customers: ICustomer[];
  routeIds: string[];
}

export interface IRoute {
  routeId: string;
  routeName: string;
  routeCode: string;
}

export interface IListAddress {
  geoId: string;
  geoName: string;
  geoNameLocal: string;
}

export interface IGender {
  label: string;
  value: string;
}

export interface IAddCustomerParams {
  fullName: string;
  partyTypeEnumId: string;
  productStoreId: string | undefined;
  countryGeoId?: string;
  stateProvinceGeoId?: string;
  districtId?: string;
  wardGeoId?: string;
  tarAddress?: string;
  telecomNumber: string;
}

export interface ICustomerRecommended {
  customerId: string;
  customerName: string;
  fullAddress: string;
  officeSiteName: string;
  partyCode: string;
  phone: string;
}

export interface ICustomerDetail {
  postalAddress?: string;
  countryGeoId?: string;
  stateProvinceGeoId?: string;
  countyGeoId?: string;
  wardGeoId?: string;
  telecomNumber: string;
  partyId: string;
  fullName: string;
  partyCode: string;
}
