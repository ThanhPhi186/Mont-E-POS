export interface NotificationData {
  created_at: number;
  data: NotiContent;
  id: string;
  read_at: number;
  updated_at: number;
}

export interface AnyKind {
  [x: string]: any;
}

export interface NotiContent {
  notification: {
    body: string;
    title: string;
  };
  data: {
    screen: string;
    url: string;
  } & AnyKind;
}
