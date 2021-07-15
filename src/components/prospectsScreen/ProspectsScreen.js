import React, { useState, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import * as Analytics from 'expo-firebase-analytics';
import { useIsFocused } from '@react-navigation/native';
import { useQuery, useMutation } from '@apollo/client';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  Platform,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {
  ScreenContainer,
  H4,
  TertiaryButton,
  TopButtonBar,
  Flexbox,
  AddButton,
  ButtonText,
} from '../common';
import FilterIcon from '../../../assets/icons/filter-icon.svg';
import FilterSearchBar from '../filterSearchBar/FilterSearchBar';
import FilterMenu from './FilterMenu';
import AppContext from '../../contexts/AppContext';
import ProspectsContext from '../../contexts/ProspectsContext';
import ProspectsView from './ProspectsView';
import AddContactModal from './AddContactModal';
import { initLanguage, Localized } from '../../translations/Localized';
import { GET_CONTACTS } from '../../graphql/queries';
import { ADD_UPDATE_CONTACT, DELETE_CONTACT } from '../../graphql/mutations';

const ProspectsScreen = ({ navigation }) => {
  initLanguage();
  const { theme, associateId } = useContext(AppContext);
  const isFocused = useIsFocused();

  const initialView = {
    name: Localized('PROSPECTS'),
    testID: 'prospects_button',
  };
  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  const [isTouchDisabled, setIsTouchDisabled] = useState(false);
  const [view, setView] = useState(initialView);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);

  const tertiaryButtonText = [
    { name: Localized('PROSPECTS'), testID: 'prospects_button' },
    { name: Localized('PARTNERS'), testID: 'partners_button' },
  ];

  const navigate = (item) => {
    // close callout
    setView(item);
    Analytics.logEvent(`${item.testID}_tapped`, {
      screen: 'ProspectsScreen',
      purpose: `See details for ${item.name}`,
    });
  };

  useEffect(() => {
    if (isFocused) {
      Analytics.logEvent('Prospects_Screen_Visited', {
        screen: 'Prospects Screen',
        purpose: 'User navigated to Prospects Screen',
      });
    }
  }, [isFocused]);

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(-500)).current;

  const openFilterMenu = () => {
    setIsFilterMenuOpen(true);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: false,
    }).start();
  };
  const closeFilterMenu = () => {
    Animated.timing(fadeAnim, {
      toValue: -500,
      duration: 700,
      useNativeDriver: false,
    }).start(() => setIsFilterMenuOpen(false));
  };

  const { loading, data } = useQuery(GET_CONTACTS, {
    variables: { associateId },
  });
  // console.log(`data in contacts:`, data);

  const [addUpdateContact] = useMutation(ADD_UPDATE_CONTACT, {
    refetchQueries: [{ query: GET_CONTACTS, variables: { associateId } }],
    onError: (error) => console.log(`error in update contact:`, error),
  });

  const [deleteContact] = useMutation(DELETE_CONTACT, {
    refetchQueries: [{ query: GET_CONTACTS, variables: { associateId } }],
    onError: (error) => console.log(`error`, error),
  });

  const subject = 'This is a test subject';
  const message = 'this is test body and should be updated';
  const separator = Platform.OS === 'ios' ? '&' : '?';

  const onEmail = (email) =>
    Linking.openURL(`mailto:${email}?subject=${subject}&body=${message}`);
  const onMessage = (phone) =>
    Linking.openURL(`sms:${phone}${separator}body=${message}`);

  return (
    <ProspectsContext.Provider
      value={{
        isCalloutOpenFromParent,
        setIsCalloutOpenFromParent,
        isTouchDisabled,
        setIsTouchDisabled,
        isFilterMenuOpen,
        closeFilterMenu,
        view,
        onEmail,
        onMessage,
        addUpdateContact,
        deleteContact,
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          closeFilterMenu();
          setIsCalloutOpenFromParent(false);
        }}>
        <ScreenContainer
          style={{
            justifyContent: 'flex-start',
            paddingTop: 0,
            paddingBottom: 0,
          }}>
          <TopButtonBar>
            {tertiaryButtonText.map((item) => (
              <TertiaryButton
                style={{ marginRight: 15 }}
                onPress={() => navigate(item)}
                selected={view.name === item.name}
                key={item.name}>
                {item.name}
              </TertiaryButton>
            ))}
          </TopButtonBar>
          <FilterSearchBar
            onPress={() =>
              navigation.navigate('Prospects Search Screen', {
                title: view.name,
              })
            }>
            <TouchableOpacity
              onPress={isFilterMenuOpen ? closeFilterMenu : openFilterMenu}>
              <Flexbox direction="row" width="auto">
                <FilterIcon
                  style={{
                    height: 30,
                    width: 30,
                    color: theme.primaryTextColor,
                    marginTop: -2,
                    marginEnd: 6,
                  }}
                />
              </Flexbox>
            </TouchableOpacity>
          </FilterSearchBar>
          <Flexbox>
            <FilterMenu style={{ left: fadeAnim }} />
          </Flexbox>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={theme.disabledBackgroundColor}
            />
          ) : (
            <>
              {view.name === Localized('PROSPECTS') && (
                <ProspectsView contacts={data?.prospects} />
              )}
              {view.name === Localized('PARTNERS') && <H4>PARTNERS</H4>}
            </>
          )}
          <AddButton
            onPress={() => setIsAddContactModalOpen(true)}
            bottom="130px">
            <ButtonText>+</ButtonText>
          </AddButton>
        </ScreenContainer>
      </TouchableWithoutFeedback>
      {isAddContactModalOpen && (
        <AddContactModal
          isAddContactModalOpen={isAddContactModalOpen}
          setIsAddContactModalOpen={setIsAddContactModalOpen}
          newContact
        />
      )}
    </ProspectsContext.Provider>
  );
};

ProspectsScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ProspectsScreen;
