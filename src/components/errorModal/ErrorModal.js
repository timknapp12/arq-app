import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Flexbox, H4Secondary, CloseIcon, H2 } from '../common';
import { Modal, TouchableOpacity } from 'react-native';
import { Localized } from '../../translations/Localized';

const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.modalBackgroundColor};
`;
const Inner = styled.View`
  max-height: 40%;
  width: 80%;
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 20px;
  box-shadow: ${(props) => props.theme.dropShadow};
`;

const ErrorModal = ({ visible, onClose, errorMessage }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <Container>
        <Inner>
          <TouchableOpacity
            testID="close-edit-modal-button"
            style={{ width: 24, paddingTop: 8, paddingBottom: 8 }}
            onPress={onClose}
          >
            <CloseIcon />
          </TouchableOpacity>
          <Flexbox style={{ paddingBottom: 10 }}>
            <H2 style={{ textAlign: 'center', marginBottom: 8 }}>
              {Localized('Sorry there was an error! Please try again later')}
            </H2>
            <H4Secondary
              style={{
                textAlign: 'center',
              }}
            >
              {errorMessage ? `Error: "${errorMessage}"` : null}
            </H4Secondary>
          </Flexbox>
        </Inner>
      </Container>
    </Modal>
  );
};

ErrorModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default ErrorModal;
