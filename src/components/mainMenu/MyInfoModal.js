import React, { useState, useEffect } from 'react';
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
  Dimensions,
} from 'react-native';
import {
  ScreenContainer,
  H4Bold,
  Flexbox,
  H2Normal,
  CloseIcon,
  H5,
  AnimatedInput,
  Picker,
  Subheader,
  Header,
} from '../common';
import { Localized, initLanguage } from '../../translations/Localized';
import * as Localization from 'expo-localization';
// source for files for different languages https://stefangabos.github.io/world_countries/
import enCountires from '../../translations/countries/en-countries.json';
import deCountires from '../../translations/countries/de-countries.json';
import frCountires from '../../translations/countries/fr-countries.json';
import esCountires from '../../translations/countries/es-countries.json';
import jaCountires from '../../translations/countries/ja-countries.json';
import noCountires from '../../translations/countries/no-countries.json';
import usStates from '../../translations/countries/us-states.json';
import ProfileImage from './ProfileImage';
import { saveProfileImageToFirebase } from '../../utils/saveToFirebase';

const HeaderButtonContainer = styled.View`
  width: 60px;
`;

const { width } = Dimensions.get('window');
const nameInputWidth = `${width - 150}px`;

const NameContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 100px;
  align-items: flex-end;
  width: 100%;
