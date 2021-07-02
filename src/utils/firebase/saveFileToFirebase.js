import * as firebase from 'firebase';

const calculatePercentage = (numerator = 0, denominator = 1) =>
  Math.round((numerator / denominator) * 100);

export const saveFileToFirebase = async (
  file,
  setDownloadUrl,
  selectedTeamName = '',
  title = 'title',
  folderId = 0,
) => {
  try {
    // eslint-disable-next-line no-undef
    const response = await fetch(file.url);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child(`team_resources/${selectedTeamName}/${title}_${folderId}`);
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
          console.log('newUrl', newUrl);
          setDownloadUrl(newUrl);
        });
      },
    );
    await uploadTask;
  } catch (error) {
    console.log('error in upload:', error);
  }
};
