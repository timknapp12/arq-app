import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import * as firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import {
  ScreenContainer,
  Flexbox,
  CloseIcon,
  Header,
  PrimaryButton,
  SecondaryButton,
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
import TermsAndPrivacy from '../login/loginScreen/TermsAndPrivacy';
import { findMarketId } from '../../utils/markets/findMarketId';
import VerifyDeleteAccount from './VerifyDeleteAccountModal';

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

  const { markets, userProfile, updateProfile, userMarket } =
    useContext(LoginContext);

  const [selectedMarket, setSelectedMarket] = useState(
    userMarket?.countryCode ?? 'us',
  );

  const [isSaveButtonVisisble, setIsSaveButtonVisisble] = useState(false);

  const [isVerifyDeleteAccountModalOpen, setIsVerifyDeleteAccountModalOpen] =
    useState(false);

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
    Analytics.logEvent('Sign_out_in_settings_tapped');
    signOutOfFirebase();
    navigation.navigate('Login Screen');
  };

  const [deleteAccountError, setDeleteAccountError] = useState('');
  const deleteCurrentFirebaseUser = () => {
    user
      .delete()
      .then(() => {
        Analytics.logEvent('Delete_account_button_tapped');
        signOut();
      })
      .catch((error) => setDeleteAccountError(error.message));
  };

  const defaultCountryId = findMarketId(selectedMarket, markets);

  const variables = {
    associateId: userProfile?.associateId,
    defaultCountry: defaultCountryId,
  };

  const onSaveDefaultMarket = () => {
    updateProfile({
      variables: variables,
      onError: (error) =>
        console.log(`error in settings modal default market:`, error),
    });
  };

  const onSubmit = () => {
    onSaveDefaultMarket();
    setIsSettingsModalOpen(false);
    Analytics.logEvent(`Save_default_market_id_${defaultCountryId}`);
  };

  const openTerms = (url) => {
    setIsSettingsModalOpen(false);
    navigation.navigate('Resources Asset Screen', {
      title: Localized('Terms').toUpperCase(),
      url: url,
      contentType: 'pdf',
    });
  };
  const openPrivacy = (url) => {
    setIsSettingsModalOpen(false);
    navigation.navigate('Resources Asset Screen', {
      title: Localized('Privacy').toUpperCase(),
      url: url,
      contentType: 'pdf',
    });
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
                      <H5Secondary>{`${Localized('Sign In')} ${Localized(
                        'Email',
                      )}`}</H5Secondary>
                      <H5 style={{ marginStart: 8 }}>{email}</H5>
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
                <View
                  style={{
                    width: '85%',
                    marginTop: 40,
                  }}
                >
                  <SecondaryButton
                    testID="delete-account-button-in-settings"
                    onPress={() => setIsVerifyDeleteAccountModalOpen(true)}
                  >
                    {Localized('Delete Account').toUpperCase()}
                  </SecondaryButton>
                </View>
              </Flexbox>
            </ScrollView>
          </KeyboardAvoidingView>
          <TermsAndPrivacy openTerms={openTerms} openPrivacy={openPrivacy} />
          {isVerifyDeleteAccountModalOpen && (
            <VerifyDeleteAccount
              visible={isVerifyDeleteAccountModalOpen}
              onClose={() => setIsVerifyDeleteAccountModalOpen(false)}
              onConfirm={deleteCurrentFirebaseUser}
              deleteAccountError={deleteAccountError}
            />
          )}
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
