// DEV Settings
let uri = 'https://qservicesstaging-dev.azurewebsites.net/graphql';

// Staging settings
let appName = 'q-connect-pro-staging';
let appVersion = '0.0.148';
let bundleIdent = 'com.qsciences.q-connect-pro-staging';
let googleServicesFileIos = './staging/GoogleService-Info.plist';
let googleServicesFileAndroid = './staging/google-services.json';
let versionCode = 148;
let androidPackage = 'com.qsciences.q_connect_pro_staging';
let firebaseAPIKey = 'AIzaSyDLvs6kf7lAlma9v714M_yF4EqP_UDIc5g';
let authDomain = 'q-connect-pro-staging.firebaseapp.com';
let projectID = 'q-connect-pro-staging';
let storageBucket = 'q-connect-pro-staging.appspot.com';
let senderID = '348281014348';
let appID = '1:348281014348:web:33717b1f58b819a9594ce9';
let measurementID = 'G-WV8PXGZQM1';
let facebookAppId = '319892812842607';
let facebookSchemeId = 'fb319892812842607';
let facebookDisplayName = 'Q ConnectPro';
let easProjectId = 'f8465a09-c195-40a6-8cfa-218a5c13a19d';

if (process.env.DEPLOY_ENVIRONMENT === 'staging') {
  uri = 'https://qservicesstaging.azurewebsites.net/graphql';
}

// Production settings
if (process.env.DEPLOY_ENVIRONMENT === 'production') {
  appName = 'ambassador-resources-q';
  appVersion = '2.4.8';
  bundleIdent = 'com.qsciences.ambassadorResourcesQ';
  googleServicesFileIos = './production/GoogleService-Info.plist';
  googleServicesFileAndroid = './production/google-services.json';
  androidPackage = 'com.qsciences.ambassadorResourcesQ';
  versionCode = 20048;
  firebaseAPIKey = 'AIzaSyCJ9fsDkv4R-P3Ok8ZYswXB5OfxZNiGXxg';
  authDomain = 'q-innovation-prod.firebaseapp.com';
  projectID = 'q-innovation-prod';
  storageBucket = 'q-innovation-prod.appspot.com';
  senderID = '558665444400';
  appID = '1:558665444400:web:f5bc78feb12241c63551f5';
  measurementID = 'G-EFX1G827C7';
  facebookAppId = '172749824824779';
  facebookSchemeId = 'fb172749824824779';
  facebookDisplayName = 'Ambassador Resources Q';
  easProjectId = '8548fd4f-00c1-4bd2-9b65-5ab910fcff21';
  uri = 'https://qservicesapi.azurewebsites.net/graphql';
}

export default {
  expo: {
    name: appName,
    slug: appName,
    version: appVersion,
    owner: 'qsiholdingcompanyinc',
    orientation: 'portrait',
    icon: './assets/icon.png',
    // scheme: androidPackage,
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#000000',
    },
    updates: {
      fallbackToCacheTimeout: 0,
      enabled: true,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: bundleIdent,
      usesAppleSignIn: true,
      buildNumber: appVersion,
      googleServicesFile: googleServicesFileIos,
      supportsTablet: true,
      infoPlist: {
        CFBundleAllowMixedLocalizations: true,
        UIRequiresFullScreen: true,
      },
      requireFullScreen: true,
      usesIcloudStorage: true,
    },
    locales: {
      en: './src/translations/iosPermissions/english.json',
      cs: './src/translations/iosPermissions/czech.json',
      de: './src/translations/iosPermissions/german.json',
      es: './src/translations/iosPermissions/spanish.json',
      fr: './src/translations/iosPermissions/french.json',
      it: './src/translations/iosPermissions/italian.json',
      ja: './src/translations/iosPermissions/japanese.json',
      nb: './src/translations/iosPermissions/norwegian.json',
      nl: './src/translations/iosPermissions/dutch.json',
    },
    android: {
      package: androidPackage,
      versionCode: versionCode,
      googleServicesFile: googleServicesFileAndroid,
      softwareKeyboardLayoutMode: 'pan',
      splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#000000',
        mdpi: './assets/splash@1.png',
        hdpi: './assets/splash@1.5x.png',
        xhdpi: './assets/splash@2x.png',
        xxhdpi: './assets/splash@3x.png',
        xxxhdpi: './assets/splash@4x.png',
      },
      adaptiveIcon: {
        foregroundImage: './assets/foreground.png',
        backgroundImage: './assets/background.png',
      },
      permissions: [
        'CAMERA',
        'READ_CONTACTS',
        'USE_FINGERPRINT',
        'WRITE_EXTERNAL_STORAGE',
        'READ_EXTERNAL_STORAGE',
      ],
    },
    androidNavigationBar: {
      barStyle: 'light-content',
      backgroundColor: '#000000',
    },
    web: {
      favicon: './assets/favicon.png',
      config: {
        firebase: {
          apiKey: firebaseAPIKey,
          authDomain: authDomain,
          projectId: projectID,
          storageBucket: storageBucket,
          messagingSenderId: senderID,
          appId: appID,
          measurementId: measurementID,
        },
      },
    },
    facebookAppId: facebookAppId,
    facebookScheme: facebookSchemeId,
    facebookDisplayName: facebookDisplayName,
    packagerOpts: {
      config: 'metro.config.js',
      sourceExts: [
        'expo.ts',
        'expo.tsx',
        'expo.js',
        'expo.jsx',
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'wasm',
        'svg',
      ],
    },
    plugins: [
      'expo-tracking-transparency',
      [
        'expo-document-picker',
        {
          iCloudContainerEnvironment: 'Production',
        },
      ],
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
    ],
    extra: {
      uri: uri,
      eas: {
        projectId: easProjectId,
      },
    },
  },
};
