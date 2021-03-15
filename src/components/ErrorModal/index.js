import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Flexbox, H4Secondary, CloseIcon, H2Normal } from '../Common';
import { Modal, TouchableOpacity } from 'react-native';
import { Localized, init } from '../../Translations/Localized';

const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.modalBackgroundColor};
`;
const Inner = styled.View`
  height: 25%;
  width: 80%;
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 20px;
`;

const ErrorModal = ({ visible, onClose, errorMessage = '' }) => {
  init();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <Container>
        <Inner>
          <TouchableOpacity style={{ width: 24 }} onPress={onClose}>
            <CloseIcon />
          </TouchableOpacity>
          <Flexbox height="100%" padding={20} justify="space-between">
            <H2Normal style={{ textAlign: 'center' }}>
              {Localized('Sorry there was an error! Please try again later')}
            </H2Normal>
            <H4Secondary
              style={{
                textAlign: 'center',
              }}>
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
  errorMessage: PropTypes.string,
};

export default ErrorModal;
