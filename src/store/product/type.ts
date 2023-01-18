export interface IProductItem {
  basePriceVAT: number;
  baseUomDesc: string;
  productId: string;
  productName: string;
  pseudoId: string;
  quantityUomId: string;
}

export interface IProductDetail extends IProductItem {
  description: string;
}
//"file:runtime/static/product/101871/content_100488/277679648_3156355017968023_1322219805159794116_n.jpg",
export interface IProductContent {
  lastUpdatedStamp: number;
  sequenceNum: null;
  userId: string;
  productContentId: string;
  contentLocation: string;
  productFeatureId: string;
  description: string;
  locale: string;
  fromDate: number;
  productId: string;
  thruDate: number;
  productStoreId: string;
  productContentTypeEnumId: string;
}

export interface IProductConfig {
  quantityUomId: string;
  quantityUomDesc: string;
  priceOut: {
    productPriceId: string;
    taxAmount: number;
    price: number;
    priceUomId: string;
  };
}

export interface IFullProduct {
  availableToPromiseTotal: number;
  productId: string;
  configs: IProductConfig[];
  productName: string;
  pseudoId: string;
  basePriceVAT: number;
  baseUomDesc: string;
}

export interface IProductCart {
  product: IFullProduct;
  config: IProductConfig;
  count: number;
}

export interface IProductChangeItem {
  pseudoId: string;
  productId: string;
  oldPrice: number;
  quantityUomDesc: string;
  quantityUomId: string;
  newPrice: number;
  productName: string;
  contentLocation: string;
}

export interface IProductPriceChange {
  dateString: string;
  priceChanges: IProductChangeItem[];
}
