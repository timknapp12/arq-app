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
import { findMarketUrl } from '../../../utils/markets/findMarketUrl';
import { findMarketId } from '../../../utils/markets/findMarketId';
import { GET_CORPORATE_RESOURCES } from '../../../graphql/queries';
import 'firebase/firestore';

const FlagIcon = styled.Image`
  height: 20px;
  width: 20px;
  border-radius: 10px;
`;

const CorporateView = ({ navigation, fadeOut, isMenuOpen }) => {
  const {
    userMarket,
    // we might need device language for translations
    // deviceLanguage,
  } = useContext(AppContext);
  const { markets } = useContext(LoginContext);

  // this is to dismiss the little callout popup menu by tapping anywhere on the screen
  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  const [isMarketModalOpen, setIsMarketModalOpen] = useState(false);

  const [selectedMarket, setSelectedMarket] = useState(userMarket.countryCode);
  const initialMarketUrl = markets?.[0]?.pictureUrl ?? '';
  const [marketUrl, setMarketUrl] = useState(initialMarketUrl);
  const [marketId, setMarketId] = useState(userMarket.countryId);

  const { data } = useQuery(GET_CORPORATE_RESOURCES, {
    variables: { countries: marketId },
  });

  useEffect(() => {
    if (selectedMarket) {
      setMarketUrl(findMarketUrl(selectedMarket, markets));
      setMarketId(findMarketId(selectedMarket, markets));
    }
  }, [selectedMarket]);

  const navigateToResource = (item) => {
    // touch events on android bleed through to underlying elements, so this prevents the default touch event if a menu item is touched
    if (isMenuOpen && Platform.OS === 'android') {
      return fadeOut();
    }
    fadeOut();
    if (item.folderName === 'Products') {
      navigation.navigate('Product Category Screen', {
        title: item.folderName.toUpperCase(),
        categoryList: item.childFolders,
      });
    } else {
      navigation.navigate('Resources Category Screen', {
        title: item.folderName.toUpperCase(),
        assetList: item.links,
      });
    }
    // firebase gives an error if there are spaces in the logEvent name or if it is over 40 characters
    const formattedTitle = item.folderName.split(' ').join('_');
    const shortenedTitle = formattedTitle.slice(0, 23) + '_category_tapped';
    // this regex takes out special characters like "&"
    const strippedTitle = shortenedTitle.replace(/\W/g, '');
    Analytics.logEvent(strippedTitle, {
      screen: 'Corporate Resources',
      purpose: `See details for ${item.title}`,
    });
  };

  const openMarketModal = () => {
    setIsMarketModalOpen(true);
  };

  return (
    <>
      <FilterSearchBar
        onPress={() => {
          fadeOut();
          navigation.navigate('Corporate Search Screen', {
            marketId: marketId,
          });
        }}>
        <TouchableOpacity disabled={isMenuOpen} onPress={openMarketModal}>
          <FlagIcon
            source={{
              uri: marketUrl,
            }}
          />
        </TouchableOpacity>
      </FilterSearchBar>
      <MainScrollView>
        <TouchableWithoutFeedback
          onPress={() => setIsCalloutOpenFromParent(false)}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              padding: 10,
            }}
            accessibilityLabel="Corporate Resources"
            onStartShouldSetResponder={() => true}>
            {data?.corporateResources.map((item, index) => (
              <ResourceCard
                isCalloutOpenFromParent={isCalloutOpenFromParent}
                setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
                style={{ zIndex: -index }}
                key={item.folderId}
                url={item.pictureUrl}
                title={item.folderName}
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
        />
      )}
    </>
  );
};

CorporateView.propTypes = {
  navigation: PropTypes.object.isRequired,
  fadeOut: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};

export default CorporateView;
