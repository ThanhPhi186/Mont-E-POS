import { Linking } from 'react-native';

export function openUrl(url: string) {
  Linking.openURL(url)
    .then(() => {})
    .catch(error => {
      console.log('Error', error);
    });
}
