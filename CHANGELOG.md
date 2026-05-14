# CHANGELOG

## 2.6.3

- 调整NativeModules导出
- 移除jcenter引用

## 2.6.2

- Android 分享大图可能闪退的问题

## 2.6.1

- 调整iOS下onReq与onResp代理逻辑
- 调整iOS集成文档，请在使用API之前务必调用handleLaunchAppReq

## 2.5.0

- 升级iOS SDK至2.0.4

## 2.4.3

- 修复iOS下onReq的触发问题，调整集成说明文档

## 2.4.2

- 修复iOS下onReq的触发问题

## 2.4.1

- 调整Android的启动缓存清除逻辑

## 2.4.0

- 移除getLaunchAppWXExtInfo与addReceiveShowMessageFromWXListener，增加handleLaunchAppReq方法
- 完善对接Android与iOS的onReq方法
- 修复Android的onReq方法发送的事件，与iOS统一

## 2.3.0

- iOS增加getLaunchAppWXExtInfo与addReceiveShowMessageFromWXListener方法，用于获取extInfo
- Android增加getLaunchAppWXExtInfo与监听，用于处理extInfo
- 适配react native 0.71.X
- 更新API文档与项目集成文档

## 2.2.1

- 删除不必要的依赖

## 2.2.0

- 升级OS SDK 1.9.2、Android SDK 6.8.0
- 新增openCustomerServiceChat打开客服接口
- 此项目基于 react-native-wechat-lib
