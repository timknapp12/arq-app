import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Alert, TouchableOpacity } from 'react-native';
import { useMutation } from '@apollo/client';
import {
  Flexbox,
  PrimaryButton,
  Input,
  Label,
  AlertText,
  Link,
} from '../common';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import AppContext from '../../contexts/AppContext';
import QLogoScreenContainer from './QLogoScreenContainer';
import { Localized } from '../../translations/Localized';
import {
  LOGIN_VALIDATION_PROCESS,
  CONFIRM_ACCESS_CODE,
} from '../../graphql/mutations';
import {
  handleLoginValidationProcess,
  handleConfirmAccessCode,
} from '../../utils/handleLoginFlow';
import { getToken } from '../../utils/firebase/login';

const VerificationCodeScreen = ({ navigation, route }) => {
  const { setLegacyId, setToken } = useContext(AppContext);

  const { method, username, verificationInfo } = route.params;

  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [confirmAccessCode, { loading }] = useMutation(CONFIRM_ACCESS_CODE, {
    variables: { loginName: username, accessCode: code },
    onError: (error) => setErrorMessage(error.message),
    onCompleted: (data) => {
      console.log(`data`, data);
      const status = data?.loginValidationToken.status;
      if (data.loginValidationToken.associate) {
        const legacyId = data.loginValidationToken.associate.legacyAssociateId;
        setLegacyId(legacyId);
      }
      handleConfirmAccessCode(status, navigation, setErrorMessage);
    },
  });

  // this is if the user needs a new access token sent
  const [validateUser, { loading: loadingValidation }] = useMutation(
    LOGIN_VALIDATION_PROCESS,
    {
      variables: {
        method: method,
        loginName: username,
        verificationInfo: verificationInfo,
      },
      onError: (error) => setErrorMessage(error.message),
      onCompleted: (data) => {
        console.log(`data`, data);
        const status = data?.loginValidationProcess.status;
        console.log(`status`, status);
        if (data.loginValidationProcess.associate) {
          const legacyId =
            data.loginValidationProcess.associate.legacyAssociateId;
          setLegacyId(legacyId);
        }
        handleLoginValidationProcess(
          status,
          navigation,
          method,
          username,
          verificationInfo,
          setErrorMessage,
        );
      },
    },
  );

  const onSubmit = async () => {
    await getToken(setToken);
    if (!code) {
      return Alert.alert(Localized('Please enter a verification code'));
    }
    confirmAccessCode();
  };

  if (loading || loadingValidation) {
    return <LoadingScreen />;
  }
  return (
    <QLogoScreenContainer>
      <Flexbox style={{ flex: 1, marginTop: 40 }} width="85%">
        <Flexbox align="flex-start">
          <Label>{Localized('Verification Code')}</Label>
          <Input
            autoFocus
            testID="verification-code-input"
            value={code}
            onChangeText={(text) => {
              setErrorMessage('');
              setCode(text);
            }}
            textContentType="oneTimeCode"
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
              <TouchableOpacity
                onPress={() => {
                  setCode('');
                  setErrorMessage('');
                  validateUser();
                }}>
                <Link>{Localized('Resend code')}</Link>
              </TouchableOpacity>
            </Flexbox>
          ) : null}
        </Flexbox>
        <Flexbox width="85%" height="60px">
          <PrimaryButton disabled={!code} onPress={onSubmit}>
            {Localized('CONTINUE')}
          </PrimaryButton>
        </Flexbox>
      </Flexbox>
    </QLogoScreenContainer>
  );
};

VerificationCodeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default VerificationCodeScreen;
