import React, { useState, useEffect, useContext, useRef } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import {
  ScreenContainer,
  H4Heavy,
  Flexbox,
  CloseIcon,
  H5Heavy,
  AnimatedInput,
  // Picker,
  Subheader,
  Header,
  AlertText,
  H3,
  // TextArea,
} from '../common';
import { Localized } from '../../translations/Localized';
// import * as Localization from 'expo-localization';
import AppContext from '../../contexts/AppContext';
import LoginContext from '../../contexts/LoginContext';
import { saveProfileImageToFirebase } from '../../utils/firebase/saveProfileImageToFirebase';
import ProfileImage from './ProfileImage';
// source for files for different languages https://stefangabos.github.io/world_countries/
// import enCountries from '../../translations/countries/en-countries.json';
// import deCountries from '../../translations/countries/de-countries.json';
// import frCountries from '../../translations/countries/fr-countries.json';
// import esCountries from '../../translations/countries/es-countries.json';
// import jaCountries from '../../translations/countries/ja-countries.json';
// import noCountries from '../../translations/countries/no-countries.json';
// import itCountries from '../../translations/countries/it-countries.json';
// import csCountries from '../../translations/countries/cs-countries.json';
// import nlCountries from '../../translations/countries/nl-countries.json';
import usStates from '../../translations/countries/us-states.json';

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
  const { theme } = useContext(AppContext);
  const {
    updateProfile,
    refetchProfile,
    userProfile: data = {
      profileUrl: '',
      profileImageFileName: '',
      firstName: '',
      lastName: '',
      displayName: '',
      emailAddress: '',
      primaryPhoneNumber: '',
      // bio: '',
      address: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        // countryCode: 'us'
      },
    },
  } = useContext(LoginContext);
  const initialState = data;
  const [myInfo, setMyInfo] = useState(initialState);
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
  // const [isCountryError, setIsCountryError] = useState(false);

  const [loading, setLoading] = useState(false);

  const scrollViewRef = useRef();

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
      /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
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
    if (!address?.address1) {
      setIsAddress1Error(true);
      return false;
    } else {
      setIsAddress1Error(false);
      return true;
    }
  };
  const validateCity = () => {
    if (!address?.city) {
      setIsCityError(true);
      return false;
    } else {
      setIsCityError(false);
      return true;
    }
  };
  const validateState = () => {
    if (!address?.state) {
      setIsStateError(true);
      return false;
    } else {
      setIsStateError(false);
      return true;
    }
  };
  const validateZipcode = () => {
    if (!address?.zip) {
      setIsZipcodeError(true);
      return false;
    } else {
      setIsZipcodeError(false);
      return true;
    }
  };
  // const validateCountry = () => {
  //   if (!address?.countryCode) {
  //     setIsCountryError(true);
  //     return false;
  //   } else {
  //     setIsCountryError(false);
  //     return true;
  //   }
  // };

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
      !validateZipcode()
      // || !validateCountry()
    ) {
      return false;
    } else {
      return true;
    }
  };

  const onCompleted = () => {
    setIsMyInfoModalOpen(false);
    refetchProfile();
  };

  const variables = {
    associateId: associateId,
    profileUrl: profileUrl,
    profileImageFileName: profileImageFileName,
    firstName: firstName,
    lastName: lastName,
    displayName: displayName,
    emailAddress: emailAddress,
    primaryPhoneNumber: primaryPhoneNumber,
    address1: address?.address1,
    address2: address?.address2,
    city: address?.city,
    state: address?.state,
    zip: address?.zip,
    countryCode: address?.countryCode,
  };

  // TODO - when we allow fields to be edited, then use commented out code below to validate fields
  const onSubmit = () => {
    // if (!validateAllFields()) {
    //   return false;
    // } else {
    setLoading(true);
    // only save image if it has been changed
    isNewImageSelected
      ? saveProfileImageToFirebase(
          myInfo,
          profileUrl,
          updateProfile,
          variables,
          onCompleted,
        )
      : updateProfile({
          variables: variables,
          onCompleted: onCompleted(),
        });
    // }
  };

  // let localeLanguageTag = Localization.locale.substring(0, 2);
  // let countryList = enCountries;
  // const countryMap = {
  //   de: deCountries,
  //   en: enCountries,
  //   fr: frCountries,
  //   ja: jaCountries,
  //   es: esCountries,
  //   no: noCountries,
  //   nb: noCountries,
  //   it: itCountries,
  // };
  // countryList = countryMap[localeLanguageTag] || enCountries;

  const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;

  // https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/profile_images%2FJena.Tomer.17a243ef-ca1e-4bc8-90d1-ca3a65683432_72x72?alt=media&token=cb1ccb74-a51b-408d-bb9a-6cecb5ae9694

  // states for usa are in a dropdown but just a text input for other countries so this pevents breaking the ui for state value when switching countries
  useEffect(() => {
    if (address?.countryCode === 'us') {
      usStates.find((item) => item?.value === address?.state)
        ? handleChange('address', { ...address, state: address?.state })
        : handleChange('address', { ...address, state: null });
    }
    return () => {
      setIsNewImageSelected(false);
      setLoading(false);
    };
  }, [address?.countryCode]);
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isMyInfoModalOpen}
      statusBarTranslucent={true}
      onRequestClose={() => setIsMyInfoModalOpen(false)}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScreenContainer style={{ justifyContent: 'flex-start' }}>
          <KeyboardAvoidingView
            style={{ flex: 1, width: '100%' }}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <Header>
              <HeaderButtonContainer>
                <TouchableOpacity
                  style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                  }}
                  testID="my-info-close-modal-button"
                  onPress={() => setIsMyInfoModalOpen(false)}
                >
                  <CloseIcon />
                </TouchableOpacity>
              </HeaderButtonContainer>
              <H3>{Localized('My Info').toUpperCase()}</H3>
              <HeaderButtonContainer>
                {isSaveButtonVisisble ? (
                  <TouchableOpacity
                    testID="my-info-save-button"
                    onPress={onSubmit}
                  >
                    {loading ? (
                      <ActivityIndicator
                        color={theme.disabledBackgroundColor}
                      />
                    ) : (
                      <H4Heavy>{Localized('Save').toUpperCase()}</H4Heavy>
                    )}
                  </TouchableOpacity>
                ) : (
                  <View />
                )}
              </HeaderButtonContainer>
            </Header>
            <ScrollView
              ref={scrollViewRef}
              style={{ width: '100%' }}
              contentContainerStyle={{ paddingBottom: 24 }}
              keyboardShouldPersistTaps="always"
            >
              <Flexbox justify="flex-start" height="100%">
                <Subheader justify="center">
                  <H5Heavy>{Localized('Contact Information')}</H5Heavy>
                </Subheader>
                <Flexbox width="85%">
                  <NameContainer>
                    <ProfileImage
                      profileUrl={profileUrl}
                      handleChange={handleChange}
                      fieldName="profileUrl"
                      setIsSaveButtonVisisble={setIsSaveButtonVisisble}
                      initials={initials}
                      setIsNewImageSelected={setIsNewImageSelected}
                    />

                    <Flexbox
                      accessibilityLabel="contact information"
                      width={nameInputWidth}
                      justify="space-between"
                      align="flex-end"
                      height="100%"
                    >
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
                        editable={false}
                      />
                      <AnimatedInput
                        testID="last-name-input"
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
                        editable={false}
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
                    editable={false}
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
                    editable={false}
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
                    editable={false}
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
                    value={address?.address1}
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
                    editable={false}
                  />
                  <AnimatedInput
                    testID="address-2-input"
                    label={Localized('Address 2')}
                    value={address?.address2}
                    onChangeText={(text) => {
                      handleChange('address', { ...address, address2: text });
                      setIsSaveButtonVisisble(true);
                    }}
                    returnKeyType="done"
                    textContentType="streetAddressLine2"
                    editable={false}
                  />
                  <AnimatedInput
                    testID="city-input"
                    label={Localized('City')}
                    value={address?.city}
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
                    editable={false}
                  />
                  <Flexbox
                    direction="row"
                    align="flex-end"
                    style={{
                      zIndex: 4,
                      paddingTop: 4,
                      marginBottom: 4,
                    }}
                  >
                    {/* {address?.countryCode === 'us' ? (
                      <Flexbox width="48%" align="flex-start">
                        <Picker
                          items={usStates}
                          label={Localized('State')}
                          value={address?.state}
                          placeholder={{
                            label: '',
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
                    ) : ( */}
                    <Flexbox width="48%">
                      <AnimatedInput
                        testID="state-input"
                        label={Localized('State')}
                        value={address?.state}
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
                        editable={false}
                      />
                    </Flexbox>
                    {/* // )} */}
                    <Flexbox width="48%">
                      <AnimatedInput
                        testID="zip-code-input"
                        label={Localized('ZIP Code')}
                        value={address?.zip}
                        onChangeText={(text) => {
                          handleChange('address', { ...address, zip: text });
                          setIsSaveButtonVisisble(true);
                        }}
                        keyboardType="phone-pad"
                        returnKeyType="done"
                        textContentType="postalCode"
                        validationError={isZipcodeError}
                        onBlur={validateZipcode}
                        editable={false}
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
                  <AnimatedInput
                    testID="country-input"
                    label={Localized('Country')}
                    value={address?.countryCode}
                    editable={false}
                  />
                  {/* <Flexbox align="flex-start">
                    <Picker
                      items={countryList}
                      label={Localized('Country')}
                      value={address?.countryCode}
                      placeholder={{}}
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
                  </Flexbox> */}
                  {/* <Flexbox height="200px">
                    <TextArea
                      label={Localized('Bio')}
                      numberOfLines={8}
                      onFocus={() =>
                        scrollViewRef.current.scrollToEnd({ animated: true })
                      }
                    />
                  </Flexbox> */}
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
