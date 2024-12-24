export const FAKE = false;
export const ENV = 'prod';//test, prod
export var SHOW_ADS = false;
export const fontSizeChangeConst = 1;
///KEY
export const normalTextSize= "ntsize";
export const kDbVersion = 'dbVer';
export const kHomeTitle = 'homeTitle';
export const kShowAds = 'showAds';
export const kBannerLink = 'bannerImgLink';
export const kAdsLink = 'adsImgLink';
export const kAdsContent = 'adsContent';
export const kYoutubeLink = 'youtubeLink';
export const kMlmCompanyListUpdateAt = 'mlmCompanyListUpdateAt';
export const kUserName = 'userName';
export const kEmail = 'email';
export const kEnableNotification = 'enableNotification';

export const adsBannerAndroid = 'ca-app-pub-8242306153744160/7202706248';
export const adsBannerIOS = 'ca-app-pub-8242306153744160/4598150592';
export const adsBannerTest = 'ca-app-pub-3940256099942544/6300978111';
export const gFormLink = 'https://docs.google.com/forms/d/e/1FAIpQLSdlAHV2DjNyAaWiQfzFO7E2UzgfxWCbYf49A31Cj1RYVQTtQQ/viewform';
export const defaultYoutubeLink = 'https://www.youtube.com/channel/UCTyIKTbThfvF1IvFr4YbaDg';
export const NATIVE_AD_ID = __DEV__ ? adsBannerTest : (Platform.OS === 'android' ? adsBannerAndroid : adsBannerIOS) 
// export const NATIVE_AD_ID = adsBannerIOS