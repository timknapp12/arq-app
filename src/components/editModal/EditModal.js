import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Flexbox, H5 } from '../common';
import { Modal, TouchableOpacity } from 'react-native';
import { Localized, initLanguage } from '../../translations/Localized';

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
  padding: 20px 20px 0px 20px;
  box-shadow: 0px 24px 12px rgba(0, 0, 0, 0.5);
`;

const EditModal = ({ visible, onClose, children, onSave }) => {
  initLanguage();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}>
      <Container>
        <Inner>
          {children}
          <Flexbox padding={10} direction="row" justify="flex-end">
            <TouchableOpacity onPress={onClose}>
              <H5>{Localized('CANCEL')}</H5>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginStart: 8 }} onPress={onSave}>
              <H5>{Localized('SAVE')}</H5>
            </TouchableOpacity>
          </Flexbox>
        </Inner>
      </Container>
    </Modal>
  );
};

EditModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any,
  onSave: PropTypes.func,
};

export default EditModal;
