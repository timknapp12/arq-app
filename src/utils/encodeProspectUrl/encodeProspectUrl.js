const encodeProspectUrl = (url) => {
  return url
    .replace('=', encodeURIComponent('='))
    .replace('||', encodeURIComponent('||'));
};

export default encodeProspectUrl;
