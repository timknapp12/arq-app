import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, H6Secondary, Flexbox } from '../common';
import CloseIcon from '../../../assets/icons/CloseIcon.svg';
import AppContext from '../../contexts/AppContext';

const QOVInfoPopup = ({ onClose }) => {
  const { theme } = useContext(AppContext);
  return (
    <Card style={{ position: 'absolute', top: 30 }}>
      <Flexbox direction="row">
        <H6Secondary>Rank Qualifications are based on:</H6Secondary>
        <TouchableOpacity onPress={onClose}>
          <CloseIcon
            style={{ color: theme.disabledTextColor, height: 30, width: 30 }}
          />
        </TouchableOpacity>
      </Flexbox>
      <H6Secondary>1. PV</H6Secondary>
      <H6Secondary>2. PA</H6Secondary>
      <H6Secondary>3. QOV</H6Secondary>
    </Card>
  );
};

QOVInfoPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default QOVInfoPopup;
