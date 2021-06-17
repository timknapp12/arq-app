import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Platform, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Flexbox, PrimaryButton, H4, Checkbox } from '../common';
import FaceIDIcon from '../../../assets/icons/face-id.svg';
import TouchIDIcon from '../../../assets/icons/touch-id.svg';
import QLogoScreenContainer from './QLogoScreenContainer';
import { Localized } from '../../translations/Localized';
import AppContext from '../../contexts/AppContext';

const BiometricsScreen = ({ navigation }) => {
  const { theme, storeBiometrics } = useContext(AppContext);
  const [enableBiometrics, setEnableBiometrics] = useState(true);
  const label = Localized(
    Platform.OS === 'ios' ? 'Sign in with Face ID' : 'Sign in with Fingerprint',
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
      // Authenticate user
      // the authenticate method below is used in LoginScreen.js
      // await LocalAuthentication.authenticateAsync();

      Alert.alert(Localized('Face ID/Fingerprint is enabled!'));
    } catch (error) {
      Alert.alert(Localized('An error as occured'), error?.message);
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
  // TODO - find out from backend the highest rank and navigate to next screen accordingly
  const onSubmit = () => {
    // this sets the biometrics in App.js at the root of the project
    storeBiometrics(enableBiometrics);
    navigation.navigate('Create Team Screen');
  };

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
            onPress={onToggleBiometrics}>
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
            {Localized('CONTINUE')}
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
