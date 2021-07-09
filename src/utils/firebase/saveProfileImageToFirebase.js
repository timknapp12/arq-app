import * as firebase from 'firebase';
import uuid from 'react-native-uuid';
import { reshapeUrl } from './reshapeUrl';
import { GET_PROFILE } from '../../graphql/queries';

const calculatePercentage = (numerator = 0, denominator = 1) =>
  Math.round((numerator / denominator) * 100);

export const saveProfileImageToFirebase = async (
  user,
  updateProfile,
  variables,
  onCompleted,
) => {
  const refToBeDeleted = firebase
    .storage()
    .ref()
    // in firebase we are using an extension that resizes the image to 72x72 and so "_72x72" is appended as a suffix to the filename once it is successfully resized and saved
    .child(`profile_images/${user.profileImageFileName}_72x72`);
  let newImageName = `${user?.firstName}.${user?.lastName}.${uuid.v4()}`;
  try {
    // eslint-disable-next-line no-undef
    const response = await fetch(user.profileUrl);
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
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((downloadUrl) => {
            const newUrl = downloadUrl;
            console.log('newUrl', newUrl);
            // console.log('newImageName *********', newImageName);
            const reformattedUrl = reshapeUrl(newUrl, '_72x72');
            const { associateId } = variables;
            updateProfile({
              variables: {
                ...variables,
                profileImageFileName: newImageName,
                profileUrl: reformattedUrl,
              },
              onError: (error) => {
                console.log(`error`, error);
                onCompleted();
              },
              update: (cache) => {
                const data = cache.readQuery({
                  query: GET_PROFILE,
                  variables: { associateId },
                });
                console.log(`data in update cache:`, data);
                const newData = [];
                const profileCopy = {
                  ...data.associates[0],
                  profileUrl: reformattedUrl,
                };
                newData.push(profileCopy);
                console.log(`newData:`, newData);

                cache.writeQuery(
                  { query: GET_PROFILE, variables: { associateId } },
                  newData,
                );
              },
            });
          })
          .then(() => onCompleted());
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
