import React from 'react';
import PropTypes from 'prop-types';
import { AnimatedInput } from '../common';
import { Platform } from 'react-native';
import EditModal from '../editModal/EditModal';
import { Localized, initLanguage } from '../../translations/Localized';

const UsernameEditModal = ({
  value,
  initialValue,
  onChangeText,
  setIsUsernameEditModalOpen,
  visible,
}) => {
  initLanguage();
  // TODO wire up a mutation
  const onSave = () => {
    setIsUsernameEditModalOpen(false);
  };
  const onClose = () => {
    onChangeText(initialValue);
    setIsUsernameEditModalOpen(false);
  };
  return (
    <EditModal
      onClose={onClose}
      visible={visible}
      onSave={onSave}
      verticalOffset={Platform.OS === 'ios' ? 20 : 0}>
      <AnimatedInput
        autoFocus
        testID="username-input-edit-modal"
        onChangeText={onChangeText}
        label={Localized('Username')}
        value={value}
        returnKeyType="go"
        onSubmitEditing={onSave}
      />
    </EditModal>
  );
};

UsernameEditModal.propTypes = {
  value: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  setIsUsernameEditModalOpen: PropTypes.func.isRequired,
};

export default UsernameEditModal;
