import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { Flexbox, Input } from '../common';
import EditModal from '../editModal/EditModal';
import { Localized, initLanguage } from '../../translations/Localized';

const Label = styled.Text`
  font-size: 16px;
  font-family: 'Roboto-Regular';
  color: ${(props) => props.theme.secondaryTextColor};
`;

const PasswordEditModal = ({ setIsPasswordEditModalOpen, visible }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  initLanguage();
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
    setIsPasswordEditModalOpen(false);
  };
  const onClose = () => {
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
          onChangeText={(text) => setCurrentPassword(text)}
          textContentType="password"
          returnKeyType="next"
          onSubmitEditing={onNext}
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
