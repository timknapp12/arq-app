import firebase from 'firebase';
import * as Facebook from 'expo-facebook';
// import * as Google from 'expo-auth-session/providers/google';

export const signInWithEmail = async (email, password, setErrorMessage) => {
  setErrorMessage('');
  // TODO test session persistence in app
  try {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // const db = firebase.firestore();
        // firebase;
        // db.collection('users').doc(result.user.uid).update({
        //   lastLoggedIn: Date.now(),
        // });
        console.log(`result`, result.additionalUserInfo);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  } catch (error) {
    console.log('error', error.toString());
  }
};

export const createAccount = async (email, password, setErrorMessage) => {
  setErrorMessage('');
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    console.log(`currentUser`, currentUser);
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

export const getFirebaseIdToken = () => {
  firebase.auth().onAuthStateChanged((user) => {
    console.log('AUTH STATE CHANGED CALLED ');
    if (user) {
      user.getIdToken().then((idToken) => {
        // console.log(`idToken`, idToken);
        return idToken;
      });
    } else {
      console.log('no user is signed in');
    }
  });
};

// export const firebaseUser = firebase.auth().currentUser;

// expo with firebase https://docs.expo.io/guides/using-firebase/

// SIGN IN WITH GOOGLE

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

// FACEBOOK LOGIN
// https://docs.expo.io/guides/using-firebase/#user-authentication
// dev account dashboard https://developers.facebook.com/apps/319892812842607/dashboard/
// expo docs: https://docs.expo.io/versions/latest/sdk/facebook/

// to run a test build
// expo build:ios -t simulator
// build https://docs.expo.io/distribution/building-standalone-apps/#building-standalone-apps

const facebookAppId = '319892812842607';
export const loginWithFacebook = async () => {
  await Facebook.initializeAsync({
    appId: facebookAppId,
    appName: 'Q ConnectPro',
  });

  const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ['public_profile'],
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
        console.log(`error`, error);
      });
  }
};
