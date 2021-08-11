export const findProductImageUrl = (array) => {
  if (array) {
    const result = array.find((item) => item?.contentType === 'image');
    if (result) {
      return result.linkUrl;
    }
  }
};
