import AsyncStorage from '@react-native-community/async-storage';

export async function setStringItem(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}

export async function setObjectItem(
  key: string,
  params: Record<string, unknown>,
) {
  await AsyncStorage.setItem(key, JSON.stringify(params));
}

export async function getStringItem(key: string, defaultValue: string) {
  const result = await AsyncStorage.getItem(key);
  return result || defaultValue;
}

export async function getObjectItem(key: string, defaultValue?: any) {
  const result = await AsyncStorage.getItem(key);
  try {
    return result ? JSON.parse(result) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

export async function removeKey(key: string) {
  return await AsyncStorage.removeItem(key);
}
