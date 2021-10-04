import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import * as LocalAuthentication from 'expo-local-authentication';
import { TouchableOpacity, Platform, Alert, Keyboard } from 'react-native';
import { Flexbox, PrimaryButton, H4, Checkbox } from '../common';
import FaceIDIcon from '../../../assets/icons/face-id.svg';
import TouchIDIcon from '../../../assets/icons/touch-id.svg';
import QLogoScreenContainer from './QLogoScreenContainer';
import { Localized } from '../../translations/Localized';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import { GET_USERS_ACCESS_CODES } from '../../graphql/queries';

const BiometricsScreen = ({ navigation }) => {
  const { theme, hasPermissions, associateId } = useContext(AppContext);
  const { storeBiometrics } = useContext(LoginContext);
  const [enableBiometrics, setEnableBiometrics] = useState(true);
  const label = Localized(
    Platform.OS === 'ios' ? 'Sign in with Face ID' : 'Sign in with Fingerprint',
  );

  // if the user uses textContentType="oneTimeCode" on ios on previous screen (VerificationCodeScreen.js) then the keyboard is automatically pulled up on this screen and it is not necessary
  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const { loading, data } = useQuery(GET_USERS_ACCESS_CODES, {
    variables: { associateId },
    onError: (error) => console.log(`error in get access codes`, error),
  });

  const alreadyHasTeam = data?.accesses.some(
    (team) => team?.teamOwnerAssociateId === associateId,
  );

  // source: https://medium.com/swlh/how-to-use-face-id-with-react-native-or-expo-134231a25fe4
  // https://docs.expo.io/versions/latest/sdk/local-authentication/
  const onFaceID = async () => {
    try {
      // Checking if device is compatible
      const isCompatible = await LocalAuthentication.hasHardwareAsync();

      if (!isCompatible) {
        setEnableBiometrics(false);
        throw new Error(Localized("Your device isn't compatible"));
      }

      // Checking if device has biometrics records
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        setEnableBiometrics(false);
        throw new Error(Localized('No Faces / Fingers found'));
      }
    } catch (error) {
      Alert.alert(Localized('An error has occured'), error?.message);
    }
  };

  const onToggleBiometrics = () => {
    if (enableBiometrics) {
      setEnableBiometrics(false);
    } else {
      setEnableBiometrics(true);
    }
  };

  useEffect(() => {
    if (enableBiometrics) {
      onFaceID();
    }
  }, [enableBiometrics]);

  const onSubmit = async () => {
    if (enableBiometrics && Platform.OS === 'ios') {
      // the authenticate method below is used in LoginScreen.js, but here it is just used to trigger the permissions dialogue for FaceID for iOS
      await LocalAuthentication.authenticateAsync();
    }
    // this sets the biometrics in App.js at the root of the project
    storeBiometrics(enableBiometrics);
    // if the user has ever been ruby or above AND if they have not already created a team then they can create a team, otherwise we don't let them go to that screen
    hasPermissions && !alreadyHasTeam
      ? navigation.navigate('Create Team Screen')
      : navigation.navigate('App Stack');
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <QLogoScreenContainer>
      <Flexbox style={{ flex: 1, marginTop: 40 }} width="85%">
        <Flexbox>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 24,
            }}
            testID="use-biometrics-checkbox"
            onPress={onToggleBiometrics}
          >
            <Checkbox selected={enableBiometrics} />
            <H4 style={{ marginStart: 8 }}>{label}</H4>
          </TouchableOpacity>
          {Platform.OS === 'ios' ? (
            <FaceIDIcon fill={theme.primaryTextColor} />
          ) : (
            <TouchIDIcon fill={theme.primaryTextColor} />
          )}
        </Flexbox>
        <Flexbox width="85%" height="60px">
          <PrimaryButton onPress={onSubmit}>
            {Localized('Continue').toUpperCase()}
          </PrimaryButton>
        </Flexbox>
      </Flexbox>
    </QLogoScreenContainer>
  );
};

BiometricsScreen.propTypes = {
  navigation: PropTypes.object,
};

export default BiometricsScreen;
