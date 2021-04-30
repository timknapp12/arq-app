import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Toast from '../toast/Toast';
import { H5Black, H6Book, Flexbox } from '../common';
import Donut from '../dashboardScreen/Donut';
import AppContext from '../../contexts/AppContext';

const DownloadToast = ({ visible, title = '', body = '', progress }) => {
  const { theme } = useContext(AppContext);

  return (
    <Toast visible={visible}>
      <Flexbox direction="row">
        <Donut
          percentage={progress}
          max={100}
          radius={30}
          strokeWidth={3}
          color={theme.primaryTextColor}
          fontSize={14}
          showPercentageSymbol
        />
        <Flexbox style={{ marginStart: 8 }} align="flex-start">
          <H5Black style={{ marginBottom: 4 }}>{title}</H5Black>
          <H6Book>{body}</H6Book>
        </Flexbox>
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
