import React, { useState, useContext, useEffect } from 'react';
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
  H4Heavy,
  H5Heavy,
  H3,
  H5,
  H5Secondary,
  Picker,
} from '../common';
import { Localized } from '../../translations/Localized';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
import config from '../../../app.json';
import { findMarketId } from '../../utils/markets/findMarketId';

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
  const { signOutOfFirebase } = useContext(AppContext);
  const user = firebase.auth().currentUser;
  const email = user?.email;

  const {
    storeBiometrics,
    useBiometrics,
    markets,
    userProfile,
    updateProfile,
    refetchProfile,
    userMarket,
  } = useContext(LoginContext);

  const [selectedMarket, setSelectedMarket] = useState(
    userMarket?.countryCode ?? 'us',
  );

  const [isSaveButtonVisisble, setIsSaveButtonVisisble] = useState(false);

  // we need to restructure the markets from the database into a structure that fits the dropdown picker
  const reshapedItems = markets?.map((item) => ({
    key: item?.countryId,
    id: item?.countryId,
    label: item?.countryName,
    value: item?.countryCode,
  }));

  // this is a fallback so the Picker won't crash if the markets array is empty as some point
  const fallbackMarketItems = [
    {
      key: 88,
      id: 88,
      label: 'United States',
      value: 'us',
    },
  ];

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
    } catch (error) {
      Alert.alert(Localized('An error has occurred'), error?.message);
    }
  };

  const onFaceIDChange = () => {
    storeBiometrics(!useBiometrics);
    if (!useBiometrics && Platform.OS === 'ios') {
      // the authenticate method below is used in LoginScreen.js, but here it is just used to trigger the permissions dialogue for FaceID for iOS
      LocalAuthentication.authenticateAsync();
    }
  };

  useEffect(() => {
    if (useBiometrics === true) {
      onFaceID();
    }
  }, [useBiometrics]);

  const defaultCountryId = findMarketId(selectedMarket, markets);

  const variables = {
    associateId: userProfile?.associateId,
    profileUrl: userProfile?.profileUrl,
    profileImageFileName: userProfile?.profileImageFileName,
    firstName: userProfile?.firstName,
    lastName: userProfile?.lastName,
    displayName: userProfile?.displayName,
    emailAddress: userProfile?.emailAddress,
    primaryPhoneNumber: userProfile?.primaryPhoneNumber,
    address1: userProfile?.address?.address1,
    address2: userProfile?.address?.address2,
    city: userProfile?.address?.city,
    state: userProfile?.address?.state,
    zip: userProfile?.address?.zip,
    countryCode: userProfile?.address?.countryCode,
    defaultCountry: defaultCountryId,
  };

  const onSaveDefaultMarket = () => {
    updateProfile({
      variables: variables,
      onCompleted: (data) => {
        console.log(`data`, data);
        refetchProfile();
      },
      onError: (error) => console.log(`error`, error),
    });
  };

  const onSubmit = () => {
    onSaveDefaultMarket();
    setIsSettingsModalOpen(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isSettingsModalOpen}
      statusBarTranslucent={true}
      onRequestClose={() => setIsSettingsModalOpen(false)}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScreenContainer style={{ justifyContent: 'flex-start' }}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -60}
            style={{
              flex: 1,
              width: '100%',
            }}
          >
            <ScrollView
              style={{ width: '100%' }}
              nestedScrollEnabled={true}
              contentContainerStyle={{ height: '100%', paddingBottom: 20 }}
              keyboardShouldPersistTaps="always"
            >
              <Flexbox
                onStartShouldSetResponder={() => true}
                justify="flex-start"
                height="100%"
              >
                <Flexbox>
                  <Header>
                    <HeaderButtonContainer>
                      <TouchableOpacity
                        style={{
                          paddingTop: 8,
                          paddingBottom: 8,
                        }}
                        testID="my-info-close-modal-button"
                        onPress={() => setIsSettingsModalOpen(false)}
                      >
                        <CloseIcon />
                      </TouchableOpacity>
                    </HeaderButtonContainer>
                    <H3>{Localized('Settings').toUpperCase()}</H3>
                    <HeaderButtonContainer>
                      {isSaveButtonVisisble ? (
                        <TouchableOpacity
                          testID="settings-save-button"
                          onPress={onSubmit}
                        >
                          <H4Heavy>{Localized('Save').toUpperCase()}</H4Heavy>
                        </TouchableOpacity>
                      ) : (
                        <View />
                      )}
                    </HeaderButtonContainer>
                  </Header>

                  <Subheader justify="center">
                    <H5Heavy>{Localized('Account')}</H5Heavy>
                  </Subheader>

                  <Flexbox
                    accessibilityLabel="settings info"
                    style={{ position: 'relative', paddingBottom: 0 }}
                    padding={12}
                  >
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
                        onValueChange={onFaceIDChange}
                      />
                    </RowContainer>

                    <H5Secondary
                      style={{
                        alignSelf: 'flex-start',
                        paddingStart: 8,
                      }}
                    >
                      {Localized('Default Market')}
                    </H5Secondary>
                    <View
                      style={{
                        paddingRight: 8,
                        paddingLeft: 8,
                        width: '100%',
                      }}
                    >
                      <Picker
                        items={
                          reshapedItems?.length > 0
                            ? reshapedItems
                            : fallbackMarketItems
                        }
                        value={selectedMarket}
                        onValueChange={(value) => {
                          setSelectedMarket(value);
                          setIsSaveButtonVisisble(true);
                        }}
                        placeholder={{}}
                      />
                    </View>
                  </Flexbox>
                </Flexbox>

                <Divider />

                <View
                  style={{
                    width: '85%',
                  }}
                >
                  <PrimaryButton
                    testID="log-out-button-in-settings"
                    onPress={() => signOut()}
                  >
                    {Localized('Sign Out').toUpperCase()}
                  </PrimaryButton>
                </View>
              </Flexbox>
            </ScrollView>
          </KeyboardAvoidingView>
          <H5Secondary>{`ARQ Version: ${config.expo.version}`}</H5Secondary>
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
