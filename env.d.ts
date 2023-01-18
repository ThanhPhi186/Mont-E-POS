declare module 'react-native-config' {
  export type ConfigType = {
    ONESIGNAL_APP_ID: string;
    ONESIGNAL_API_KEY: string;
    CODEPUSH_ANDROID: string;
    API_URL: string;
    API_TOKEN_URL: string;
    ENV: 'development' | 'production' | 'staging';
    CODEPUSH_IOS: string;
    VERSION_APP_NAME: string;
    VERSION_APP_CODE: number;
  };
  const Config: ConfigType;
  export default Config;
}
