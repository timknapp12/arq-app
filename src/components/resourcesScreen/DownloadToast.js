import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Toast from '../toast/Toast';
import { H5Black, H6Book, Flexbox } from '../common';

const DownloadToast = ({ visible, title = '', body = '', progress }) => {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    setPercent(progress);
  }, [progress]);
  const percentageString = percent ? `${percent}%` : '';
  return (
    <Toast visible={visible}>
      <Flexbox align="flex-start">
        <H5Black style={{ marginBottom: 4 }}>{title}</H5Black>
        <H6Book>{`${body} ${percentageString}`}</H6Book>
      </Flexbox>
    </Toast>
  );
};

DownloadToast.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  progress: PropTypes.number,
};

export default DownloadToast;
