# 配置项目处理extInfo信息

需要配置完Android与iOS微信的基础上

## iOS

在 `AppDelegate.mm` 添加微信处理回调，此方法会获取到值传递到模块内的handleLaunchIntent方法，如果在AppDelegate处添加了WXApiDelegate，则模块内的onReq不再触发，但是onResp正常触发

如果`AppDelegate.mm`接管onReq，请务必在ReactJs调用`handleLaunchAppReq`，因为有一个状态锁需要打开

```objc
#import "RCTWeChat.h"

/*! @brief 收到一个来自微信的请求，第三方应用程序处理完后调用sendResp向微信发送结果
 * 收到一个来自微信的请求，异步处理完成后必须调用sendResp发送处理结果给微信。
 * 可能收到的请求有GetMessageFromWXReq、ShowMessageFromWXReq等。
 * @param req 具体请求内容，是自动释放的
 */
- (void)onReq:(BaseReq*)req {
    [RCTWeChat handleLaunchIntent: req];
}
```

## Android

调整 `WXEntryActivity.java` 为如下代码，如果没有则新建

```java
package your.package.wxapi;

import android.app.Activity;
import android.os.Bundle;
import com.theweflex.react.WeChatModule;

public class WXEntryActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    PackageManager packageManager = getPackageManager();
    Intent intent = packageManager.getLaunchIntentForPackage(this.getPackageName());
    startActivity(intent);
    // 注意：以下Intent顺序不能调整
    WeChatModule.handleIntent(getIntent());
    WeChatModule.handleLaunchIntent(getIntent());
    finish();
  }
}
```
