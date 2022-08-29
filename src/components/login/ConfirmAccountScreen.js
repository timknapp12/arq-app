import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useMutation } from '@apollo/client';
import QLogoScreenContainer from './QLogoScreenContainer';
import {
  Flexbox,
  RadioButton,
  PrimaryButton,
  H4Book,
  AlertText,
  Gap,
} from '../common';
import { Localized } from '../../translations/Localized';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import LoginContext from '../../contexts/LoginContext';
import AppContext from '../../contexts/AppContext';
import {
  encodeEmail,
  encodePhone,
} from '../../utils/encodeCredentials/encodeCredentials';
import { LOGIN_VALIDATION_PROCESS } from '../../graphql/mutations';
import { handleLoginValidationProcess } from '../../utils/handleLoginFlow';

const { height } = Dimensions.get('window');

const ConfirmAccountScreen = ({ navigation, route }) => {
  const { setAssociateId, setLegacyId, deviceLanguage } =
    useContext(AppContext);
  const { directScaleUser } = useContext(LoginContext);
  const { emailAddress, primaryPhoneNumber } = directScaleUser;

  const { username } = route.params;

  const [selectedOption, setSelectedOption] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // this strips out the parantheses and hyphens from the phone numbers but leaves the plus sign for country codes
  const phoneRegex = new RegExp(/[^0-9 +]+/g);

  const method = selectedOption === 'email' ? 'EMAIL' : 'SMS';

  const verificationInfo =
    selectedOption === 'email'
      ? emailAddress
      : primaryPhoneNumber.replace(phoneRegex, '');

  const [validateUser, { loading }] = useMutation(LOGIN_VALIDATION_PROCESS, {
    variables: {
      method: method,
      loginName: username,
      verificationInfo: verificationInfo,
      language: deviceLanguage,
    },
    onError: (error) => setErrorMessage(error.message),
    onCompleted: (data) => {
      const status = data?.loginValidationProcess.status;
      if (data.loginValidationProcess.associate) {
        const id = data.loginValidationProcess.associate.associateId;
        setAssociateId(id);
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
  });

  const isButtonDisabled = selectedOption === null;

  const onSubmit = () => {
    validateUser();
  };

  const qLogoHeight = 108;

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: '100%' }}
      contentContainerStyle={{ height: '100%', width: '100%' }}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <QLogoScreenContainer>
        <ScrollView
          contentContainerStyle={{
            height: height - qLogoHeight,
            paddingBottom: 140,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          style={{
            width: '100%',
            marginTop: 12,
          }}
        >
          <Flexbox
            onStartShouldSetResponder={() => true}
            height="90%"
            width="85%"
          >
            <Flexbox onStartShouldSetResponder={() => true} align="flex-start">
              <H4Book>{Localized('Back Office Username or Id')}</H4Book>
              <H4Book>{username}</H4Book>
              {primaryPhoneNumber ? (
                <>
                  <Gap />
                  <RadioButton
                    label={`${Localized(
                      'Send verification code to phone number',
                    )} ${encodePhone(primaryPhoneNumber)}`}
                    isSelected={selectedOption === 'phone'}
                    onPress={() => setSelectedOption('phone')}
                  />
                </>
              ) : null}
              {emailAddress ? (
                <>
                  <Gap />
                  <RadioButton
                    label={`${Localized(
                      'Send verification code to email address',
                    )} ${encodeEmail(emailAddress)}`}
                    isSelected={selectedOption === 'email'}
                    onPress={() => setSelectedOption('email')}
                  />
                </>
              ) : null}
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
              <PrimaryButton disabled={isButtonDisabled} onPress={onSubmit}>
                {Localized('Continue').toUpperCase()}
              </PrimaryButton>
            </Flexbox>
          </Flexbox>
        </ScrollView>
      </QLogoScreenContainer>
    </KeyboardAvoidingView>
  );
};

ConfirmAccountScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default ConfirmAccountScreen;
