import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AnimatedInput, AlertText } from '../common';
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
  const [isError, setIsError] = useState(false);
  // TODO wire up a mutation
  const onSave = () => {
    if (value.length === 0) {
      return setIsError(true);
    }
    setIsError(false);
    setIsUsernameEditModalOpen(false);
  };
  const onClose = () => {
    onChangeText(initialValue);
    setIsError(false);
    setIsUsernameEditModalOpen(false);
  };

  useEffect(() => {
    if (value.length === 0) {
      return setIsError(true);
    } else {
      setIsError(false);
    }
    return () => {
      setIsError(false);
    };
  }, [value]);

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
        validationError={isError}
      />
      {isError && <AlertText>{Localized('Please add a username')}</AlertText>}
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
