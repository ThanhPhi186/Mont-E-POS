export const convertQueryStringToObject = (str: string) => {
  if (!str) return {};
  const tmp = str.replace('?', '').replace('%3D', '=').replace('%26', '&');
  const objString = tmp.split('&');
  const obj: any = {};
  objString.forEach((item) => {
    const keyValue = item.split('=');
    obj[keyValue[0]] = keyValue[1];
  });
  return obj;
};
export const convertObjectToQueryString = (obj: any) => {
  let str = '?';
  console.log(obj);
  Object.keys(obj).forEach((key, index) => {
    console.log(key, index);
    str += `${index > 0 ? '&' : ''}${key}=${obj[key]}`;
  });
  return str;
};
export const replaceQuery = (origin: string, replace: any) => {
  if (!origin) return '';
  const params = convertQueryStringToObject(origin);
  return convertObjectToQueryString({ ...params, ...replace });
};
