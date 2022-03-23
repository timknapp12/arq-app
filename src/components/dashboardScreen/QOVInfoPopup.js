import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, H6Secondary, Flexbox } from '../common';
import Close from '../../../assets/icons/CloseIcon.svg';

const CloseIcon = styled(Close)`
  color: ${(props) => props.theme.disabledTextColor};
`;

const QOVInfoPopup = ({ onClose }) => {
  return (
    <Card style={{ position: 'absolute', top: 30 }}>
      <Flexbox direction="row">
        <H6Secondary>Rank Qualifications are based on:</H6Secondary>
        <TouchableOpacity onPress={onClose}>
          <CloseIcon style={{ height: 30, width: 30 }} />
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
