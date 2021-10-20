import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { Localized } from '../translations/Localized';

export const downloadFile = async (
  url,
  filename,
  contentType,
  setToastInfo,
) => {
  // The callback function runs as the download is in progress
  let progress;
  const callback = (downloadProgress) => {
    progress = Math.round(
      (downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite) *
        100,
    );
    // this block opens the toast to notify user that the download process has begun and current percent finished
    if (contentType === 'image') {
      setToastInfo(
        filename,
        Localized('Downloading to Photos...'),
        true,
        progress,
      );
    } else {
      setToastInfo(filename, Localized('Downloading...'), true, progress);
    }
    return progress;
  };

  // if the file is an image then the app needs permission to access the photos on the device
  if (contentType === 'image') {
    const permissions = await MediaLibrary.requestPermissionsAsync();
    if (permissions.status !== 'granted') {
      return Alert.alert(
        Localized('Sorry, we need camera roll permissions to make this work!'),
        Localized(
          'Please go to settings on your device and enable permissions to access your photos',
        ),
      );
    }
  }
  const downloadPath = FileSystem.cacheDirectory + filename;
  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    downloadPath,
    {},
    callback,
  );
  const { uri: localUrl } = await downloadResumable.downloadAsync();

  // this block updates the toast to notify user that download is complete
  if (contentType === 'image') {
    setTimeout(() => {
      setToastInfo(filename, Localized('Saved to Photos'), false, 100);
    }, 1000);
    // if the file is an image then it will be saved directly into the photos on the device
    try {
      MediaLibrary.saveToLibraryAsync(localUrl);
    } catch (error) {
      console.log(`error`, error);
    }
    // if the file is NOT an image then the user will select where to save the file on the device
  } else {
    setTimeout(() => {
      setToastInfo(filename, Localized('Download Complete'), false, 100);
    }, 1000);
    try {
      Sharing.shareAsync(localUrl);
    } catch (e) {
      console.error(e);
    }
  }
};
