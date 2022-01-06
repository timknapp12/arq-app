import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, View, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import EditModal from '../../editModal/EditModal';
import { Input, H5Black, H5Secondary, AlertText } from '../../common';
import { Localized } from '../../../translations/Localized';
import AppContext from '../../../contexts/AppContext';
import { CREATE_TEAM } from '../../../graphql/mutations';
import { GET_USERS_ACCESS_CODES } from '../../../graphql/queries';

const AccessCodeModal = ({
  visible,
  onClose,
  onSave,
  teamName,
  setTeamName,
  accessCode,
  setAccessCode,
  isNew,
  isError,
  setIsError,
  setSelectedTeamName = () => {},
}) => {
  const { associateId } = useContext(AppContext);

  const [createTeam] = useMutation(CREATE_TEAM, {
    variables: {
      associateId,
      teamName,
      accessCode,
      folderName: 'My Team Folder',
    },
    refetchQueries: [
      { query: GET_USERS_ACCESS_CODES, variables: { associateId } },
    ],
    onCompleted: async (data) => {
      if (data.newTeamAccess === false) {
        return setIsError(true);
      } else {
        await setSelectedTeamName(teamName);
        setTeamName('');
        setAccessCode('');
        return onClose();
      }
    },
    onError: () => setIsError(true),
  });

  const onCreate = () => {
    if (teamName.length < 4 || teamName.length > 20) {
      return Alert.alert(
        Localized('Team name must be between 4-20 characters'),
      );
    }
    if (accessCode.length < 4 || accessCode.length > 20) {
      return Alert.alert(
        Localized('Access code must be between 4-20 characters'),
      );
    }
    createTeam();
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
    ? Localized(
        `Sorry that team name or access code has already been used - Please try again`,
      )
    : Localized(`The team name or code does not exist - Please try again`);

  return (
    <EditModal
      visible={visible}
      onClose={onCancel}
      onSave={isNew ? onCreate : onSave}
    >
      <H5Black style={{ textAlign: 'center' }}>{header}</H5Black>
      <H5Secondary style={{ marginTop: 8, marginBottom: 8 }}>
        {instructions}
      </H5Secondary>
      <Input
        label={Localized(`Team Name`)}
        autoFocus
        testID="access-code-team-name-input"
        value={teamName}
        onChangeText={(text) => {
          setIsError(false);
          setTeamName(text);
        }}
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
        maxLength={20}
      />
      <Input
        style={{ marginTop: 8 }}
        label={Localized(`Team Access Code`)}
        testID="access-code-input"
        value={accessCode}
        onChangeText={(text) => {
          setIsError(false);
          setAccessCode(text);
        }}
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
        maxLength={20}
      />
      <View>
        {isError && (
          <AlertText style={{ textAlign: 'center' }}>{errorMessage}</AlertText>
        )}
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
  isError: PropTypes.bool,
  setIsError: PropTypes.func,
  setSelectedTeamName: PropTypes.func,
};

export default AccessCodeModal;
