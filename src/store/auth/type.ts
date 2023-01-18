export interface IPhoneInfor {
  contactNumber: string;
  areaCode: null;
  askForName: null;
  lastUpdatedStamp: number;
  contactMechId: string;
  countryCode: string;
}
export interface RawCurrentUser {
  firstName: string;
  lastName: string;
  emailAddress: string;
  telecomNumber: IPhoneInfor;
  middleName: string;
  disabled: string;
  partyId: string;
  locale: string;
  userId: string;
  username: string;
}

export interface ILoginResponse {
  apiKey: string;
  forcePasswordChange: boolean;
  userInfo: RawCurrentUser;
}
