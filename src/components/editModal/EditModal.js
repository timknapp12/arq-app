import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Flexbox, H5Heavy } from '../common';
import { Modal, Platform } from 'react-native';
import { Localized } from '../../translations/Localized';

const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.modalBackgroundColor};
  flex: 1;
`;
const Inner = styled.KeyboardAvoidingView`
  width: 80%;
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 20px 20px 0px 20px;
  box-shadow: 0px 24px 12px rgba(0, 0, 0, 0.5);
`;

const SaveButton = styled.TouchableOpacity`
  opacity: ${(props) => (props.disabled ? 0.35 : 0.83)};
`;

const EditModal = ({
  visible,
  onClose,
  children,
  onSave,
  saveButtonDisabled,
  verticalOffset = 60,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}>
      <Container>
        <Inner
          contentContainerStyle={{ width: '100%' }}
          keyboardVerticalOffset={verticalOffset}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          {children}
          <Flexbox padding={10} direction="row" justify="flex-end">
            <SaveButton testID="cancel-button-in-edit-modal" onPress={onClose}>
              <H5Heavy>{Localized('Cancel').toUpperCase()}</H5Heavy>
            </SaveButton>
            <SaveButton
              testID="save-button-in-edit-modal"
              style={{ marginStart: 16 }}
              disabled={saveButtonDisabled}
              onPress={onSave}>
              <H5Heavy>{Localized('Save').toUpperCase()}</H5Heavy>
            </SaveButton>
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
  saveButtonDisabled: PropTypes.bool,
  verticalOffset: PropTypes.number,
};

export default EditModal;
