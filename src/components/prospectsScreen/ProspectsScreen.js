import React, { useState, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import * as Analytics from 'expo-firebase-analytics';
import { useIsFocused } from '@react-navigation/native';
import { useLazyQuery } from '@apollo/client';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { ScreenContainer, Flexbox, AddButton, ButtonText } from '../common';
import FilterIcon from '../../../assets/icons/filter-icon.svg';
import FilterSearchBar from '../filterSearchBar/FilterSearchBar';
import FilterMenu from './FilterMenu';
import AppContext from '../../contexts/AppContext';
import ProspectsContext from '../../contexts/ProspectsContext';
import LoginContext from '../../contexts/LoginContext';
import ProspectsView from './ProspectsView';
import AddContactModal from './AddContactModal';
import {
  GET_PROSPECTS_BY_FIRSTNAME,
  GET_PROSPECTS_BY_LASTNAME,
} from '../../graphql/queries';

const ProspectsScreen = ({ navigation, route }) => {
  const { theme, associateId } = useContext(AppContext);
  const { setSubject, setRedirectUrl, setProspectLinkIsNeeded } =
    useContext(ProspectsContext);
  const { sortBy, setSortBy } = useContext(LoginContext);
  const isFocused = useIsFocused();

  const linkTitle = route?.params?.title ?? '';
  const linkUrl = route?.params?.url ?? '';
  const prospectLinkIsNeeded = route?.params?.prospectLinkIsNeeded ?? false;

  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  const [isTouchDisabled, setIsTouchDisabled] = useState(false);

  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);

  useEffect(() => {
    if (isFocused) {
      Analytics.logEvent('Prospects_Screen_Visited', {
        screen: 'Prospects Screen',
        purpose: 'User navigated to Prospects Screen',
      });
    }
  }, [isFocused]);

  useEffect(() => {
    setSubject(linkTitle);
    setRedirectUrl(linkUrl);
    setProspectLinkIsNeeded(prospectLinkIsNeeded);
    return () => {
      setSubject('');
      setRedirectUrl('');
      setProspectLinkIsNeeded(false);
    };
  }, [linkTitle, linkUrl]);

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

  const [getProspectsByLastName, { loading, data }] = useLazyQuery(
    GET_PROSPECTS_BY_LASTNAME,
    {
      variables: { associateId },
      fetchPolicy: 'cache-and-network',
      onError: (error) =>
        console.log(`error in get prospects by last name`, error),
    },
  );

  const [
    getProspectsByFirstName,
    { loading: loadingByFirstName, data: dataByFistName },
  ] = useLazyQuery(GET_PROSPECTS_BY_FIRSTNAME, {
    variables: { associateId },
    fetchPolicy: 'cache-and-network',
    onError: (error) =>
      console.log(`error in get prospects by last name`, error),
  });

  useEffect(() => {
    if (sortBy === 'firstName') {
      getProspectsByFirstName();
    } else {
      getProspectsByLastName();
    }
  }, [sortBy]);

  const prospects =
    sortBy === 'firstName'
      ? dataByFistName?.prospects ?? []
      : data?.prospects ?? [];

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          closeFilterMenu();
          setIsCalloutOpenFromParent(false);
        }}
      >
        <ScreenContainer
          style={{
            justifyContent: 'flex-start',
            height: '100%',
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <FilterSearchBar
            onPress={() => navigation.navigate('Prospects Search Screen')}
          >
            <TouchableOpacity
              onPress={isFilterMenuOpen ? closeFilterMenu : openFilterMenu}
            >
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
            <FilterMenu
              onClose={() => setIsFilterMenuOpen(false)}
              setSortBy={setSortBy}
              style={{ left: fadeAnim }}
            />
          </Flexbox>
          {loading || loadingByFirstName ? (
            <ActivityIndicator
              size="large"
              color={theme.disabledBackgroundColor}
            />
          ) : (
            <ProspectsView
              prospects={prospects}
              isCalloutOpenFromParent={isCalloutOpenFromParent}
              setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
              isTouchDisabled={isTouchDisabled}
              setIsTouchDisabled={setIsTouchDisabled}
              isFilterMenuOpen={isFilterMenuOpen}
              closeFilterMenu={closeFilterMenu}
            />
          )}
          <AddButton
            onPress={() => setIsAddContactModalOpen(true)}
            bottom="40px"
          >
            <ButtonText>+</ButtonText>
          </AddButton>
        </ScreenContainer>
      </TouchableWithoutFeedback>
      {isAddContactModalOpen && (
        <AddContactModal
          isAddContactModalOpen={isAddContactModalOpen}
          onClose={() => {
            setIsAddContactModalOpen(false);
            setIsCalloutOpenFromParent(false);
          }}
          newContact
        />
      )}
    </>
  );
};

ProspectsScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default ProspectsScreen;
