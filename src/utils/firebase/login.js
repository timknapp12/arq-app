import firebase from 'firebase';

const sessionPersistence = (value) => {
  value === true
    ? firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    : firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
};

export const signInWithEmail = (
  email,
  password,
  setErrorMessage,
  keepLoggedIn,
) => {
  setErrorMessage('');
  sessionPersistence(keepLoggedIn);
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
        console.log(`result`, result);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  } catch (error) {
    console.log('error', error.toString());
  }
};

export const createAccount = async (
  email,
  password,
  setErrorMessage,
  keepLoggedIn,
) => {
  setErrorMessage('');
  sessionPersistence(keepLoggedIn);
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    console.log(`currentUser`, currentUser);
  } catch (err) {
    setErrorMessage(err.message);
  }
};

export async function logOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    console.log(`err`, err.message);
  }
}

// SIGN IN WITH GOOGLE

// https://docs.expo.io/guides/authentication/#google

// const config = {
//   // expoClientId is the same as web client id
//   expoClientId: `348281014348-lplk3ptkokcjse46og4uc5ektcnago28.apps.googleusercontent.com`,
//   iosClientId: `<YOUR_IOS_CLIENT_ID>`,
//   androidClientId: `<YOUR_ANDROID_CLIENT_ID>`,
//   iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
//   androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
// };
