import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  Alert,
} from 'react-native';
import {
  ScreenContainer,
  Flexbox,
  CloseIcon,
  Header,
  PrimaryButton,
  Switch,
  Subheader,
  H5Heavy,
  H3,
  H5,
  H5Secondary,
} from '../common';
import { Localized, initLanguage } from '../../translations/Localized';
import AppContext from '../../contexts/AppContext';

const HeaderButtonContainer = styled.View`
  width: 60px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px;
  position: relative;
`;

const Divider = styled.View`
  width: 100%;
  height: 4px;
  background-color: ${(props) => props.theme.subheaderBackgroundColor};
  margin: 40px 0px;
`;

const SettingsModal = ({ setIsSettingsModalOpen, isSettingsModalOpen }) => {
  initLanguage();
  const { storeBiometrics, useBiometrics, signOutOfFirebase } =
    useContext(AppContext);
  const user = firebase.auth().currentUser;
  const email = user?.email;

  const navigation = useNavigation();
  const signOut = () => {
    signOutOfFirebase();
    navigation.navigate('Login Screen');
  };

  // source: https://medium.com/swlh/how-to-use-face-id-with-react-native-or-expo-134231a25fe4
  // https://docs.expo.io/versions/latest/sdk/local-authentication/
  const onFaceID = async () => {
    try {
      // Checking if device is compatible
      const isCompatible = await LocalAuthentication.hasHardwareAsync();

      if (!isCompatible) {
        storeBiometrics(false);
        throw new Error(Localized("Your device isn't compatible"));
      }

      // Checking if device has biometrics records
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        storeBiometrics(false);
        throw new Error(Localized('No Faces / Fingers found'));
      }
      storeBiometrics(true);
      // Authenticate user
      // the authenticate method below is used in LoginScreen.js
      // await LocalAuthentication.authenticateAsync();
    } catch (error) {
      Alert.alert(Localized('An error as occured'), error?.message);
    }
  };

  useEffect(() => {
    if (useBiometrics === true) {
      onFaceID();
    }
  }, [useBiometrics]);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isSettingsModalOpen}
      statusBarTranslucent={true}
      onRequestClose={() => setIsSettingsModalOpen(false)}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScreenContainer style={{ justifyContent: 'flex-start' }}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -60}
            style={{
              flex: 1,
              width: '100%',
            }}>
            <ScrollView
              style={{ width: '100%' }}
              nestedScrollEnabled={true}
              contentContainerStyle={{ height: '100%', paddingBottom: 20 }}
              keyboardShouldPersistTaps="always">
              <Flexbox
                onStartShouldSetResponder={() => true}
                justify="flex-start"
                height="100%">
                <Flexbox>
                  <Header>
                    <HeaderButtonContainer>
                      <TouchableOpacity
                        testID="my-info-close-modal-button"
                        onPress={() => setIsSettingsModalOpen(false)}>
                        <CloseIcon />
                      </TouchableOpacity>
                    </HeaderButtonContainer>
                    <H3>{Localized('Settings').toUpperCase()}</H3>
                    <HeaderButtonContainer>
                      <View />
                    </HeaderButtonContainer>
                  </Header>

                  <Subheader justify="center">
                    <H5Heavy>{Localized('Account')}</H5Heavy>
                  </Subheader>

                  <Flexbox
                    accessibilityLabel="settings info"
                    style={{ position: 'relative', paddingBottom: 0 }}
                    padding={12}>
                    <RowContainer>
                      <H5Secondary>{Localized('Username')}</H5Secondary>
                      <H5 style={{ marginStart: 8 }}>{email}</H5>
                    </RowContainer>

                    <RowContainer>
                      <H5Secondary>
                        {Localized('Face ID or Fingerprint Sign In')}
                      </H5Secondary>
                      <Switch
                        testID="biometrics-switch"
                        value={useBiometrics}
                        onValueChange={() => storeBiometrics(!useBiometrics)}
                      />
                    </RowContainer>
                  </Flexbox>
                </Flexbox>

                <Divider />

                <View
                  style={{
                    width: '85%',
                  }}>
                  <PrimaryButton
                    testID="log-out-button-in-settings"
                    onPress={() => signOut()}>
                    {Localized('Sign Out').toUpperCase()}
                  </PrimaryButton>
                </View>
              </Flexbox>
            </ScrollView>
          </KeyboardAvoidingView>
        </ScreenContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

SettingsModal.propTypes = {
  setIsSettingsModalOpen: PropTypes.func.isRequired,
  isSettingsModalOpen: PropTypes.bool.isRequired,
};

export default SettingsModal;
