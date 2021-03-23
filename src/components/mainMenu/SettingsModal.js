import React, { useState, useContext } from 'react';
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
} from 'react-native';
import {
  ScreenContainer,
  Flexbox,
  H2Normal,
  CloseIcon,
  H4,
  Picker,
  Header,
  PrimaryButton,
  EditIcon,
  Switch,
} from '../common';
import { Localized, initLanguage } from '../../translations/Localized';
import UsernameEditModal from './UsernameEditModal';
import PasswordEditModal from './PasswordEditModal';
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
  const { setIsSignedIn } = useContext(AppContext);

  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false);
  const [isPushNotiesEnabled, setIsPushNotiesEnabled] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState('us');

  const initialState = data.displayName;
  const [username, setUsername] = useState(initialState);
  const [isUsernameEditModalOpen, setIsUsernameEditModalOpen] = useState(false);
  const [isPasswordEditModalOpen, setIsPasswordEditModalOpen] = useState(false);
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
                justify="space-between"
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
                    <H2Normal>{Localized('Settings')}</H2Normal>
                    <HeaderButtonContainer>
                      <View />
                    </HeaderButtonContainer>
                  </Header>

                  <Flexbox
                    accessibilityLabel="settings info"
                    style={{ position: 'relative' }}
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
                        onPress={() => setIsUsernameEditModalOpen(true)}
                        hitSlop={8}>
                        <EditIcon />
                      </Pressable>
                    </RowContainer>

                    <RowContainer>
                      <PrimaryText>{Localized('Password')}</PrimaryText>
                      <Pressable
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
                        value={isBiometricsEnabled}
                        onValueChange={() =>
                          setIsBiometricsEnabled((state) => !state)
                        }
                      />
                    </RowContainer>

                    <RowContainer>
                      <PrimaryText>
                        {Localized('Push Notifications')}
                      </PrimaryText>
                      <Switch
                        value={isPushNotiesEnabled}
                        onValueChange={() =>
                          setIsPushNotiesEnabled((state) => !state)
                        }
                      />
                    </RowContainer>

                    <RowContainer>
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

                <View
                  style={{
                    width: '85%',
                    flex: 1,
                    zIndex: -1,
                    marginTop: 150,
                  }}>
                  <PrimaryButton onPress={() => setIsSignedIn(false)}>
                    {Localized('Log Out')}
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
            style={{ position: 'absolute', bottom: 30 }}
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
