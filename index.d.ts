/*! @brief 请求发送场景
 *
 */
import { EventSubscription } from 'react-native';

enum WXScene {
  WXSceneSession          = 0,   /**< 聊天界面    */
  WXSceneTimeline         = 1,   /**< 朋友圈     */
  WXSceneFavorite         = 2,   /**< 收藏       */
  WXSceneSpecifiedSession = 3,   /**< 指定联系人  */
};
type Callback<T> = (result: T) => void;

declare module "react-native-mwechat" {
  export function registerApp(appId: string, universalLink?: string): Promise<boolean>;
  export function isWXAppInstalled(): Promise<boolean>;
  export function isWXAppSupportApi(): Promise<boolean>;
  export function getApiVersion(): Promise<string>;
  export function openWXApp(): Promise<boolean>;
  export interface AuthResponse {
    errCode?: number;
    errStr?: string;
    openId?: string;
    code?: string;
    url?: string;
    lang?: string;
    country?: string;
  }
  export interface WeChatReq {
    type?: string,
    errStr?: string,
    extMsg?: string,
    country?: string,
    state?: string,
    returnKey?: string
  }
  export interface WeChatResp {
    type?: string,
    errStr?: string,
    extMsg?: string,
    country?: string,
    state?: string,
    returnKey?: string
  }
  export function sendAuthRequest(
    scope: string | string[],
    state?: string
  ): Promise<AuthResponse>;
  export interface ShareMetadata {
    type:
      | "news"
      | "text"
      | "imageUrl"
      | "imageFile"
      | "imageResource"
      | "video"
      | "audio"
      | "file";
    thumbImage?: string;
    description?: string;
    webpageUrl?: string;
    imageUrl?: string;
    videoUrl?: string;
    musicUrl?: string;
    filePath?: string;
    fileExtension?: string;
  }
  export interface ShareTextMetadata {
    text: string,
    scene?: WXScene
  }
  export interface ShareImageMetadata {
    imageUrl: string,
    scene?: WXScene
  }
  export interface ShareMusicMetadata {
    musicUrl: string,
    musicLowBandUrl?: string,
    musicDataUrl?: string,
    musicLowBandDataUrl?: string,
    title?: string,
    description?: string,
    thumbImageUrl?: string,
    scene?: WXScene
  }
  export interface ShareVideoMetadata {
    videoUrl: string,
    videoLowBandUrl?: string,
    title?: string,
    description?: string,
    thumbImageUrl?: string,
    scene?: WXScene
  }
  export interface ShareWebpageMetadata {
    webpageUrl: string,
    title?: string,
    description?: string,
    thumbImageUrl?: string,
    scene?: WXScene
  }
  export interface ShareMiniProgramMetadata {
    webpageUrl: string,
    userName: string,
    path?: string,
    hdImageUrl?: string,
    withShareTicket?: string,
    miniProgramType?: number,
    title?: string,
    description?: string,
    thumbImageUrl?: string,
    scene?: WXScene
  }
  export interface LaunchMiniProgramMetadata {
    userName: string,
    miniProgramType?: number,
    path?: string
  }

  export interface SubscribeMessageMetadata {
    scene?: WXScene,
    templateId: string,
    reserved?: string
  }

  export function shareText(
    message: ShareTextMetadata
  ): Promise<{ errCode?: number; errStr?: string }>;
  export function shareImage(
    message: ShareImageMetadata
  ): Promise<{ errCode?: number; errStr?: string }>;
  export function shareLocalImage(
    message: ShareImageMetadata
  ): Promise<{ errCode?: number; errStr?: string }>;
  export function shareMusic(
    message: ShareMusicMetadata
  ): Promise<{ errCode?: number; errStr?: string }>;
  export function shareVideo(
    message: ShareVideoMetadata
  ): Promise<{ errCode?: number; errStr?: string }>;
  export function shareWebpage(
    message: ShareWebpageMetadata
  ): Promise<{ errCode?: number; errStr?: string }>;
  export function shareMiniProgram(
    message: ShareMiniProgramMetadata
  ): Promise<{ errCode?: number; errStr?: string }>;
  export function launchMiniProgram(
    message: LaunchMiniProgramMetadata
  ): Promise<{ errCode?: number; errStr?: string }>;
  export function subscribeMessage(
    message: SubscribeMessageMetadata
  ): Promise<{ errCode?: number; errStr?: string }>;
  export interface PaymentLoad {
    partnerId: string;
    prepayId: string;
    nonceStr: string;
    timeStamp: string;
    package: string;
    sign: string;
  }
  export function pay(
    payload: PaymentLoad
  ): Promise<{ errCode?: number; errStr?: string }>;

  export function openCustomerServiceChat(message: {
    corpId: string;
    url: string;
  }): Promise<{ errCode?: number; errStr?: string }>;

  export function getLaunchAppWXExtInfo(callback: Callback<{ extInfo: string }>): void;

  export function addReceiveShowMessageFromWXListener(callback: Callback<{ extInfo: string }>): EventSubscription;
}
