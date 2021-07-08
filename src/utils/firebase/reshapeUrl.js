export const reshapeUrl = (url, dimensions) =>
  url.replace('?alt=media', `${dimensions}?alt=media`);
