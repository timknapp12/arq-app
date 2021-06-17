import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import QLogoScreenContainer from './QLogoScreenContainer';
import { Flexbox, PrimaryButton, Input, Label, H4 } from '../common';
import { Localized } from '../../translations/Localized';

const Gap = styled.View`
  height: 20px;
`;

const CreateTeamScreen = ({ navigation }) => {
  const [teamName, setTeamName] = useState('');
  const [accessCode, setAccessCode] = useState('');

  const accessCodeRef = useRef(null);

  const onNext = () => {
    accessCodeRef.current.focus();
  };
  const onSkip = () => navigation.navigate('App Stack');
  const onSubmit = () => navigation.navigate('App Stack');
  return (
    <QLogoScreenContainer>
      <Flexbox style={{ flex: 1, marginTop: 40 }} width="85%">
        <Flexbox align="flex-start">
          <Label>{Localized('Team Name')}</Label>
          <Input
            autoFocus
            testID="create-team-name-onboarding-input"
            value={teamName}
            onChangeText={(text) => setTeamName(text)}
            returnKeyType="next"
            onSubmitEditing={onNext}
          />
          <Gap />
          <Label>{Localized('Team Access Code')}</Label>
          <Input
            testID="create-team-code-onboarding-input"
            value={accessCode}
            onChangeText={(text) => setAccessCode(text)}
            ref={accessCodeRef}
            returnKeyType="go"
            onSubmitEditing={onSubmit}
          />
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
