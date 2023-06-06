# 配置项目处理extInfo信息

需要配置完Android与iOS微信的基础上

## iOS

在 `AppDelegate.mm` 添加微信处理回调，此方法会获取到值传递到模块内的handleExtInfoIntent方法

```objc
#import "RCTWeChat.h"

/*! @brief 收到一个来自微信的请求，第三方应用程序处理完后调用sendResp向微信发送结果
 * 收到一个来自微信的请求，异步处理完成后必须调用sendResp发送处理结果给微信。
 * 可能收到的请求有GetMessageFromWXReq、ShowMessageFromWXReq等。
 * @param req 具体请求内容，是自动释放的
 */
- (void)onReq:(BaseReq*)req {
    if ([req isKindOfClass:[LaunchFromWXReq class]]) {
        //从微信启动 获取开放标签传递的extinfo数据逻辑
        LaunchFromWXReq *temp = (LaunchFromWXReq *)req;
        WXMediaMessage *msg = temp.message;
        // NSString *openID = temp.openID;
        NSString *extinfo = msg.messageExt;
        [RCTWeChat handleExtInfoIntent:extinfo];
    }
}
```

## Android

调整

```java
package your.package;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.text.TextUtils;

import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.modelmsg.ShowMessageFromWX;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;
import com.theweflex.react.WeChatModule;

public class WXEntryActivity extends Activity implements IWXAPIEventHandler {
    private IWXAPI api;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //初始化和注册
        api = WXAPIFactory.createWXAPI(this, "XXXXX", false); // 微信appid
        Intent intent = getIntent();
        api.handleIntent(intent, this);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        api.handleIntent(intent, this);
    }

    /**
     * 从微信启动App
     *
     * @param req
     */
    @Override
    public void onReq(BaseReq req) {
        //获取开放标签传递的extinfo数据逻辑
        if (req.getType() == ConstantsAPI.COMMAND_SHOWMESSAGE_FROM_WX && req instanceof ShowMessageFromWX.Req) {
            ShowMessageFromWX.Req showReq = (ShowMessageFromWX.Req) req;
            WXMediaMessage mediaMsg = showReq.message;
            String extInfo = mediaMsg.messageExt;

            if (TextUtils.isEmpty(extInfo)) return;

            WeChatModule.handleExtInfoIntent(this, extInfo);

            PackageManager packageManager = getPackageManager();
            Intent intent = packageManager.getLaunchIntentForPackage(this.getPackageName());
            startActivity(intent);
            finish();
        }
    }

    @Override
    public void onResp(BaseResp resp) {
    }
}


```
