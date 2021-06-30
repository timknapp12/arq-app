import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, View } from 'react-native';
import EditModal from '../../editModal/EditModal';
import { Label, Input, H5Black, H5Secondary, AlertText } from '../../common';
import { Localized } from '../../../translations/Localized';

const AccessCodeModal = ({
  visible,
  onClose,
  onSave,
  teamName,
  setTeamName,
  accessCode,
  setAccessCode,
  isNew,
}) => {
  const [isError, setIsError] = useState(false);

  const onSubmit = () => {
    // TODO : wire up mutation to check if access code is valid
    if (accessCode === 'Test') {
      return setIsError(true);
    } else {
      setTeamName('');
      setAccessCode('');
      setIsError(false);
      return onSave();
    }
  };

  const onCancel = () => {
    setTeamName('');
    setAccessCode('');
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
      <Label>{Localized(`Team Name`)}</Label>
      <Input
        autoFocus
        testID="access-code-team-name-input"
        value={teamName}
        onChangeText={(text) => {
          setIsError(false);
          setTeamName(text);
        }}
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss()}
        maxLength={20}
      />
      <Label style={{ marginTop: 8 }}>{Localized(`Team Access Code`)}</Label>
      <Input
        testID="access-code-input"
        value={accessCode}
        onChangeText={(text) => {
          setIsError(false);
          setAccessCode(text);
        }}
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss()}
        maxLength={20}
      />
      <View style={{ height: 20 }}>
        {isError && <AlertText>{errorMessage}</AlertText>}
      </View>
    </EditModal>
  );
};

AccessCodeModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  teamName: PropTypes.string.isRequired,
  setTeamName: PropTypes.func.isRequired,
  accessCode: PropTypes.string.isRequired,
  setAccessCode: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
};

export default AccessCodeModal;
