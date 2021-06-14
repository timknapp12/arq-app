import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Alert } from 'react-native';
import QLogoScreenContainer from './QLogoScreenContainer';
import { Flexbox, PrimaryButton, Label, Input, AlertText } from '../common';
import { DIRECT_SCALE_INFO } from '../../graphql/mutations';
import { handleGetDirectScaleInfo } from '../../utils/handleLoginFlow';
import { Localized } from '../../translations/Localized';
import LoginContext from '../../contexts/LoginContext';

const EnterIdScreen = ({ navigation }) => {
  const { setDirectScaleUser } = useContext(LoginContext);
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [getDirectScaleInfo] = useMutation(DIRECT_SCALE_INFO, {
    variables: { ambassaderOnly: true, userName: username },
    onCompleted: (data) => {
      console.log(`if data:`, data);
      const status = data?.directScaleInfo?.status;
      console.log(`status`, status);
      handleGetDirectScaleInfo(status, navigation, setErrorMessage, username);
      if (data.directScaleInfo.associate) {
        setDirectScaleUser(data.directScaleInfo.associate);
      }
    },
    onError: (error) => {
      console.log(`error.message`, error.message);
      setErrorMessage(error.message);
    },
  });

  const onSubmit = () => {
    if (!username) {
      return Alert.alert(Localized('Please enter your back office user id'));
    }
    // TODO - set real logic for handling errors
    if (username === 'Error') {
      return setErrorMessage('this is an error');
    }
    return getDirectScaleInfo();
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
