import { Alert, Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Localized } from '../translations/Localized';

// run this anytime login user mutation is called
export const handleLoginUser = (
  status,
  navigation,
  useBiometrics,
  onFaceID,
  isFirstAppLoad = false,
  signOutOfFirebase,
) => {
  switch (status) {
    case 'SUCCESS':
      // we only want this to run once per app load, otherwise it will trigger someone to use faceId after they log in using a different method
      if (isFirstAppLoad) {
        // using faceID is only available if useBiometrics has been set to true in settings or during onboarding flow
        if (useBiometrics) {
          onFaceID(navigation, onFaceID, signOutOfFirebase);
        } else {
          signOutOfFirebase();
        }
      } else {
        // send the user to the first screen in App Stack, which is the dashboard screen
        navigation.navigate('App Stack');
      }
      break;
    case 'VERIFICATION_NEEDED':
      navigation.navigate('Enter Id Screen');
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
    case 'NOT_ELIGIBLE_AMBASSADOR':
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
      // return username, email, phone, and navigate to confirm account screen
      setErrorMessage('');
      navigation.navigate('Confirm Account Screen', { username });
      break;
    case 'NOT_FOUND':
      // show an error that there are no results with current id
      setErrorMessage(
        Localized(
          `This id either does not exist or has already been verified in the app - Did you already sign up with other credentials?`,
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
    case 'NOT_ELIGIBLE_AMBASSADOR':
      navigation.navigate('Redirect Unauthorized User Screen', {
        message: Localized(
          'Sorry! It looks like there is an issue with your account - Please contact support',
        ),
        url: 'https://qsciences.com/contact-us',
        linkText: Localized('Contact Support'),
      });
      break;
    default:
      navigation.navigate('Redirect Unauthorized User Screen', {
        message: Localized(
          'Sorry! It looks like there is an issue with your account - Please contact support',
        ),
        url: 'https://qsciences.com/contact-us',
        linkText: Localized('Contact Support'),
      });
  }
};

export const handleLoginValidationProcess = (
  status,
  navigation,
  method,
  username,
  verificationInfo,
  setErrorMessage,
) => {
  switch (status) {
    case 'VERIFICATION_COMPLETE':
      //  send to biometrics screen
      setErrorMessage('');
      navigation.navigate('Biometrics Screen');
      break;
    case 'MESSAGE_SENT':
      // send to verification code screen
      setErrorMessage('');
      navigation.navigate('Verification Code Screen', {
        method,
        username,
        verificationInfo,
      });
      break;
    case 'FAILURE':
      // display an error message to try again
      setErrorMessage(
        Localized(
          'Message failed to send - Please check your info and try again',
        ),
      );
      break;
    default:
      setErrorMessage(
        Localized(
          'Message failed to send - Please check your info and try again',
        ),
      );
  }
};

export const handleConfirmAccessCode = (
  status,
  navigation,
  setErrorMessage,
) => {
  switch (status) {
    case 'VERIFICATION_COMPLETE':
      // send to biometrics screen
      setErrorMessage('');
      navigation.navigate('Biometrics Screen');
      break;
    case 'CAN_NOT_FIND_TOKEN':
      // give error that token can not be found
      setErrorMessage(
        Localized(
          'The access code may have expired - Please get a new code and try again',
        ),
      );
      break;
    default:
      setErrorMessage(
        Localized(
          'The access code may have expired - Please get a new code and try again',
        ),
      );
  }
};

// CANCEL FACEID
const alertTitle = Localized(Platform.OS === 'ios' ? 'Face ID' : 'Fingerprint');
const alertBody = Localized(
  Platform.OS === 'ios' ? 'Sign in with Face ID' : 'Sign in with Fingerprint',
);
export const cancelFaceIDAlert = (navigation, onFaceID, signOutOfFirebase) =>
  Alert.alert(alertTitle, alertBody, [
    {
      text: Localized('Cancel'),
      onPress: () => {
        signOutOfFirebase();
        navigation.navigate('Login Screen');
      },
    },
    {
      text: Localized('Sign in'),
      onPress: () => onFaceID(navigation, onFaceID, signOutOfFirebase),
    },
  ]);

// FACE ID/FINGERPRINT LOGIN
export const onFaceID = async (navigation, onFaceID, signOutOfFirebase) => {
  try {
    // Authenticate user
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      navigation.navigate('App Stack');
    } else {
      cancelFaceIDAlert(navigation, onFaceID, signOutOfFirebase);
    }
  } catch (error) {
    console.log(`error`, error);
  }
};
