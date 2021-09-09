export const filterAssetDownloadOptions = (array) => {
  return array.filter(
    (item) => item?.contentType !== 'video' && item?.contentType !== 'podcast',
  );
};
