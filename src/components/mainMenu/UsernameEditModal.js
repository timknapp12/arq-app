import React from 'react';
import PropTypes from 'prop-types';
import { AnimatedInput } from '../common';
import EditModal from '../editModal/EditModal';

const UsernameEditModal = ({
  value,
  initialValue,
  onChangeText,
  setIsUsernameEditModalOpen,
  visible,
}) => {
  // TODO wire up a mutation
  const onSave = () => {
    console.log('save this info');
    setIsUsernameEditModalOpen(false);
  };
  const onClose = () => {
    onChangeText(initialValue);
    setIsUsernameEditModalOpen(false);
  };
  return (
    <EditModal onClose={onClose} visible={visible} onSave={onSave}>
      <AnimatedInput
        onChangeText={onChangeText}
        label="Username"
        value={value}
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
