import * as firebase from 'firebase';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const calculatePercentage = (numerator = 0, denominator = 1) =>
  Math.round((numerator / denominator) * 100);

export const saveProfileImageToFirebase = async (user, handleChange) => {
  const refToBeDeleted = firebase
    .storage()
    .ref()
    .child(`profile_images/${user.image.imageName}`);

  let newImageName = `${user?.firstName}.${user?.lastName}.${uuidv4()}`;
  try {
    // eslint-disable-next-line no-undef
    const response = await fetch(user.image.url);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child(`profile_images/${newImageName}`);
    const uploadTask = ref.put(blob);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        let progress = calculatePercentage(
          snapshot.bytesTransferred,
          snapshot.totalBytes,
        );
        console.log('progress', progress);
        // setPercentage(progress);
      },
      (error) => {
        console.log('error', error);
      },
      () => {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          const newUrl = downloadUrl;
          // console.log('newUrl', newUrl);
          // console.log('newImageName *********', newImageName);
          return handleChange('image', {
            url: newUrl,
            imageName: newImageName,
          });
        });
      },
    );
    await uploadTask;
    refToBeDeleted
      .delete()
      .then(() => {
        console.log('deletion successfull');
      })
      .catch((error) => {
        console.log('error in deletion:', error);
      });
  } catch (error) {
    console.log('error in upload:', error);
  }
};
