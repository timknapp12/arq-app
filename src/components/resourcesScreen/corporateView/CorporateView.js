import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { useQuery } from '@apollo/client';
import * as Analytics from 'expo-firebase-analytics';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MainScrollView } from '../../common';
import FilterSearchBar from '../../filterSearchBar/FilterSearchBar';
import ResourceCard from '../ResourceCard';
import MarketModal from '../../marketModal/MarketModal';
import AppContext from '../../../contexts/AppContext';
import LoginContext from '../../../contexts/LoginContext';
import TabButtonContext from '../../../contexts/TabButtonContext';
import { findMarketUrl } from '../../../utils/markets/findMarketUrl';
import { findMarketId } from '../../../utils/markets/findMarketId';
import { GET_CORPORATE_RESOURCES } from '../../../graphql/queries';
import 'firebase/firestore';

const FlagIcon = styled.Image`
  height: 20px;
  width: 20px;
  border-radius: 10px;
`;

const CorporateView = ({ navigation, closeMenus, isMenuOpen }) => {
  const { deviceLanguage } = useContext(AppContext);
  const {
    userMarket,
    markets,
    setDisplayNotifications,
    displayNotifications,
    showAddOptions,
  } = useContext(LoginContext);
  const { closeAddOptions } = useContext(TabButtonContext);

  // this is to dismiss the little callout popup menu by tapping anywhere on the screen
  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  const [isMarketModalOpen, setIsMarketModalOpen] = useState(false);

  const [selectedMarket, setSelectedMarket] = useState('');
  const initialMarketUrl = markets?.[0]?.pictureUrl ?? '';
  const [marketUrl, setMarketUrl] = useState(initialMarketUrl);
  const [marketId, setMarketId] = useState(null);

  const [selectedLanguage, setSelectedLanguage] = useState(
    deviceLanguage || 'en',
  );

  const { data } = useQuery(GET_CORPORATE_RESOURCES, {
    variables: {
      countries: marketId,
      languageCode: selectedLanguage,
    },
    onError: (error) => console.log(`error in get corporate resources`, error),
  });

  useEffect(() => {
    if (userMarket) {
      setSelectedMarket(userMarket.countryCode);
      setMarketId(userMarket.countryId);
    }
  }, [userMarket]);

  useEffect(() => {
    if (selectedMarket && markets) {
      setMarketUrl(findMarketUrl(selectedMarket, markets));
      setMarketId(findMarketId(selectedMarket, markets));
    }
  }, [selectedMarket]);

  const navigateToResource = (item) => {
    // touch events on android bleed through to underlying elements, so this prevents the default touch event to bleed through to a resource card if the side menu is open and a menu item is touched
    // or if the navbar button is expanded and one of those add option buttons is tapped
    if (
      (isMenuOpen && Platform.OS === 'android') ||
      (showAddOptions && Platform.OS === 'android')
    ) {
      return closeMenus();
    }
    // don't allow navigation if notifications is open
    if (displayNotifications && Platform.OS === 'android') {
      return;
    }
    // close notifications window if it is open instead of navigating to resource
    if (displayNotifications && Platform.OS === 'ios') {
      return setDisplayNotifications(false);
    }
    closeMenus();
    if (item?.originalFolderName === 'Products') {
      navigation.navigate('Product Category Screen', {
        title: item?.folderName.toUpperCase(),
        categoryList: item?.childFolders,
      });
    } else {
      navigation.navigate('Resources Category Screen', {
        title: item?.folderName.toUpperCase(),
        assetList: item?.links,
      });
    }
    // }
    // firebase gives an error if there are spaces in the logEvent name or if it is over 40 characters
    const formattedTitle = item?.folderName.split(' ').join('_');
    const shortenedTitle = formattedTitle.slice(0, 23) + '_category_tapped';
    // this regex takes out special characters like "&"
    const strippedTitle = shortenedTitle.replace(/\W/g, '');
    Analytics.logEvent(strippedTitle, {
      screen: 'Corporate Resources',
      purpose: `See details for ${item?.title}`,
    });
  };

  const openMarketModal = () => {
    // close notifications window if it is open instead of opening modal
    // this is because android touches bleed through the notifications window and could activate this function
    if (displayNotifications) {
      return setDisplayNotifications(false);
    }
    closeAddOptions();
    setIsMarketModalOpen(true);
  };

  const goToSearch = () => {
    // close notifications window if it is open instead of navigating search
    // this is because android touches bleed through the notifications window and could activate this function
    if (displayNotifications) {
      return setDisplayNotifications(false);
    }
    closeMenus();
    navigation.navigate('Corporate Search Screen', {
      marketId: marketId,
    });
  };

  return (
    <>
      <FilterSearchBar onPress={goToSearch}>
        <TouchableOpacity disabled={isMenuOpen} onPress={openMarketModal}>
          <FlagIcon
            key={marketUrl}
            source={{
              uri: marketUrl,
            }}
          />
        </TouchableOpacity>
      </FilterSearchBar>
      <MainScrollView>
        <TouchableWithoutFeedback
          onPress={() => setIsCalloutOpenFromParent(false)}
        >
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              padding: 10,
            }}
            accessibilityLabel="Corporate Resources"
            onStartShouldSetResponder={() => true}
          >
            {data?.corporateResources.map((item, index) => (
              <ResourceCard
                isCalloutOpenFromParent={isCalloutOpenFromParent}
                setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
                style={{ zIndex: -index }}
                key={item?.folderId}
                url={item?.pictureUrl}
                title={item?.folderName}
                isMenuOpen={isMenuOpen}
                onPress={() => {
                  setIsCalloutOpenFromParent(false);
                  navigateToResource(item);
                }}
              />
            ))}
          </View>
        </TouchableWithoutFeedback>
      </MainScrollView>
      {isMarketModalOpen && (
        <MarketModal
          visible={isMarketModalOpen}
          onClose={() => setIsMarketModalOpen(false)}
          context="resources"
          items={markets}
          value={selectedMarket}
          onValueChange={(value) => setSelectedMarket(value)}
          showLanguages
          selectedLanguage={selectedLanguage}
          onLanguageValueChange={(value) => setSelectedLanguage(value)}
        />
      )}
    </>
  );
};

CorporateView.propTypes = {
  navigation: PropTypes.object.isRequired,
  closeMenus: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};

export default CorporateView;
