import firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-auth-session/providers/google';

export const getToken = (setToken) => {
  firebase
    .auth()
    .currentUser.getIdToken(/* forceRefresh */ true)
    .then((idToken) => {
      console.log(`idToken`, idToken);
      setToken(idToken);
    })
    .catch((error) => {
      console.log(`error`, error);
    });
};

export const signInWithEmail = async (email, password, setErrorMessage) => {
  setErrorMessage('');
  try {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => setErrorMessage(error.message));
  } catch (error) {
    setErrorMessage(error.message);
  }
};

export const createAccount = async (email, password, setErrorMessage) => {
  setErrorMessage('');
  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => setErrorMessage(error.message));
  } catch (err) {
    setErrorMessage(err.message);
  }
};

export const signOutOfFirebase = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    console.log(`err`, err.message);
  }
};

export const checkIfUserIsLoggedIn = async (
  setToken,
  loginUser,
  isFirstAppLoad,
  setIsFirstAppLoad,
  navigation,
  setIsLoading = () => {},
) => {
  firebase.auth().onAuthStateChanged((user) => {
    console.log('AUTH STATE CHANGED CALLED ');
    if (user) {
      user.getIdToken().then(async (idToken) => {
        setToken(idToken);
        if (isFirstAppLoad) {
          await loginUser();
          setIsFirstAppLoad(false);
        }
      });
    } else {
      setIsLoading(false);
      navigation.navigate('Login Screen');
    }
  });
};

// export const firebaseUser = firebase.auth().currentUser;

// expo with firebase https://docs.expo.io/guides/using-firebase/

// Sign in WITH GOOGLE

// https://docs.expo.io/guides/authentication/#google

// https://console.cloud.google.com/apis/credentials?authuser=1&project=q-connect-pro-staging
const expoClientId =
  '348281014348-96db6n78qgp5fbr1kd7nkld3rimt8flv.apps.googleusercontent.com';
const iosClientId =
  '348281014348-2ngcdn7mdg881n0ac1vvrpri6pdpbhjd.apps.googleusercontent.com';
const androidClientId =
  '348281014348-vd0r29schjo24pg8a774r41ghoqflj3p.apps.googleusercontent.com';
const webClientId =
  '348281014348-lplk3ptkokcjse46og4uc5ektcnago28.apps.googleusercontent.com';

export const googleConfig = {
  expoClientId,
  iosClientId,
  androidClientId,
  webClientId,
};

export const loginWithGoogle = () => {
  const [
    googleRequest,
    googleResponse,
    promptAsync,
  ] = Google.useIdTokenAuthRequest(googleConfig);

  if (googleResponse?.type === 'success') {
    const { id_token } = googleResponse.params;

    const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
    firebase
      .auth()
      .signInWithCredential(credential)
      .catch((error) => console.log('error', error.message));
  }
  return [googleRequest, promptAsync];
};

// FACEBOOK LOGIN
// https://docs.expo.io/guides/using-firebase/#user-authentication
// dev account dashboard https://developers.facebook.com/apps/319892812842607/dashboard/
// expo docs: https://docs.expo.io/versions/latest/sdk/facebook/

// build https://docs.expo.io/distribution/building-standalone-apps/#building-standalone-apps

const facebookAppId = '319892812842607';
export const loginWithFacebook = async () => {
  await Facebook.initializeAsync({
    appId: facebookAppId,
    appName: 'Q ConnectPro',
  });

  const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ['email', 'public_profile'],
  });

  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    console.log(`credential`, credential);
    // Sign in with credential from the Facebook user.
    firebase
      .auth()
      .signInWithCredential(credential)
      .catch((error) => {
        // Handle Errors here.
        console.log(`error`, error.message);
      });
  }
};
