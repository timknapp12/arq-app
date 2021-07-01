import React, { useState, useEffect, useContext } from 'react';
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
  H4Heavy,
  Flexbox,
  CloseIcon,
  H5Heavy,
  AnimatedInput,
  Picker,
  Subheader,
  Header,
  AlertText,
  H3,
} from '../common';
import { Localized, initLanguage } from '../../translations/Localized';
import * as Localization from 'expo-localization';
import LoginContext from '../../contexts/LoginContext';
// source for files for different languages https://stefangabos.github.io/world_countries/
import enCountries from '../../translations/countries/en-countries.json';
import deCountries from '../../translations/countries/de-countries.json';
import frCountries from '../../translations/countries/fr-countries.json';
import esCountries from '../../translations/countries/es-countries.json';
import jaCountries from '../../translations/countries/ja-countries.json';
import noCountries from '../../translations/countries/no-countries.json';
import itCountries from '../../translations/countries/it-countries.json';
import usStates from '../../translations/countries/us-states.json';
import ProfileImage from './ProfileImage';

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
  const {
    userProfile: data,
    saveProfileImageToFirebase,
    updateProfile,
  } = useContext(LoginContext);
  const initialState = data;
  const [myInfo, setMyInfo] = useState(initialState);
  console.log(`data`, data);
  const [isSaveButtonVisisble, setIsSaveButtonVisisble] = useState(false);
  const [isNewImageSelected, setIsNewImageSelected] = useState(false);
  const handleChange = (field, text) => {
    setMyInfo({ ...myInfo, [field]: text });
  };

  const [isFirstNameError, setIsFirstNameError] = useState(false);
  const [isLastNameError, setIsLastNameError] = useState(false);
  const [isDisplayNameError, setIsDisplayNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [isAddress1Error, setIsAddress1Error] = useState(false);
  const [isCityError, setIsCityError] = useState(false);
  const [isStateError, setIsStateError] = useState(false);
  const [isZipcodeError, setIsZipcodeError] = useState(false);
  const [isCountryError, setIsCountryError] = useState(false);

  const validateFirstName = () => {
    if (!firstName) {
      setIsFirstNameError(true);
      return false;
    } else {
      setIsFirstNameError(false);
      return true;
    }
  };
  const validateLastName = () => {
    if (!lastName) {
      setIsLastNameError(true);
      return false;
    } else {
      setIsLastNameError(false);
      return true;
    }
  };
  const validateDisplayName = () => {
    if (!displayName) {
      setIsDisplayNameError(true);
      return false;
    } else {
      setIsDisplayNameError(false);
      return true;
    }
  };
  const validateEmail = () => {
    // source for regex https://regexlib.com/Search.aspx?k=email&c=-1&m=5&ps=20
    const pattern = new RegExp(
      '^([a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+).[a-zA-Z]{2,7})$',
    );
    if (!pattern.test(emailAddress)) {
      setIsEmailError(true);
      return false;
    } else {
      setIsEmailError(false);
      return true;
    }
  };
  const validatePhone = () => {
    if (!primaryPhoneNumber) {
      setIsPhoneError(true);
      return false;
    } else {
      setIsPhoneError(false);
      return true;
    }
  };
  const validateAddress1 = () => {
    if (!address1) {
      setIsAddress1Error(true);
      return false;
    } else {
      setIsAddress1Error(false);
      return true;
    }
  };
  const validateCity = () => {
    if (!city) {
      setIsCityError(true);
      return false;
    } else {
      setIsCityError(false);
      return true;
    }
  };
  const validateState = () => {
    if (!state) {
      setIsStateError(true);
      return false;
    } else {
      setIsStateError(false);
      return true;
    }
  };
  const validateZipcode = () => {
    if (!zip) {
      setIsZipcodeError(true);
      return false;
    } else {
      setIsZipcodeError(false);
      return true;
    }
  };
  const validateCountry = () => {
    if (!countryCode) {
      setIsCountryError(true);
      return false;
    } else {
      setIsCountryError(false);
      return true;
    }
  };

  const validateAllFields = () => {
    if (
      !validateFirstName() ||
      !validateLastName() ||
      !validateDisplayName() ||
      !validateEmail() ||
      !validatePhone() ||
      !validateAddress1() ||
      !validateCity() ||
      !validateState() ||
      !validateZipcode() ||
      !validateCountry()
    ) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = async () => {
    // TODO add saving logic here
    if (!validateAllFields()) {
      return false;
    } else {
      // only save image if it has been changed
      isNewImageSelected &&
        (await saveProfileImageToFirebase(myInfo, handleChange));
      setIsMyInfoModalOpen(false);
      setIsNewImageSelected(false);
      updateProfile({
        variables: {
          associateId: associateId,
          profileUrl: profileUrl,
          profileImageFileName: profileImageFileName,
          firstName: firstName,
          lastName: lastName,
          displayName: displayName,
          emailAddress: emailAddress,
          primaryPhoneNumber: primaryPhoneNumber,
          address1: address1,
          address2: address2,
          city: city,
          state: state,
          zip: zip,
          countryCode: countryCode,
        },
      });
    }
  };

  let localeLanguageTag = Localization.locale.substring(0, 2);
  let countryList = enCountries;
  const countryMap = {
    de: deCountries,
    en: enCountries,
    fr: frCountries,
    ja: jaCountries,
    es: esCountries,
    no: noCountries,
    nb: noCountries,
    it: itCountries,
  };
  countryList = countryMap[localeLanguageTag] || enCountries;

  const {
    legacyAssociateId,
    associateId,
    profileUrl,
    profileImageFileName,
    firstName,
    lastName,
    displayName,
    emailAddress,
    primaryPhoneNumber,
    address,
  } = myInfo;
  const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;

  const { address1, address2, city, state, zip, countryCode } = address;
  console.log(`associateId`, associateId);

  // states for usa are in a dropdown but just a text input for other countries so this pevents breaking the ui for state value when switching countries
  useEffect(() => {
    if (countryCode === 'us') {
      usStates.find((item) => item.value === state)
        ? handleChange('address', { ...address, state })
        : handleChange('address', { ...address, state: null });
    }
  }, [countryCode]);
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isMyInfoModalOpen}
      statusBarTranslucent={true}
      onRequestClose={() => setIsMyInfoModalOpen(false)}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScreenContainer style={{ justifyContent: 'flex-start' }}>
          <KeyboardAvoidingView
            style={{ flex: 1, width: '100%' }}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <ScrollView
              style={{ width: '100%' }}
              contentContainerStyle={{ paddingBottom: 4 }}
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
                  <H3>{Localized('My Info').toUpperCase()}</H3>
                  <HeaderButtonContainer>
                    {isSaveButtonVisisble ? (
                      <TouchableOpacity
                        testID="my-info-save-button"
                        onPress={onSubmit}>
                        <H4Heavy>{Localized('SAVE')}</H4Heavy>
                      </TouchableOpacity>
                    ) : (
                      <View />
                    )}
                  </HeaderButtonContainer>
                </Header>

                <Subheader justify="center">
                  <H5Heavy>{Localized('Contact Information')}</H5Heavy>
                </Subheader>
                <Flexbox width="85%">
                  <NameContainer>
                    <ProfileImage
                      profileUrl={profileUrl}
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
                        validationError={isFirstNameError}
                        errorMessage={
                          isFirstNameError
                            ? Localized('This field is required')
                            : null
                        }
                        onBlur={validateFirstName}
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
                        validationError={isLastNameError}
                        errorMessage={
                          isLastNameError
                            ? Localized('This field is required')
                            : null
                        }
                        onBlur={validateLastName}
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
                    validationError={isDisplayNameError}
                    errorMessage={
                      isDisplayNameError
                        ? Localized('This field is required')
                        : null
                    }
                    onBlur={validateDisplayName}
                  />
                  <AnimatedInput
                    testID="email-input"
                    label={Localized('Email')}
                    value={emailAddress}
                    onChangeText={(text) => {
                      handleChange('emailAddress', text);
                      setIsSaveButtonVisisble(true);
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="done"
                    textContentType="emailAddress"
                    validationError={isEmailError}
                    errorMessage={
                      isEmailError
                        ? Localized('Please enter a valid email address')
                        : null
                    }
                    onBlur={validateEmail}
                  />
                  <AnimatedInput
                    testID="phone-number-input"
                    label={Localized('Phone Number')}
                    value={primaryPhoneNumber}
                    onChangeText={(text) => {
                      handleChange('primaryPhoneNumber', text);
                      setIsSaveButtonVisisble(true);
                    }}
                    keyboardType="phone-pad"
                    returnKeyType="done"
                    textContentType="telephoneNumber"
                    validationError={isPhoneError}
                    errorMessage={
                      isPhoneError ? Localized('This field is required') : null
                    }
                    onBlur={validatePhone}
                  />
                  <AnimatedInput
                    testID="ambassador-id-input"
                    label={Localized('Ambassador ID')}
                    value={legacyAssociateId?.toString()}
                    editable={false}
                  />
                </Flexbox>
                <Subheader style={{ marginTop: 12 }} justify="center">
                  <H5Heavy>{Localized('Address')}</H5Heavy>
                </Subheader>
                <Flexbox accessibilityLabel="address information" width="85%">
                  <AnimatedInput
                    testID="address-1-input"
                    label={Localized('Address 1')}
                    value={address1}
                    onChangeText={(text) => {
                      handleChange('address', { ...address, address1: text });
                      setIsSaveButtonVisisble(true);
                    }}
                    returnKeyType="done"
                    textContentType="streetAddressLine1"
                    validationError={isAddress1Error}
                    errorMessage={
                      isAddress1Error
                        ? Localized('This field is required')
                        : null
                    }
                    onBlur={validateAddress1}
                  />
                  <AnimatedInput
                    testID="address-2-input"
                    label={Localized('Address 2')}
                    value={address2}
                    onChangeText={(text) => {
                      handleChange('address', { ...address, address2: text });
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
                      handleChange('address', { ...address, city: text });
                      setIsSaveButtonVisisble(true);
                    }}
                    returnKeyType="done"
                    textContentType="addressCity"
                    validationError={isCityError}
                    errorMessage={
                      isCityError ? Localized('This field is required') : null
                    }
                    onBlur={validateCity}
                  />
                  <Flexbox
                    direction="row"
                    align="flex-end"
                    style={{
                      zIndex: 4,
                      paddingTop: 4,
                      marginBottom: 4,
                    }}>
                    {countryCode === 'us' ? (
                      <Flexbox width="48%" align="flex-start">
                        <Picker
                          items={usStates}
                          label={Localized('State')}
                          value={state}
                          placeholder={{
                            label: Localized('State'),
                            value: null,
                          }}
                          onValueChange={(value) => {
                            handleChange('address', {
                              ...address,
                              state: value,
                            });
                            setIsSaveButtonVisisble(true);
                            validateState();
                          }}
                          testID="state-picker-input"
                          validationError={isStateError}
                        />
                      </Flexbox>
                    ) : (
                      <Flexbox width="48%">
                        <AnimatedInput
                          testID="state-input"
                          label={Localized('State')}
                          value={state}
                          onChangeText={(text) => {
                            handleChange('address', {
                              ...address,
                              state: text,
                            });
                            setIsSaveButtonVisisble(true);
                          }}
                          returnKeyType="done"
                          textContentType="addressState"
                          validationError={isStateError}
                          onBlur={validateState}
                        />
                      </Flexbox>
                    )}
                    <Flexbox width="48%">
                      <AnimatedInput
                        testID="zip-code-input"
                        label={Localized('ZIP Code')}
                        value={zip}
                        onChangeText={(text) => {
                          handleChange('address', { ...address, zip: text });
                          setIsSaveButtonVisisble(true);
                        }}
                        keyboardType="phone-pad"
                        returnKeyType="done"
                        textContentType="postalCode"
                        validationError={isZipcodeError}
                        onBlur={validateZipcode}
                      />
                    </Flexbox>
                  </Flexbox>
                  <Flexbox direction="row" align="flex-start">
                    {isStateError && (
                      <AlertText style={{ bottom: 0 }}>
                        {Localized('This field is required')}
                      </AlertText>
                    )}
                    {isZipcodeError && (
                      <AlertText style={{ bottom: 0 }}>
                        {Localized('This field is required')}
                      </AlertText>
                    )}
                  </Flexbox>
                  <Flexbox align="flex-start">
                    <Picker
                      items={countryList}
                      label={Localized('Country')}
                      value={countryCode}
                      placeholder={{ label: Localized('Country'), value: null }}
                      onValueChange={(value) => {
                        handleChange('address', {
                          ...address,
                          countryCode: value,
                        });
                        setIsSaveButtonVisisble(true);
                        validateCountry();
                      }}
                      testID="country-input"
                      validationError={isCountryError}
                    />
                    {isCountryError && (
                      <AlertText>
                        {Localized('This field is required')}
                      </AlertText>
                    )}
                  </Flexbox>
                </Flexbox>
              </Flexbox>
            </ScrollView>
          </KeyboardAvoidingView>
        </ScreenContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

MyInfoModal.propTypes = {
  setIsMyInfoModalOpen: PropTypes.func.isRequired,
  isMyInfoModalOpen: PropTypes.bool.isRequired,
};

export default MyInfoModal;
