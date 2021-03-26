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
  H5Bold,
  HeaderText,
} from '../common';
import { Localized, initLanguage } from '../../translations/Localized';
import UsernameEditModal from './UsernameEditModal';
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

const PrimaryText = styled.Text`
  font-family: 'Nunito-Regular';
  font-size: 16px;
  color: ${(props) => props.theme.color};
`;

const SecondaryText = styled.Text`
  font-family: 'Nunito-Regular';
  font-size: 16px;
  color: ${(props) => props.theme.secondaryTextColor};
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
    label: 'United States',
    value: 'us',
  },
  {
    label: 'United Kingdom',
    value: 'uk',
  },
  {
    label: 'Japan',
    value: 'jp',
  },
  {
    label: 'Germany',
    value: 'de',
  },
  {
    label: 'France',
    value: 'fr',
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
  const [username, setUsername] = useState(initialState);
  const [isUsernameEditModalOpen, setIsUsernameEditModalOpen] = useState(false);
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
                    <HeaderText>
                      {Localized('Settings').toUpperCase()}
                    </HeaderText>
                    <HeaderButtonContainer>
                      <View />
                    </HeaderButtonContainer>
                  </Header>

                  <Subheader justify="center">
                    <H5Bold>{Localized('Account')}</H5Bold>
                  </Subheader>

                  <Flexbox
                    accessibilityLabel="settings info"
                    style={{ position: 'relative', paddingBottom: 0 }}
                    padding={12}>
                    <RowContainer>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                        }}>
                        <SecondaryText>{Localized('Username')}</SecondaryText>
                        <PrimaryText style={{ marginStart: 8 }}>
                          {username}
                        </PrimaryText>
                      </View>
                      <Pressable
                        testID="edit-username-modal-button"
                        onPress={() => setIsUsernameEditModalOpen(true)}
                        hitSlop={8}>
                        <EditIcon />
                      </Pressable>
                    </RowContainer>

                    <RowContainer>
                      <PrimaryText>{Localized('Password')}</PrimaryText>
                      <Pressable
                        testID="edit-new-password-modal-button"
                        onPress={() => setIsPasswordEditModalOpen(true)}
                        hitSlop={8}>
                        <EditIcon />
                      </Pressable>
                    </RowContainer>

                    <RowContainer>
                      <PrimaryText>
                        {Localized('Face ID or Fingerprint Log In')}
                      </PrimaryText>
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
            <UsernameEditModal
              visible={isUsernameEditModalOpen}
              setIsUsernameEditModalOpen={setIsUsernameEditModalOpen}
              value={username}
              initialValue={initialState}
              onChangeText={(text) => setUsername(text)}
            />
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