`;

const MyInfoModal = ({ setIsMyInfoModalOpen, isMyInfoModalOpen }) => {
  initLanguage();
  const initialState = {
    image: {
      imageName: 'Sloane.Taylor.34903f19-d0c7-41b6-b4d2-2eed0ad1ef6c',
      url:
        'https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/profile_images%2F..964d8849-399c-48a0-a8b2-00e595eb7e1a?alt=media&token=6d3c26a3-5367-4212-bda3-673a86482d61',
    },
    firstName: 'Sloane',
    lastName: 'Taylor',
    displayName: '',
    email: '',
    phone: '',
    distributorId: '',
    address1: '',
    address2: '',
    city: '',
    state: 'UT',
    zipcode: '',
    country: 'us',
  };
  const [myInfo, setMyInfo] = useState(initialState);
  const [isSaveButtonVisisble, setIsSaveButtonVisisble] = useState(false);
  const [isNewImageSelected, setIsNewImageSelected] = useState(false);
  const handleChange = (field, text) => {
    setMyInfo({ ...myInfo, [field]: text });
  };

  const onSubmit = () => {
    // TODO add saving logic here
    // only save image if it has been changed
    isNewImageSelected && saveProfileImageToFirebase(myInfo, handleChange);
    setIsMyInfoModalOpen(false);
    setIsNewImageSelected(false);
  };

  let localeLanguageTag = Localization.locale.substring(0, 2);
  let countryList = enCountires;
  const countryMap = {
    de: deCountires,
    en: enCountires,
    fr: frCountires,
    ja: jaCountires,
    es: esCountires,
    no: noCountires,
    nb: noCountires,
  };
  countryList = countryMap[localeLanguageTag] || enCountires;

  const {
    image,
    firstName,
    lastName,
    displayName,
    email,
    phone,
    distributorId,
    address1,
    address2,
    city,
    state,
    zipcode,
    country,
  } = myInfo;
  const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;

  useEffect(() => {
    if (country === 'us') {
      usStates.find((item) => item.value === state)
        ? handleChange('state', state)
        : handleChange('state', 'CA');
    }
  }, [country]);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isMyInfoModalOpen}
      statusBarTranslucent={true}
      onRequestClose={() => setIsMyInfoModalOpen(false)}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScreenContainer>
            <ScrollView
              style={{ width: '100%' }}
              contentContainerStyle={{ paddingBottom: 20 }}
              keyboardShouldPersistTaps="always">
              <Flexbox justify="flex-start" height="100%">
                <Header>
                  <HeaderButtonContainer>
                    <TouchableOpacity
                      testID="my-info-close-modal-button"
                      onPress={() => setIsMyInfoModalOpen(false)}>
                      <CloseIcon />
                    </TouchableOpacity>
                  </HeaderButtonContainer>
                  <H2Normal>{Localized('My Info')}</H2Normal>
                  <HeaderButtonContainer>
                    {isSaveButtonVisisble ? (
                      <TouchableOpacity
                        testID="my-info-save-button"
                        onPress={onSubmit}>
                        <H4Bold>{Localized('SAVE')}</H4Bold>
                      </TouchableOpacity>
                    ) : (
                      <View />
                    )}
                  </HeaderButtonContainer>
                </Header>

                <Subheader justify="center">
                  <H5>{Localized('Contact Information')}</H5>
                </Subheader>
                <Flexbox width="85%">
                  <NameContainer>
                    <ProfileImage
                      image={image}
                      handleChange={handleChange}
                      setIsSaveButtonVisisble={setIsSaveButtonVisisble}
                      initials={initials}
                      setIsNewImageSelected={setIsNewImageSelected}
                    />

                    <Flexbox
                      accessibilityLabel="contact information"
                      width={nameInputWidth}
                      justify="space-between"
                      align="flex-end"
                      height="100%">
                      <AnimatedInput
                        testID="first-name-input"
                        label={Localized('First Name')}
                        value={firstName}
                        onChangeText={(text) => {
                          handleChange('firstName', text);
                          setIsSaveButtonVisisble(true);
                        }}
                        returnKeyType="done"
                        textContentType="givenName"
                      />
                      <AnimatedInput
                        testID="first-name-input"
                        label={Localized('Last Name')}
                        value={lastName}
                        onChangeText={(text) => {
                          handleChange('lastName', text);
                          setIsSaveButtonVisisble(true);
                        }}
                        returnKeyType="done"
                        textContentType="familyName"
                      />
                    </Flexbox>
                  </NameContainer>
                  <AnimatedInput
                    testID="display-name-input"
                    label={Localized('Display Name')}
                    value={displayName}
                    onChangeText={(text) => {
                      handleChange('displayName', text);
                      setIsSaveButtonVisisble(true);
                    }}
                    returnKeyType="done"
                    textContentType="nickname"
                  />
                  <AnimatedInput
                    testID="email-input"
                    label={Localized('Email')}
                    value={email}
                    onChangeText={(text) => {
                      handleChange('email', text);
                      setIsSaveButtonVisisble(true);
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="done"
                    textContentType="emailAddress"
                  />
                  <AnimatedInput
                    testID="phone-number-input"
                    label={Localized('Phone Number')}
                    value={phone}
                    onChangeText={(text) => {
                      handleChange('phone', text);
                      setIsSaveButtonVisisble(true);
                    }}
                    keyboardType="phone-pad"
                    returnKeyType="done"
                    textContentType="telephoneNumber"
                  />
                  <AnimatedInput
                    testID="distributor-id-input"
                    label={Localized('Distributor ID')}
                    value={distributorId}
                    editable={false}
                  />
                </Flexbox>
                <Subheader style={{ marginTop: 12 }} justify="center">
                  <H5>{Localized('Address')}</H5>
                </Subheader>
                <Flexbox accessibilityLabel="address information" width="85%">
                  <AnimatedInput
                    testID="address-1-input"
                    label={Localized('Address 1')}
                    value={address1}
                    onChangeText={(text) => {
                      handleChange('address1', text);
                      setIsSaveButtonVisisble(true);
                    }}
                    returnKeyType="done"
                    textContentType="streetAddressLine1"
                  />
                  <AnimatedInput
                    testID="address-2-input"
                    label={Localized('Address 2')}
                    value={address2}
                    onChangeText={(text) => {
                      handleChange('address2', text);
                      setIsSaveButtonVisisble(true);
                    }}
                    returnKeyType="done"
                    textContentType="streetAddressLine2"
                  />
                  <AnimatedInput
                    testID="city-input"
                    label={Localized('City')}
                    value={city}
                    onChangeText={(text) => {
                      handleChange('city', text);
                      setIsSaveButtonVisisble(true);
                    }}
                    returnKeyType="done"
                    textContentType="addressCity"
                  />
                  <Flexbox
                    direction="row"
                    align="flex-end"
                    style={{
                      zIndex: 4,
                      paddingTop: 4,
                      marginBottom: 4,
                    }}>
                    {country === 'us' ? (
                      <Picker
                        items={usStates}
                        label={Localized('State')}
                        value={
                          usStates.find((item) => item.value === state)
                            ? state
                            : 'CA'
                        }
                        placeholder={{ label: Localized('State'), value: null }}
                        onValueChange={(value) => {
                          handleChange('state', value);
                          setIsSaveButtonVisisble(true);
                        }}
                        testID="state-picker-input"
                        style={{ width: '48%' }}
                      />
                    ) : (
                      <Flexbox width="48%">
                        <AnimatedInput
                          testID="state-input"
                          label={Localized('State')}
                          value={state}
                          onChangeText={(text) => {
                            handleChange('state', text);
                            setIsSaveButtonVisisble(true);
                          }}
                          returnKeyType="done"
                          textContentType="addressState"
                        />
                      </Flexbox>
                    )}
                    <Flexbox width="48%">
                      <AnimatedInput
                        testID="zip-code-input"
                        label={Localized('ZIP Code')}
                        value={zipcode}
                        onChangeText={(text) => {
                          handleChange('zipcode', text);
                          setIsSaveButtonVisisble(true);
                        }}
                        keyboardType="phone-pad"
                        returnKeyType="done"
                        textContentType="postalCode"
                      />
                    </Flexbox>
                  </Flexbox>
                  <Picker
                    items={countryList}
                    label={Localized('Country')}
                    value={country}
                    placeholder={{ label: Localized('Country'), value: null }}
                    onValueChange={(value) => {
                      handleChange('country', value);
                      setIsSaveButtonVisisble(true);
                    }}
                    testID="country-input"
                  />
                </Flexbox>
              </Flexbox>
            </ScrollView>
          </ScreenContainer>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

MyInfoModal.propTypes = {
  setIsMyInfoModalOpen: PropTypes.func.isRequired,
  isMyInfoModalOpen: PropTypes.bool.isRequired,
};

export default MyInfoModal;
