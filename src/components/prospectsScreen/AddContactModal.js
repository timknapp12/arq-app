import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import * as Contacts from 'expo-contacts';
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
  Picker,
  Subheader,
  Header,
  H3,
} from '../common';
import { Localized, initLanguage } from '../../translations/Localized';
import * as Localization from 'expo-localization';
import AppContext from '../../contexts/AppContext';
import ProspectsContext from '../../contexts/ProspectsContext';
import { saveProfileImageToFirebase } from '../../utils/firebase/saveProfileImageToFirebase';
import ProfileImage from '../mainMenu/ProfileImage';
import DeviceContactsModal from './DeviceContactsModal';
// source for files for different languages https://stefangabos.github.io/world_countries/
import enCountries from '../../translations/countries/en-countries.json';
import deCountries from '../../translations/countries/de-countries.json';
import frCountries from '../../translations/countries/fr-countries.json';
import esCountries from '../../translations/countries/es-countries.json';
import jaCountries from '../../translations/countries/ja-countries.json';
import noCountries from '../../translations/countries/no-countries.json';
import itCountries from '../../translations/countries/it-countries.json';
import usStates from '../../translations/countries/us-states.json';

const HeaderButtonContainer = styled.View`
  width: 100px;
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

const AddContactModal = ({
  isAddContactModalOpen,
  setIsAddContactModalOpen,
  newContact,
  data = {
    prospectId: '',
    thumbnailUrl: '',
    firstName: '',
    lastName: '',
    displayName: '',
    emailAddress: '',
    primaryPhone: '',
    notes: '',
    address: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      countryCode: 'us',
    },
  },
}) => {
  initLanguage();
  const { theme, associateId } = useContext(AppContext);
  const { addUpdateContact } = useContext(ProspectsContext);

  const initialState = data;
  const [contactInfo, setContactInfo] = useState(initialState);
  const [isSaveButtonVisisble, setIsSaveButtonVisisble] = useState(false);
  const [isNewImageSelected, setIsNewImageSelected] = useState(false);

  const handleChange = (field, text) => {
    setContactInfo({ ...contactInfo, [field]: text });
  };

  const [isFirstNameError, setIsFirstNameError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [deviceContacts, setDeviceContacts] = useState([]);
  const [isDeviceContactsModalOpen, setIsDeviceContactsModalOpen] =
    useState(false);

  const {
    prospectId,
    thumbnailUrl,
    firstName,
    lastName,
    displayName,
    emailAddress,
    primaryPhone,
    address,
    notes,
  } = contactInfo;

  const getDeviceContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.FirstName,
          Contacts.Fields.LastName,
          Contacts.Fields.Image,
          Contacts.Fields.Nickname,
          Contacts.Fields.Emails,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.Addresses,
        ],
      });

      if (data.length > 0) {
        setDeviceContacts(data);
        setIsDeviceContactsModalOpen(true);
      }
    }
  };

  const validateFirstName = () => {
    if (!firstName) {
      setIsFirstNameError(true);
      return false;
    } else {
      setIsFirstNameError(false);
      return true;
    }
  };

  const validateAllFields = () => {
    if (!validateFirstName()) {
      return false;
    } else {
      return true;
    }
  };

  const onCompleted = () => {
    setIsAddContactModalOpen(false);
    // refetchProfile();
  };

  const variables = {
    associateId: associateId,
    prospectId: prospectId,
    thumbnailUrl: thumbnailUrl,
    firstName: firstName,
    lastName: lastName ?? '',
    displayName: displayName,
    emailAddress: emailAddress,
    primaryPhone: primaryPhone,
    address1: address?.address1,
    address2: address?.address2,
    city: address?.city,
    state: address?.state,
    zip: address?.zip,
    countryCode: address?.countryCode,
    notes: notes,
  };

  const onSubmit = () => {
    if (!validateAllFields()) {
      return false;
    } else {
      setLoading(true);
      // only save image if it has been changed
      isNewImageSelected
        ? saveProfileImageToFirebase(
            contactInfo,
            thumbnailUrl,
            addUpdateContact,
            variables,
            onCompleted,
          )
        : addUpdateContact({
            variables: variables,
            onCompleted: onCompleted(),
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

  const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;

  // https://firebasestorage.googleapis.com/v0/b/q-connect-pro-staging.appspot.com/o/profile_images%2FJena.Tomer.17a243ef-ca1e-4bc8-90d1-ca3a65683432_72x72?alt=media&token=cb1ccb74-a51b-408d-bb9a-6cecb5ae9694

  // states for usa are in a dropdown but just a text input for other countries so this pevents breaking the ui for state value when switching countries
  useEffect(() => {
    if (address?.countryCode === 'us') {
      usStates.find((item) => item.value === address?.state)
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
      visible={isAddContactModalOpen}
      statusBarTranslucent={true}
      onRequestClose={() => setIsAddContactModalOpen(false)}>
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
                      onPress={() => setIsAddContactModalOpen(false)}>
                      <CloseIcon />
                    </TouchableOpacity>
                  </HeaderButtonContainer>
                  <H3>{Localized('Add Prospect').toUpperCase()}</H3>
                  <HeaderButtonContainer style={{ alignItems: 'flex-end' }}>
                    {isSaveButtonVisisble ? (
                      <TouchableOpacity
                        testID="my-info-save-button"
                        onPress={onSubmit}>
                        {loading ? (
                          <ActivityIndicator
                            color={theme.disabledBackgroundColor}
                          />
                        ) : (
                          <H4Heavy>{Localized('save').toUpperCase()}</H4Heavy>
                        )}
                      </TouchableOpacity>
                    ) : newContact ? (
                      <TouchableOpacity onPress={getDeviceContacts}>
                        <H4Heavy>{Localized('import').toUpperCase()}</H4Heavy>
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
                      profileUrl={thumbnailUrl}
                      handleChange={handleChange}
                      fieldName="thumbnailUrl"
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
                    value={emailAddress}
                    onChangeText={(text) => {
                      handleChange('emailAddress', text);
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
                    value={primaryPhone}
                    onChangeText={(text) => {
                      handleChange('primaryPhone', text);
                      setIsSaveButtonVisisble(true);
                    }}
                    keyboardType="phone-pad"
                    returnKeyType="done"
                    textContentType="telephoneNumber"
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
                  />
                  <Flexbox
                    direction="row"
                    align="flex-end"
                    style={{
                      zIndex: 4,
                      paddingTop: 4,
                      marginBottom: 4,
                    }}>
                    {address?.countryCode === 'us' ? (
                      <Flexbox width="48%" align="flex-start">
                        <Picker
                          items={usStates}
                          label={Localized('State')}
                          value={address?.state}
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
                          }}
                          testID="state-picker-input"
                        />
                      </Flexbox>
                    ) : (
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
                        />
                      </Flexbox>
                    )}
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
                      />
                    </Flexbox>
                  </Flexbox>
                  <Flexbox direction="row" align="flex-start"></Flexbox>
                  <Flexbox align="flex-start">
                    <Picker
                      items={countryList}
                      label={Localized('Country')}
                      value={address?.countryCode}
                      placeholder={{ label: Localized('Country'), value: null }}
                      onValueChange={(value) => {
                        handleChange('address', {
                          ...address,
                          countryCode: value,
                        });
                        setIsSaveButtonVisisble(true);
                      }}
                      testID="country-input"
                    />
                  </Flexbox>
                </Flexbox>
              </Flexbox>
            </ScrollView>
          </KeyboardAvoidingView>
        </ScreenContainer>
      </TouchableWithoutFeedback>
      {isDeviceContactsModalOpen && (
        <DeviceContactsModal
          data={deviceContacts}
          visible={isDeviceContactsModalOpen}
          onClose={() => setIsDeviceContactsModalOpen(false)}
        />
      )}
    </Modal>
  );
};

AddContactModal.propTypes = {
  isAddContactModalOpen: PropTypes.bool.isRequired,
  setIsAddContactModalOpen: PropTypes.func.isRequired,
  newContact: PropTypes.bool,
  data: PropTypes.object,
};

export default AddContactModal;
