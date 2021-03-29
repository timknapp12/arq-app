import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Alert, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Flexbox, Input } from '../common';
import EditModal from '../editModal/EditModal';
import { Localized, initLanguage } from '../../translations/Localized';

const Label = styled.Text`
  font-size: 16px;
  font-family: 'Roboto-Regular';
  color: ${(props) => props.theme.secondaryTextColor};
`;
// regex: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
const pattern = new RegExp('^(?=.*?[A-Z])(?=.*?[0-9]).{8,25}$');
const PasswordEditModal = ({ setIsPasswordEditModalOpen, visible }) => {
  initLanguage();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isCurrentPasswordError, setIsCurrentPasswordError] = useState(false);
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
  const [isNewPasswordError, setIsNewPasswordError] = useState(false);
  const firstPasswordRef = useRef(null);
  const secondPasswordRef = useRef(null);

  const onNext = () => {
    firstPasswordRef.current.focus();
  };
  const onSecondNext = () => {
    secondPasswordRef.current.focus();
  };
  // TODO wire up a mutation
  const onSave = () => {
    if (currentPassword.length === 0) {
      setIsCurrentPasswordError(true);
      Alert.alert(Localized('Please enter current password'));
      return false;
    }
    if (newPassword !== confirmNewPassword) {
      setIsNewPasswordError(true);
      setIsConfirmPasswordError(true);
      Alert.alert(
        Localized(`Passwords don't match. Please confirm new password`),
      );
      return false;
    }
    if (!pattern.test(newPassword)) {
      setIsNewPasswordError(true);
      setIsConfirmPasswordError(true);
      Alert.alert(
        Localized(
          'Password should contain at least one number and one uppercase character and be between 8-25 in characters',
        ),
      );
      return false;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setIsCurrentPasswordError(false);
    setIsNewPasswordError(false);
    setIsConfirmPasswordError(false);
    setIsPasswordEditModalOpen(false);
  };
  const onClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setIsCurrentPasswordError(false);
    setIsNewPasswordError(false);
    setIsConfirmPasswordError(false);
    setIsPasswordEditModalOpen(false);
  };
  return (
    <EditModal
      onClose={onClose}
      visible={visible}
      onSave={onSave}
      verticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <Flexbox align="flex-start" style={{ marginBottom: 8 }}>
        <Label>{Localized('Current Password')}</Label>
        <Input
          autoFocus
          testID="current-password-input-password-modal"
          value={currentPassword}
          onChangeText={(text) => {
            setIsCurrentPasswordError(false);
            setCurrentPassword(text);
          }}
          textContentType="password"
          returnKeyType="next"
          onSubmitEditing={onNext}
          validationError={isCurrentPasswordError}
        />
      </Flexbox>
      <Flexbox align="flex-start" style={{ marginBottom: 8 }}>
        <Label>{Localized('New Password')}</Label>
        <Input
          testID="new-password-input-password-modal"
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          ref={firstPasswordRef}
          textContentType="password"
          returnKeyType="next"
          onSubmitEditing={onSecondNext}
          validationError={isNewPasswordError}
        />
      </Flexbox>
      <Flexbox align="flex-start">
        <Label>{Localized('Confirm New Password')}</Label>
        <Input
          testID="confirm-new-password-input-password-modal"
          value={confirmNewPassword}
          onChangeText={(text) => setConfirmNewPassword(text)}
          ref={secondPasswordRef}
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={onSave}
          validationError={isConfirmPasswordError}
        />
      </Flexbox>
    </EditModal>
  );
};

PasswordEditModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setIsPasswordEditModalOpen: PropTypes.func.isRequired,
};

export default PasswordEditModal;
