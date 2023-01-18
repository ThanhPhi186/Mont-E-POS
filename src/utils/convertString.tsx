import _ from 'lodash';
import moment from 'moment';

export const hiddenText = (
  str: string,
  showLastOfNumbers = 0,
  showFirstOfNumbers = 0,
) => {
  let tmpStr = str.substr(0, showFirstOfNumbers);
  let i;
  for (i = showFirstOfNumbers; i < str.length - showLastOfNumbers; i++) {
    tmpStr += '*';
  }
  tmpStr += str.substr(i, showLastOfNumbers);
  return tmpStr;
};

export const cutString = (str: string, numberOfWordToShow = 0) => {
  if (!str) return '';
  const splitWords = str.split(' ');
  const more = splitWords.length > numberOfWordToShow ? '...' : '';
  return splitWords.slice(0, numberOfWordToShow).join(' ') + more;
};

export const prettyAmount = (amountStr: string) => {
  if (!amountStr) return '';
  return getLocaleNumber(amountStr, 5);
};

export const prettyFiat = (fiatStr: string) => {
  if (!fiatStr) return '';
  if (Number(fiatStr) < 0.00001) return '< 0.00001';
  return getLocaleNumber(fiatStr, 3);
};

export const convertPhoneNumber11to10 = (
  phoneNumber: string,
  hasSpace?: boolean,
) => {
  const areaCode = '+84'; // mã vùng Việt Nam
  if (phoneNumber.length === 10) {
    const number = phoneNumber.replace(
      /0/,
      `${areaCode}${hasSpace ? ` ` : ''}`,
    );
    return number;
  }
  let firstNumber = phoneNumber.substr(0, 4);

  switch (firstNumber) {
    // viettel
    case '0162':
    case '0163':
    case '0164':
    case '0165':
    case '0166':
    case '0167':
    case '0168':
    case '0169':
      firstNumber = `${areaCode}${hasSpace ? ` ` : ''}3${firstNumber[3]}`;
      break;

    // vina
    case '0123':
    case '0124':
    case '0125':
      firstNumber = `${areaCode}${hasSpace ? ` ` : ''}8${firstNumber[3]}`;
      break;
    case '0127':
      firstNumber = `${areaCode}${hasSpace ? ` ` : ''}81`;
      break;
    case '0129':
      firstNumber = `${areaCode}${hasSpace ? ` ` : ''}82`;
      break;

    // mobi
    case '0120':
      firstNumber = `${areaCode}${hasSpace ? ` ` : ''}70`;
      break;
    case '0121':
      firstNumber = `${areaCode}${hasSpace ? ` ` : ''}79`;
      break;
    case '0122':
      firstNumber = `${areaCode}${hasSpace ? ` ` : ''}77`;
      break;
    case '0126':
      firstNumber = `${areaCode}${hasSpace ? ` ` : ''}76`;
      break;
    case '0128':
      firstNumber = `${areaCode}${hasSpace ? ` ` : ''}78`;
      break;

    // VietnamMobile
    case '0186':
      firstNumber = `${areaCode}${hasSpace ? ` ` : ''}56`;
      break;
    case '0188':
      firstNumber = `${areaCode}${hasSpace ? ` ` : ''}58`;
      break;

    // G-Mobile
    case '0199':
      firstNumber = `${areaCode}${hasSpace ? ` ` : ''}59`;
      break;
    default: // TODO
  }
  const lastNumber = phoneNumber.substr(4, phoneNumber.length - 4);
  return `${firstNumber}${lastNumber}`;
};

export const removeAllStyleFromHTML = (html: string) => {
  const regex = /\s*style=(["'])(.*?)\1/gim;
  return html.replace(regex, '');
};

export function stringToSlug(str: string) {
  // remove accents
  let from =
      'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
    to =
      'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], 'gi'), to[i]);
  }

  str = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, '-')
    .replace(/-+/g, '-');

  return str;
}

export const normalizeObjectEthers = (inputObj: any) => {
  let rsObj = inputObj;
  if (!inputObj) return inputObj;
  for (const ks of Object.keys(inputObj)) {
    if (inputObj[ks] && typeof inputObj[ks] === 'object') {
      if (inputObj[ks]._isBigNumber) {
        rsObj[ks] = rsObj[ks]._hex;
      } else {
        rsObj[ks] = normalizeObjectEthers(inputObj[ks]);
      }
    }
  }
  return rsObj;
};

export const hidden3LastChar = (str = '') => {
  let tmp = '';
  if (str.length >= 18) {
    tmp = str.substr(0, 15);
  } else {
    tmp = str.substr(0, str.length - 3);
  }
  tmp += '***';
  return tmp;
};

export const convertNameToHidenName = (str = '') => {
  if (!str) return '';
  let tmp = '';
  let splitSpace = str.split(/\s+/);
  if (splitSpace.length === 1) tmp = str;
  else {
    tmp = splitSpace[0][0] + ' ' + splitSpace[splitSpace.length - 1];
  }
  if (tmp.length >= 10) return str.substr(0, 10) + '...';
  return tmp;
};

export function getLocaleNumber(value: number | string, showBehindDot = 0) {
  const numb = Number(value).toString();

  const split = numb.split('.');
  const frontOfDot = split[0].replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,');
  let shortenNumb = frontOfDot;
  if (showBehindDot && split.length === 2) {
    shortenNumb += `.${split[1].substring(0, showBehindDot)}`;
  }

  return shortenNumb;
}
export function shortAddress(address?: string, numOfShow = 4) {
  if (!address) return '';
  if (address.length < 10) return address;
  return `${address.substring(0, numOfShow + 2)}...${address.substring(
    address.length - numOfShow,
    address.length,
  )}`;
}

export function convertTime(time: number, format = 'DD MMM, YYYY') {
  if (!time) return '';
  const startOfDay = moment().startOf('day').toDate().getTime();
  const startOfYesterday = moment()
    .add(-1, 'day')
    .startOf('day')
    .toDate()
    .getTime();
  if (time > startOfDay) return 'Today';
  if (time > startOfYesterday) return 'Yesterday';
  return moment(time).format(format);
}

export const removeDiacritics = (txt: string) => {
  return txt
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export function formatAmount(x: string, maximumFractionDigits = 2) {
  const formatter = Intl.NumberFormat('en-US', {
    maximumFractionDigits: maximumFractionDigits,
  });
  if (_.last(x) === '.' || _.isEmpty(x)) {
    return x;
  }
  return formatter.format(Number(x));
  // return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
