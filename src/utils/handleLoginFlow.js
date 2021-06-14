import { Alert, Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Localized } from '../translations/Localized';
import { signOutOfFirebase } from '../utils/firebase/login';

// run this anytime login user mutation is called
export const handleLoginUser = (
  status,
  navigation,
  useBiometrics,
  onFaceID,
  isFirstAppLoad = false,
) => {
  switch (status) {
    case 'SUCCESS':
      // we only want this to run once per app load, otherwise it will trigger someone to use faceId after they log in using a different method
      if (isFirstAppLoad) {
        // using faceID is only available if useBiometrics has been set to true in settings or during onboarding flow
        if (useBiometrics) {
          onFaceID(navigation, onFaceID);
        } else {
          signOutOfFirebase();
        }
      } else {
        // The first screen in App Stack is the dashboard screen
        navigation.navigate('App Stack');
      }
      break;
    case 'VERIFICATION_NEEDED':
      navigation.navigate('Enter Id Screen');
      // navigation.navigate('App Stack');
      break;
    case 'NOT_AN_AMBASSADOR':
      // send to a screen that gives more info an becoming an ambassador
      navigation.navigate('Redirect Unauthorized User Screen', {
        message: Localized(
          'It looks like you are not a Q Sciences ambassador - Follow the link below to find out how to become an ambassador',
        ),
        url: 'https://qsciences.com/opportunity',
        linkText: Localized('Find out more'),
      });
      break;
    default:
      // sign out of firebase and send to login screen
      signOutOfFirebase();
      navigation.navigate('Login Screen');
  }
};

export const handleGetDirectScaleInfo = (
  status,
  navigation,
  setErrorMessage,
  username,
) => {
  switch (status) {
    case 'SUCCESS':
      // TODO - handle Success
      // return username, email, phone, and navigate to confirm account screen
      navigation.navigate('Confirm Account Screen', { username });
      break;
    case 'NOT_FOUND':
      // show an error that there are no results with current id
      setErrorMessage(
        Localized(
          `Sorry! We can not find anyone with this id - Please try again`,
        ),
      );
      break;
    case 'NOT_AN_AMBASSADOR':
      // send to a screen that gives more info an becoming an ambassador
      navigation.navigate('Redirect Unauthorized User Screen', {
        message: Localized(
          'It looks like you are not a Q Sciences ambassador - Follow the link below to find out how to become an ambassador',
        ),
        url: 'https://qsciences.com/opportunity',
        linkText: Localized('Find out more'),
      });
      break;
    case 'CALL_SUPPORT':
      // send to a screen for user to contact support regarding issue with account
      navigation.navigate('Redirect Unauthorized User Screen', {
        message: Localized(
          'Sorry! It looks like there is an issue with your account - Please contact support',
        ),
        url: 'https://qsciences.com/contact-us',
        linkText: Localized('Contact Support'),
      });
      break;
    default:
    // sign out of firebase and send to login screen
  }
};

// CANCEL FACEID
const alertTitle = Localized(Platform.OS === 'ios' ? 'Face ID' : 'Fingerprint');
const alertBody = Localized(
  Platform.OS === 'ios' ? 'Sign in with Face ID' : 'Sign in with Fingerprint',
);
export const cancelFaceIDAlert = (navigation, onFaceID) =>
  Alert.alert(alertTitle, alertBody, [
    {
      text: Localized('CANCEL'),
      onPress: () => {
        signOutOfFirebase();
        navigation.navigate('Login Screen');
      },
    },
    {
      text: Localized('Sign in'),
      onPress: () => onFaceID(navigation, onFaceID),
    },
  ]);

// FACE ID/FINGERPRINT LOGIN
export const onFaceID = async (navigation, onFaceID) => {
  try {
    // Authenticate user
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      navigation.navigate('App Stack');
    } else {
      cancelFaceIDAlert(navigation, onFaceID);
    }
  } catch (error) {
    console.log(`error`, error);
  }
};
