import React from 'react';
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
  H5,
  Picker,
  Subheader,
  Header,
  PrimaryButton,
  EditIcon,
  Switch,
} from '../common';
import { Localized, initLanguage } from '../../translations/Localized';

const HeaderButtonContainer = styled.View`
  width: 60px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px;
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

const SettingsModal = ({ setIsSettingsModalOpen, isSettingsModalOpen }) => {
  initLanguage();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isSettingsModalOpen}
      statusBarTranslucent={true}
      onRequestClose={() => setIsSettingsModalOpen(false)}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScreenContainer>
            <ScrollView
              style={{ width: '100%' }}
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

                  <Subheader justify="center">
                    <H5>{Localized('Account')}</H5>
                  </Subheader>
                  <Flexbox padding={12}>
                    <RowContainer>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                        }}>
                        <SecondaryText>{Localized('Username')}</SecondaryText>
                        <PrimaryText style={{ marginStart: 8 }}>
                          sloanetaylor
                        </PrimaryText>
                      </View>
                      <Pressable
                        onPress={() => console.log('this is running')}
                        hitSlop={8}>
                        <EditIcon />
                      </Pressable>
                    </RowContainer>

                    <RowContainer>
                      <PrimaryText>{Localized('Password')}</PrimaryText>
                      <Pressable
                        onPress={() => console.log('this is running 2')}
                        hitSlop={8}>
                        <EditIcon />
                      </Pressable>
                    </RowContainer>

                    <RowContainer>
                      <PrimaryText>
                        {Localized('Face ID or Fingerprint Log In')}
                      </PrimaryText>
                      <Switch />
                    </RowContainer>
                  </Flexbox>

                  <Subheader justify="center">
                    <H5>{Localized('Notifications')}</H5>
                  </Subheader>
                </Flexbox>

                <View style={{ width: '85%' }}>
                  <PrimaryButton>{Localized('Log Out')}</PrimaryButton>
                </View>

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
              </Flexbox>
            </ScrollView>
          </ScreenContainer>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

SettingsModal.propTypes = {
  setIsSettingsModalOpen: PropTypes.func.isRequired,
  isSettingsModalOpen: PropTypes.bool.isRequired,
};

export default SettingsModal;
