import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import EditModal from '../../editModal/EditModal';
import { Label, Input, H5Black, H5Secondary, AlertText } from '../../common';
import { Localized } from '../../../translations/Localized';

const AccessCodeModal = ({
  visible,
  onClose,
  onSave,
  value,
  onChangeText,
  isNew,
}) => {
  const [isError, setIsError] = useState(false);

  const onSubmit = () => {
    // TODO : wire up mutation to check if access code is valid
    if (value === 'Test') {
      return setIsError(true);
    } else {
      onChangeText('');
      setIsError(false);
      return onSave();
    }
  };

  const onCancel = () => {
    onChangeText('');
    setIsError(false);
    onClose();
  };

  const header = isNew
    ? Localized(`Create Team Access Code`)
    : Localized(`Add Team Access Code`);

  const instructions = isNew
    ? Localized(
        `Create a team access code to share resources with your team members. An access code can be 1-20 characters in length.`,
      )
    : Localized(
        `A team access code allows you to view, download, and share team resources. If you don't have a team access code you can get one from your leader.`,
      );

  const errorMessage = isNew
    ? Localized(`This code is not available. Please try again.`)
    : Localized(`This code does not exist. Please try again.`);

  return (
    <EditModal visible={visible} onClose={onCancel} onSave={onSubmit}>
      <H5Black style={{ textAlign: 'center' }}>{header}</H5Black>
      <H5Secondary style={{ marginTop: 8, marginBottom: 8 }}>
        {instructions}
      </H5Secondary>
      <Label>{Localized(`Team Access Code`)}</Label>
      <Input
        autoFocus
        testID="access-code-input"
        value={value}
        onChangeText={(text) => {
          setIsError(false);
          onChangeText(text);
        }}
        returnKeyType="go"
        onSubmitEditing={onSubmit}
        maxLength={20}
      />
      <View style={{ height: 20 }}>
        {isError && <AlertText>{errorMessage}</AlertText>}
      </View>
    </EditModal>
  );
};

AccessCodeModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  isNew: PropTypes.bool,
};

export default AccessCodeModal;
