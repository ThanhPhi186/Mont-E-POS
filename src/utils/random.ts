export const randomId = (len = 23): string => {
  const charSet =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
  let id = '';
  for (let i = 0; i < len; i += 1) {
    const randomPoz = Math.floor(Math.random() * charSet.length);
    id += charSet.substring(randomPoz, randomPoz + 1);
  }
  return id;
};
export const randomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max));
