import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { useMutation } from '@apollo/client';
import { TouchableOpacity } from 'react-native';
import QLogoScreenContainer from './QLogoScreenContainer';
import { Flexbox, PrimaryButton, Input, Label, H4, AlertText } from '../common';
import { Localized } from '../../translations/Localized';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import AppContext from '../../contexts/AppContext';
import { CREATE_TEAM } from '../../graphql/mutations';

const Gap = styled.View`
  height: 20px;
`;

const CreateTeamScreen = ({ navigation }) => {
  const { associateId } = useContext(AppContext);
  console.log(`associateId`, associateId);
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
      console.log(`data`, data);
      if (data.newTeamAccess === false) {
        return setErrorMessage(
          Localized(
            'Sorry that team name has already been used - Please try another name',
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
    createTeam();
  };

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <QLogoScreenContainer>
      <Flexbox style={{ flex: 1, marginTop: 40 }} width="85%">
        <Flexbox align="flex-start">
          <Label>{Localized('Team Name')}</Label>
          <Input
            autoFocus
            testID="create-team-name-onboarding-input"
            value={teamName}
            onChangeText={(text) => {
              setErrorMessage('');
              setTeamName(text);
            }}
            returnKeyType="next"
            onSubmitEditing={onNext}
          />
          <Gap />
          <Label>{Localized('Team Access Code')}</Label>
          <Input
            testID="create-team-code-onboarding-input"
            value={accessCode}
            onChangeText={(text) => {
              setErrorMessage('');
              setAccessCode(text);
            }}
            ref={accessCodeRef}
            returnKeyType="go"
            onSubmitEditing={onSubmit}
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
              {Localized('CONTINUE')}
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
