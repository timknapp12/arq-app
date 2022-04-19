import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Alert } from 'react-native';
import QLogoScreenContainer from './QLogoScreenContainer';
import {
  Flexbox,
  PrimaryButton,
  Input,
  AlertText,
  LoadingSpinner,
} from '../common';
import { DIRECT_SCALE_INFO } from '../../graphql/mutations';
import { handleGetDirectScaleInfo } from '../../utils/handleLoginFlow';
import { getToken } from '../../utils/firebase/login';
import { Localized } from '../../translations/Localized';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';

const EnterIdScreen = ({ navigation }) => {
  const { setToken, setAssociateId, setLegacyId } = useContext(AppContext);
  const { setDirectScaleUser } = useContext(LoginContext);
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [getDirectScaleInfo, { loading }] = useMutation(DIRECT_SCALE_INFO, {
    variables: { ambassadorOnly: true, userName: username },
    onCompleted: (data) => {
      const status = data?.directScaleInfo?.status;
      handleGetDirectScaleInfo(status, navigation, setErrorMessage, username);
      if (data.directScaleInfo.associate) {
        setDirectScaleUser(data.directScaleInfo.associate);
        const id = data.directScaleInfo.associate.associateId;
        setAssociateId(id);
        const legacyId = data.directScaleInfo.associate.legacyAssociateId;
        setLegacyId(legacyId);
      }
    },
    onError: (error) => {
      console.log(`error.message`, error.message);
      setErrorMessage(error.message);
    },
  });

  const onSubmit = async () => {
    await getToken(setToken);
    if (!username) {
      return Alert.alert(
        Localized('Please enter your back office username or id'),
      );
    }
    // TODO - set real logic for handling errors
    if (username === 'Error') {
      return setErrorMessage('this is an error');
    }
    return getDirectScaleInfo();
  };

  return (
    <QLogoScreenContainer>
      {loading ? (
        <LoadingSpinner style={{ marginTop: 80 }} size="large" />
      ) : (
        <Flexbox style={{ flex: 1, marginTop: 40 }} width="85%">
          <Flexbox width="100%" align="flex-start">
            <Input
              label={Localized('Back Office Username or Id')}
              autoFocus
              testID="enter-username-input"
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
                  }}
                >
                  {errorMessage}
                </AlertText>
              </Flexbox>
            ) : null}
          </Flexbox>
          <Flexbox width="85%" height="60px">
            <PrimaryButton disabled={!username} onPress={onSubmit}>
              {Localized('Continue').toUpperCase()}
            </PrimaryButton>
          </Flexbox>
        </Flexbox>
      )}
    </QLogoScreenContainer>
  );
};

EnterIdScreen.propTypes = {
  navigation: PropTypes.object,
};

export default EnterIdScreen;
