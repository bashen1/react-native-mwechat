# Android集成

在项目的 `android/build.gradle` 添加如下节点

```java
allprojects {
    repositories {
        mavenCentral()
        flatDir { dirs "$rootDir/../node_modules/react-native-mwechat/android/libs" }
    }
}
```

## 集成微信登录与分享

如果你需要集成微信的登录与分享功能，需要在主包目录添加 `wxapi` 目录，并在目录下新建一个名为 `WXEntryActivity.java` 的类，内容如下：

```java
package your.package.wxapi;

import android.app.Activity;
import android.os.Bundle;
import com.theweflex.react.WeChatModule;

public class WXEntryActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    WeChatModule.handleIntent(getIntent());
    finish();
  }
}
```

在 `AndroidManifest.xml` 添加以下节点

```xml
<manifest>
  <application>
    <activity
      android:name=".wxapi.WXEntryActivity"
      android:label="@string/app_name"
      android:exported="true"
    />
  </application>
</manifest>
```

## 集成微信支付

如果你需要集成微信的登录与分享功能，需要在主包目录添加 `wxapi` 目录，并在目录下新建一个名为 `WXPayEntryActivity.java` 的类，内容如下：

```java
package your.package.wxapi;

import android.app.Activity;
import android.os.Bundle;
import com.theweflex.react.WeChatModule;

public class WXPayEntryActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    WeChatModule.handleIntent(getIntent());
    finish();
  }
}
```

在 `AndroidManifest.xml` 中添加以下节点

```xml
<manifest>
  <application>
    <activity
      android:name=".wxapi.WXPayEntryActivity"
      android:label="@string/app_name"
      android:exported="true"
    />
  </application>
</manifest>
```

如果遇到安卓App拉起小程序后，小程序无法返回App的情况，需要在AndroidManifest.xml的WXEntryActivity中添加下面这段配置:

```xml
android:taskAffinity="your packagename"
android:launchMode="singleTask"
```

保证跳转后回到你的app的task。  
实际上，我的代码如下：

```xml
<manifest>
  <application>
    <activity
      android:name=".wxapi.WXEntryActivity"
      android:label="@string/app_name"
      android:exported="true"
      android:taskAffinity="org.xxx.xxx.rnapp"
      android:launchMode="singleTask"
    />
  </application>
</manifest>
```
