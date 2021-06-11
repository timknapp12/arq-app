import React, { useState } from 'react';
import PropTypes from 'prop-types';
import QLogoScreenContainer from './QLogoScreenContainer';
import { Flexbox, PrimaryButton, Label, Input, AlertText } from '../common';
import { Localized } from '../../translations/Localized';
import { Alert } from 'react-native';

const EnterIdScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = () => {
    if (!username) {
      return Alert.alert(Localized('Please enter your back office user id'));
    }
    // TODO - set real logic for handling errors
    if (username === 'Error') {
      return setErrorMessage('this is an error');
    }
    return navigation.navigate('Confirm Account Screen');
  };

  return (
    <QLogoScreenContainer>
      <Flexbox style={{ flex: 1, marginTop: 40 }} width="85%">
        <Flexbox width="100%" align="flex-start">
          <Label>{Localized('Back Office User ID')}</Label>
          <Input
            autoFocus
            testID="enter-username-input"
            label={Localized('Display Name')}
            value={username}
            onChangeText={(text) => {
              setErrorMessage('');
              setUsername(text);
            }}
            textContentType="nickname"
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
        <Flexbox width="85%" height="60px">
          <PrimaryButton disabled={!username} onPress={onSubmit}>
            {Localized('CONTINUE')}
          </PrimaryButton>
        </Flexbox>
      </Flexbox>
    </QLogoScreenContainer>
  );
};

EnterIdScreen.propTypes = {
  navigation: PropTypes.object,
};

export default EnterIdScreen;
