import firebase from 'firebase';

export const loginUser = (email, password, setIsError) => {
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
        console.log('error', error);
        setIsError(true);
      });
  } catch (error) {
    console.log('error', error.toString());
  }
};

export const createAccount = async (email, password) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;
    console.log(`currentUser`, currentUser);

    //   const db = firebase.firestore();
    //   db.collection("users")
    //     .doc(currentUser.uid)
    //     .set({
    //       email: currentUser.email,
    //       lastName: lastName,
    //       firstName: firstName,
    //     });
  } catch (err) {
    console.log(`err`, err.message);
  }
};

export async function signInWithEmail(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.log(`err`, err.message);
  }
}

export async function logOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    console.log(`err`, err.message);
  }
}
