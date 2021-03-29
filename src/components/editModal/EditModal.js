import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Flexbox, H5Bold } from '../common';
import { Modal, TouchableOpacity, Platform } from 'react-native';
import { Localized, initLanguage } from '../../translations/Localized';

const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.modalBackgroundColor};
  flex: 1;
`;
const Inner = styled.KeyboardAvoidingView`
  max-height: 40%;
  width: 80%;
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 20px 20px 0px 20px;
  box-shadow: 0px 24px 12px rgba(0, 0, 0, 0.5);
`;

const EditModal = ({
  visible,
  onClose,
  children,
  onSave,
  verticalOffset = 20,
}) => {
  initLanguage();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}>
      <Container>
        <Inner
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={verticalOffset}>
          {children}
          <Flexbox padding={10} direction="row" justify="flex-end">
            <TouchableOpacity
              testID="cancel-button-in-edit-modal"
              onPress={onClose}>
              <H5Bold>{Localized('CANCEL')}</H5Bold>
            </TouchableOpacity>
            <TouchableOpacity
              testID="save-button-in-edit-modal"
              style={{ marginStart: 16 }}
              onPress={onSave}>
              <H5Bold>{Localized('SAVE')}</H5Bold>
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
  verticalOffset: PropTypes.number,
};

export default EditModal;
