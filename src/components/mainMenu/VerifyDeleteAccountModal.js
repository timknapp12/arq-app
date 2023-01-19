import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {
  Flexbox,
  H5Heavy,
  CloseIcon,
  H4Book,
  LoadingSpinner,
  AlertText,
} from '../common';
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

const SaveButton = styled.TouchableOpacity`
  opacity: ${(props) => (props.disabled ? 0.35 : 0.83)};
`;

const VerifyDeleteAccount = ({
  visible,
  onClose,
  onConfirm,
  deleteAccountError,
}) => {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const confirmDelete = async () => {
    setIsLoadingDelete(true);
    await onConfirm();
    setIsLoadingDelete(false);
    onClose();
  };

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
            testID="close-delete-account-modal-button"
            style={{ width: 24, paddingTop: 8, paddingBottom: 8 }}
            onPress={onClose}
          >
            <CloseIcon />
          </TouchableOpacity>
          <Flexbox padding={12} style={{ minHeight: 160 }} justify="center">
            {!isLoadingDelete ? (
              <H4Book>
                {Localized(
                  'Are you sure you want to permanently delete your account?',
                )}
              </H4Book>
            ) : (
              <LoadingSpinner />
            )}
          </Flexbox>
          {deleteAccountError !== '' && (
            <Flexbox>
              <AlertText>{deleteAccountError}</AlertText>
            </Flexbox>
          )}
          <Flexbox padding={10} direction="row" justify="flex-end">
            <SaveButton
              testID="cancel-button-in-delete-account-modal"
              onPress={onClose}
              disabled={isLoadingDelete}
            >
              <H5Heavy>{Localized('No').toUpperCase()}</H5Heavy>
            </SaveButton>
            <SaveButton
              testID="save-button-in-delete
              -account-modal"
              style={{ marginStart: 16 }}
              onPress={confirmDelete}
              disabled={isLoadingDelete}
            >
              <H5Heavy>{Localized('Yes').toUpperCase()}</H5Heavy>
            </SaveButton>
          </Flexbox>
        </Inner>
      </Container>
    </Modal>
  );
};

VerifyDeleteAccount.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  deleteAccountError: PropTypes.string.isRequired,
};

export default VerifyDeleteAccount;
