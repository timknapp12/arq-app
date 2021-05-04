import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  Pressable,
  Alert,
} from 'react-native';
import {
  ScreenContainer,
  Flexbox,
  CloseIcon,
  H4,
  Picker,
  Header,
  PrimaryButton,
  EditIcon,
  Switch,
  Subheader,
  H5Heavy,
  H3,
  H5,
  H5Secondary,
} from '../common';
import { Localized, initLanguage } from '../../translations/Localized';
import PasswordEditModal from './PasswordEditModal';
import AppContext from '../../contexts/AppContext';
import * as LocalAuthentication from 'expo-local-authentication';

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

// TODO - get real markets from database
const markets = [
  {
    id: 840,
    label: 'United States of America',
    value: 'us',
  },
  { id: 36, label: 'Australia', value: 'au' },
  { id: 40, label: 'Austria', value: 'at' },
  { id: 56, label: 'Belgium', value: 'be' },
  { id: 124, label: 'Canada', value: 'ca' },
  { id: 208, label: 'Denmark', value: 'dk' },
  { id: 250, label: 'France', value: 'fr' },
  { id: 276, label: 'Germany', value: 'de' },
  { id: 300, label: 'Greece', value: 'gr' },
  { id: 380, label: 'Italy', value: 'it' },
  { id: 392, label: 'Japan', value: 'jp' },
  { id: 458, label: 'Malaysia', value: 'my' },
  { id: 484, label: 'Mexico', value: 'mx' },
  { id: 528, label: 'Netherlands', value: 'nl' },
  { id: 554, label: 'New Zealand', value: 'nz' },
  { id: 578, label: 'Norway', value: 'no' },
  { id: 616, label: 'Poland', value: 'pl' },
  { id: 620, label: 'Portugal', value: 'pt' },
  { id: 724, label: 'Spain', value: 'es' },
  { id: 752, label: 'Sweden', value: 'se' },
  {
    id: 826,
    label: 'United Kingdom',
    value: 'uk',
  },
];
const SettingsModal = ({
  setIsSettingsModalOpen,
  isSettingsModalOpen,
  data,
}) => {
  initLanguage();
  const { setIsSignedIn, setUseBiometrics } = useContext(AppContext);
  // TODO wire up a mutation when biometrics switch changes
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState('us');

  const initialState = data.username;
  const [isPasswordEditModalOpen, setIsPasswordEditModalOpen] = useState(false);

  // source: https://medium.com/swlh/how-to-use-face-id-with-react-native-or-expo-134231a25fe4
  // https://docs.expo.io/versions/latest/sdk/local-authentication/
  const onFaceID = async () => {
    try {
      // Checking if device is compatible
      const isCompatible = await LocalAuthentication.hasHardwareAsync();

      if (!isCompatible) {
        setIsBiometricsEnabled(false);
        throw new Error(Localized("Your device isn't compatible"));
      }

      // Checking if device has biometrics records
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        setIsBiometricsEnabled(false);
        throw new Error(Localized('No Faces / Fingers found'));
      }
      setUseBiometrics(true);
      // Authenticate user
      // the authenticate method below is used in LoginScreen.js
      // await LocalAuthentication.authenticateAsync();

      Alert.alert(Localized('FaceID/TouchID is enabled!'));
    } catch (error) {
      Alert.alert(Localized('An error as occured'), error?.message);
    }
  };

  useEffect(() => {
    if (isBiometricsEnabled) {
      onFaceID();
    } else {
      setUseBiometrics(false);
    }
  }, [isBiometricsEnabled]);

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
                      <H5 style={{ marginStart: 8 }}>
                        {/* {username} */}
                        {initialState}
                      </H5>
                    </RowContainer>

                    <RowContainer>
                      <H5Secondary>{Localized('Password')}</H5Secondary>
                      <Pressable
                        testID="edit-new-password-modal-button"
                        onPress={() => setIsPasswordEditModalOpen(true)}
                        hitSlop={8}>
                        <EditIcon />
                      </Pressable>
                    </RowContainer>

                    <RowContainer>
                      <H5Secondary>
                        {Localized('Face ID or Fingerprint Log In')}
                      </H5Secondary>
                      <Switch
                        testID="biometrics-switch"
                        value={isBiometricsEnabled}
                        onValueChange={() =>
                          setIsBiometricsEnabled((state) => !state)
                        }
                      />
                    </RowContainer>

                    <RowContainer style={{ paddingBottom: 0 }}>
                      <Picker
                        items={markets}
                        onValueChange={(value) => setSelectedMarket(value)}
                        value={selectedMarket}
                        placeholder={{
                          label: Localized('Market'),
                          value: null,
                        }}
                        label={Localized('Market')}
                        testID="market-picker-input"
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
                    onPress={() => setIsSignedIn(false)}>
                    {Localized('Log Out').toUpperCase()}
                  </PrimaryButton>
                </View>
              </Flexbox>
            </ScrollView>
            <PasswordEditModal
              visible={isPasswordEditModalOpen}
              setIsPasswordEditModalOpen={setIsPasswordEditModalOpen}
            />
          </KeyboardAvoidingView>

          <Flexbox
            accessibilityLabel="Terms Privacy Data"
            justify="center"
            direction="row"
            padding={14}>
            <TouchableOpacity testID="terms-button-settings-screen">
              <H4>{Localized('Terms')}</H4>
            </TouchableOpacity>
            <H4 style={{ marginStart: 8 }}>|</H4>
            <TouchableOpacity
              testID="privacy-button-settings-screen"
              style={{ marginStart: 8 }}>
              <H4>{Localized('Privacy')}</H4>
            </TouchableOpacity>
            <H4 style={{ marginStart: 8 }}>|</H4>
            <TouchableOpacity
              testID="data-button-settings-screen"
              style={{ marginStart: 8 }}>
              <H4>{Localized('Data')}</H4>
            </TouchableOpacity>
          </Flexbox>
        </ScreenContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

SettingsModal.propTypes = {
  setIsSettingsModalOpen: PropTypes.func.isRequired,
  isSettingsModalOpen: PropTypes.bool.isRequired,
  data: PropTypes.object,
};

export default SettingsModal;
