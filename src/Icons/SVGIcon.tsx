import React from 'react';
import {SvgProps} from 'react-native-svg';
import IcArrowRight from '@/assets/svg/icon-arrow-right.svg';
import IcRevShare from '@/assets/svg/icon-rev-share.svg';
import IcHomeCategory from '@/assets/svg/home/icon-category.svg';
import IcHomeChangePrice from '@/assets/svg/home/icon-change.svg';
import icHomeCustomers from '@/assets/svg/home/icon-customers.svg';
import icHomeDaily from '@/assets/svg/home/icon-daily.svg';
import IcHomeGift from '@/assets/svg/home/icon-gift.svg';
import icHomeCheckin from '@/assets/svg/home/icon-home-checkin.svg';
import IcListOrder from '@/assets/svg/icon-list-order.svg';
import IcContactPhone from '@/assets/svg/icon-contact-phone.svg';
import IcContactZalo from '@/assets/svg/icon-contact-zalo.svg';
import IcContactMessenger from '@/assets/svg/icon-contact-messenger.svg';
import ItemEmptyImage from '@/assets/svg/item-empty-image.svg';
import ItemOrderSuccess from '@/assets/svg/item-order-success.svg';
import ItemSearchEmpty from '@/assets/svg/item-search-empty.svg';

export const IconSVG = {
  'ic-arrow-right': IcArrowRight,
  'ic-rev-share': IcRevShare,
  'ic-home-category': IcHomeCategory,
  'ic-home-change': IcHomeChangePrice,
  'ic-home-customer': icHomeCustomers,
  'ic-home-daily': icHomeDaily,
  'ic-home-checkin': icHomeCheckin,
  'ic-home-promotion': IcHomeGift,
  'ic-list-order': IcListOrder,
  'ic-contact-phone': IcContactPhone,
  'ic-contact-zalo': IcContactZalo,
  'ic-contact-messenger': IcContactMessenger,
  'item-empty-image': ItemEmptyImage,
  'item-order-success': ItemOrderSuccess,
  'item-search-empty': ItemSearchEmpty,
};

function SVGIcon({
  name,
  ...props
}: {
  name: keyof typeof IconSVG;
  size?: number;
} & SvgProps) {
  const SVGComponent = IconSVG[name];
  return <SVGComponent {...props} />;
}

export default SVGIcon;
