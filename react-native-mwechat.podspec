require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name          = package['name']
  s.version       = package['version']
  s.summary       = package['description']
  s.description   = package['description']
  s.homepage      = package['homepage']
  s.license       = package['license']
  s.author        = package['author']
  s.platform      = :ios, "9.0"
  s.source        = { :git => "https://github.com/bashen1/react-native-mwechat.git", :tag => "master" }
  s.source_files  = "ios/*.{h,m}", "ios/OpenSDK/*.{h,m}"
  s.vendored_libraries = "ios/OpenSDK/libWeChatSDK.a"
  s.requires_arc  = true
  s.frameworks = 'SystemConfiguration','CoreTelephony'
  s.library = 'sqlite3','c++','z'

  s.dependency "React"

end
