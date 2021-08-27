import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { useMutation } from '@apollo/client';
import { Alert, TouchableOpacity } from 'react-native';
import QLogoScreenContainer from './QLogoScreenContainer';
import { Flexbox, PrimaryButton, Input, H4, AlertText } from '../common';
import { Localized } from '../../translations/Localized';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import AppContext from '../../contexts/AppContext';
import { CREATE_TEAM } from '../../graphql/mutations';

const Gap = styled.View`
  height: 20px;
`;

const CreateTeamScreen = ({ navigation }) => {
  const { associateId } = useContext(AppContext);
  const [teamName, setTeamName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [createTeam, { loading }] = useMutation(CREATE_TEAM, {
    variables: {
      associateId,
      teamName,
      accessCode,
      folderName: 'My Team Folder',
    },
    onCompleted: (data) => {
      if (data.newTeamAccess === false) {
        return setErrorMessage(
          Localized(
            'Sorry that team name or access code has already been used - Please try again',
          ),
        );
      } else {
        navigation.navigate('App Stack');
      }
    },
    onError: (error) => setErrorMessage(error.message),
  });

  const accessCodeRef = useRef(null);

  const onNext = () => {
    accessCodeRef.current.focus();
  };
  const onSkip = () => navigation.navigate('App Stack');
  const onSubmit = () => {
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

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <QLogoScreenContainer>
      <Flexbox style={{ flex: 1, marginTop: 40 }} width="85%">
        <Flexbox align="flex-start">
          <Input
            label={Localized('Team Name')}
            autoFocus
            testID="create-team-name-onboarding-input"
            value={teamName}
            onChangeText={(text) => {
              setErrorMessage('');
              setTeamName(text);
            }}
            returnKeyType="next"
            onSubmitEditing={onNext}
            maxLength={20}
          />
          <Gap />
          <Input
            label={Localized('Team Access Code')}
            testID="create-team-code-onboarding-input"
            value={accessCode}
            onChangeText={(text) => {
              setErrorMessage('');
              setAccessCode(text);
            }}
            ref={accessCodeRef}
            returnKeyType="go"
            onSubmitEditing={onSubmit}
            maxLength={20}
          />
          {errorMessage ? (
            <Flexbox>
              <AlertText
                style={{
                  textAlign: 'center',
                }}>
                {errorMessage}
              </AlertText>
            </Flexbox>
          ) : null}
        </Flexbox>
        <Flexbox>
          <TouchableOpacity style={{ padding: 12 }} onPress={onSkip}>
            <H4>{Localized('Skip')}</H4>
          </TouchableOpacity>
          <Flexbox width="85%" height="60px">
            <PrimaryButton onPress={onSubmit}>
              {Localized('Continue').toUpperCase()}
            </PrimaryButton>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </QLogoScreenContainer>
  );
};

CreateTeamScreen.propTypes = {
  navigation: PropTypes.object,
};

export default CreateTeamScreen;
