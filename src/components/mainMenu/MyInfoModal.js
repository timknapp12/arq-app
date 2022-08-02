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
} from 'react-native';
import {
  ScreenContainer,
  H4Heavy,
  Flexbox,
  CloseIcon,
  H5Heavy,
  AnimatedInput,
  Subheader,
  Header,
  H3,
  LoadingSpinner,
  TextArea,
} from '../common';
import { Localized } from '../../translations/Localized';
import LoginContext from '../../contexts/LoginContext';
import { saveProfileImageToFirebase } from '../../utils/firebase/saveProfileImageToFirebase';
import ProfileImage from './ProfileImage';
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
  const {
    updateProfile,
    refetchProfile,
    baseEnrollmentUrl,
    userProfile: data = {
      profileUrl: '',
      profileImageFileName: '',
      firstName: '',
      lastName: '',
      displayName: '',
      emailAddress: '',
      primaryPhoneNumber: '',
      associateSlugs: [],
      address: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
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
    associateSlugs,
    address,
  } = myInfo;

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
    address: {
      address1: address?.address1,
      address2: address?.address2,
      city: address?.city,
      state: address?.state,
      zip: address?.zip,
      countryCode: address?.countryCode,
    },
  };

  const onSubmit = () => {
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
  };

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
                      <LoadingSpinner style={{ marginTop: 10 }} size="large" />
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
                    editable={false}
                  />
                  <AnimatedInput
                    testID="ambassador-id-input"
                    label={Localized('Ambassador ID')}
                    value={legacyAssociateId?.toString()}
                    editable={false}
                  />
                  <Flexbox height="100px">
                    <TextArea
                      testID="shopQ-website-input"
                      label={Localized('ShopQ Website')}
                      value={`${baseEnrollmentUrl}?store=${associateSlugs?.[0]?.slug}`}
                      editable={false}
                      multiline
                      numberOfLines={2}
                    />
                  </Flexbox>
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
                        editable={false}
                      />
                    </Flexbox>
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
                        editable={false}
                      />
                    </Flexbox>
                  </Flexbox>
                  <Flexbox direction="row" align="flex-start"></Flexbox>
                  <AnimatedInput
                    testID="country-input"
                    label={Localized('Country')}
                    value={address?.countryCode}
                    editable={false}
                  />
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
