# Getter.dev
This project encompasses React Native (iOS/Android), TypeScript, React Navigation, Lottie, React Error Boundaries, Hermes JS Engine, Twilio Video (WebRTC), JWT and REST API integration.

It will build on the simulator(s), but the Peer-to-Peer (P2P) WebRTC video will only run on physical devices.

You can build the project to both the iOS simulator and Android emulator, but you'll need one of each physical device to experience the full potential.

## Assumptions
- Going to assume you've set up your Development Environment properly for React Native. If you haven't, they have a great guide at: [Setting up the development environment](https://reactnative.dev/docs/environment-setup).
- This will make sure you have `Homebrew (MacOS)`, `Node.js`, `Watchman`, `Xcode`, `Command Line Tools`, `Cocoapods`, `JDK`, `Android Studio` and `Android SDK`.

_Disclaimer: I am running and developing this against the latest MacOS Monterey (12.1) on Apple Silicon M1X arm64 processor. I do not have a Windows machine to test, but please let me know if you have any issues. I am also running Android Studio Arctic Fox (2020.3.1) with arm64 support. Test devices are an iPhone 11 Pro (iOS 15.2) and Google Pixel 4a (Android 11)._ 

## Setup
- `npm install`
- `npm run ios:pods`
- iOS:
  - You will need an Apple Developer Account to run on a physical device. 
  - `brew install ios-deploy` (for MacOS users building to physical device via CLI)
- Android:
  - You may have trouble compiling this if you have `JDK8` since `API 31` requires `JDK11`. You can set `JAVA_HOME` in your `.bash_profile` to `export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/Contents/Home"` which is the bundled JDK from Android Studio. For `Android Studio Arctic Fox (2020.3.1)` this is `JDK11`.

## Run Simulators
- Metro Bundler: `npm start`
- iOS: `npm run ios`
- Android: `npm run android` (with Android device disconnected)

## Run on Devices
- iOS: `npx react-native run-ios --device 'Getter’s iPhone'`
- Android: `npm run android` (with Android device connected via USB)

## Run Release Version
- iOS: `npx react-native run-ios --no-packager --configuration Release --device 'Getter’s iPhone'`
- Android: `npm run android:release`

## Twilio Video
You'll need to create a free Twilio account to run the P2P WebRTC video chat in this project. I've used `patch-package` on `react-native-twilio-video-webrtc` to update the `TwilioVideo` pod to `4.6` with arm64 support.

_If the links below don't work, check which region (`us1`) you are in first and edit accordingly._ 😀

1) Setup free Twilio Account at [twilio.com](https://www.twilio.com)
2) Grab the `ACCOUNT SID` at [console.twilio.com](https://console.twilio.com)
3) [Set default room settings](https://console.twilio.com/us1/develop/video/manage/room-settings?frameUrl=%2Fconsole%2Fvideo%2Fconfigure%3Fx-target-region%3Dus1) at: https[]()://console.twilio.com/`us1`/develop/video/manage/room-settings?frameUrl=%2Fconsole%2Fvideo%2Fconfigure%3Fx-target-region%3D`us1`
  - Set `Room Type` to `Go`
  - Make sure `Client-side Room Creation` is set to `ENABLED`
  - Make sure to `Save` at the bottom
4) Go to the [API keys section](https://console.twilio.com/us1/account/keys-credentials/api-keys?frameUrl=%2Fconsole%2Fproject%2Fapi-keys%3Fx-target-region%3Dus1) at: https[]()://console.twilio.com/`us1`/account/keys-credentials/api-keys?frameUrl=%2Fconsole%2Fproject%2Fapi-keys%3Fx-target-region%3D`us1`
  - Create a new `standard` API Key
  - Save the `secret` in the `.env` file below before dismissing this screen, you'll only see the secret this one time.
  - Create a `.env` file at the root of this project:
```sh
# `.env`

# ⛔️ DO NOT RUN THE CREDENTIALS LIKE THIS IN PRODUCTION. THIS IS FOR A LOCAL DEMO ONLY! ⛔️
# ⛔️ Private Keys like this CAN be extracted from compiled code in Production! ⛔️
# ⛔️ This is to make it easier to run this project locally without setting up a secure server ⛔️
# ⛔️ For Production, get your JWT token from an authenticated endpoint!! ⛔️
TWILIO_ACCOUNT_SID=""
TWILIO_API_KEY=""
TWILIO_API_SECRET=""
```

## LICENSE
MIT