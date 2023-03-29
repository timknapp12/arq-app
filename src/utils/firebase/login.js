import firebase from 'firebase';
import Promise from 'promise';

export const getToken = async () => {
  return new Promise(function (resolve, reject) {
    const user = firebase.auth().currentUser;
    if (user) {
      user.getIdToken(/* forceRefresh */ true).then((idToken) => {
        if (idToken) {
          resolve(idToken);
        } else {
          reject('No token found');
        }
      });
    } else {
      console.log('no user is signed in');
    }
  });
};

// flag prevents multiple triggers of onAuthStateChanged https://stackoverflow.com/questions/49873223/why-does-my-firebase-onauthstatechanged-trigger-multiple-times-react-native
let authFlag = true;
export const checkIfUserIsLoggedIn = async (
  setToken,
  loginUser,
  // this is passed from sign IN screen but not sign UP screen
  setIsLoading = () => {},
) => {
  firebase.auth().onAuthStateChanged((user) => {
    console.log('AUTH STATE CHANGED CALLED ');
    if (authFlag) {
      authFlag = false;
      if (user) {
        console.log('user exists ************       ********');
        user.getIdToken().then((idToken) => {
          setToken(idToken);
          loginUser();
        });
      } else {
        console.log('**********        user does NOT exist *********');
        setIsLoading(false);
      }
    }
  });
};

// expo with firebase https://docs.expo.io/guides/using-firebase/

// https://console.cloud.google.com/apis/credentials?authuser=1&project=q-connect-pro-staging
const expoClientId =
  '348281014348-96db6n78qgp5fbr1kd7nkld3rimt8flv.apps.googleusercontent.com';
const iosClientId =
  '348281014348-2ngcdn7mdg881n0ac1vvrpri6pdpbhjd.apps.googleusercontent.com';
const androidClientId =
  '348281014348-0u6a4j1blq7a2905595jjt8a0pvrvbv5.apps.googleusercontent.com';
const webClientId =
  '348281014348-lplk3ptkokcjse46og4uc5ektcnago28.apps.googleusercontent.com';

export const googleConfig = {
  responseType: 'id_token',
  expoClientId,
  iosClientId,
  androidClientId,
  webClientId,
  scopes: ['email'],
};
