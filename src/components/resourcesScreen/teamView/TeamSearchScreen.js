import React, { useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import {
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { ScreenContainer, Flexbox, Input } from '../../common';
import AssetCard from '../assetCard/AssetCard';
import DownloadToast from '../DownloadToast';
import AppContext from '../../../contexts/AppContext';
import { SEARCH_RESOURCES } from '../../../graphql/queries';

const TeamSearchScreen = ({ route, navigation }) => {
  const { theme, deviceLanguage } = useContext(AppContext);
  console.log(`deviceLanguage`, deviceLanguage);
  const { selectedTeamName, isOwner } = route.params;
  const [value, setValue] = useState('');

  // this is to dismiss the little callout popup menu by tapping anywhere on the screen
  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  // this is to disable navigation to an asset on android devices when a touch event happens on a callout menu that is rendered over the top of an asset card
  const [isNavDisabled, setIsNavDisabled] = useState(false);

  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [toastBody, setToastBody] = useState('');
  const [toastProgress, setToastProgress] = useState(0);

  const setToastInfo = (title, body, visible, progress) => {
    setToastTitle(title);
    setToastBody(body);
    setIsToastVisible(visible);
    setToastProgress(progress);
  };

  const [searchResources, { loading, data }] = useLazyQuery(SEARCH_RESOURCES, {
    fetchPolicy: 'cache-and-network',
  });

  const debounceSearch = useCallback(
    debounce(
      (value) =>
        value.length > 0 &&
        searchResources({
          variables: {
            teams: selectedTeamName,
            searchList: value,
            // language: deviceLanguage,
          },
        }),
      1000,
    ),
    [],
  );

  const handleChange = (value) => {
    setValue(value);
    debounceSearch(value);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => setIsCalloutOpenFromParent(false)}
      style={{ flex: 1 }}>
      <ScreenContainer
        style={{
          justifyContent: 'flex-start',
          paddingTop: 0,
          paddingBottom: 0,
          height: '100%',
        }}>
        <DownloadToast
          title={toastTitle}
          body={toastBody}
          visible={isToastVisible}
          progress={toastProgress}
        />
        <Flexbox style={{ marginTop: 18 }} padding={4} width="85%">
          <Input
            autoFocus
            testID="team-search-input"
            value={value}
            onChangeText={handleChange}
            returnKeyType="done"
          />
        </Flexbox>
        <ScrollView
          style={{ flex: 1, width: '100%', height: '100%' }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 120,
            marginTop: 8,
          }}>
          {loading ? (
            <ActivityIndicator
              style={{ marginTop: 30 }}
              size="large"
              color={theme.disabledBackgroundColor}
            />
          ) : (
            <TouchableWithoutFeedback
              onPress={() => setIsCalloutOpenFromParent(false)}>
              <Flexbox
                justify="flex-start"
                padding={10}
                onStartShouldSetResponder={() => true}>
                {data?.searchResources?.links?.map((item, index) => (
                  <AssetCard
                    isCalloutOpenFromParent={isCalloutOpenFromParent}
                    setIsCalloutOpenFromParent={setIsCalloutOpenFromParent}
                    style={{ zIndex: -index }}
                    key={item?.linkId}
                    linkId={item?.linkId}
                    url={item?.linkUrl}
                    title={item?.linkTitle}
                    description={item?.linkDescription}
                    contentType={item?.contentType}
                    ext={item?.extension}
                    navigation={navigation}
                    setToastInfo={setToastInfo}
                    setIsNavDisabled={setIsNavDisabled}
                    isNavDisabled={isNavDisabled}
                    isOwner={isOwner}
                    folderId={item?.folderId}
                    displayOrder={item?.displayOrder}
                    selectedTeamName={selectedTeamName}
                    searchTerm={value}
                  />
                ))}
              </Flexbox>
            </TouchableWithoutFeedback>
          )}
        </ScrollView>
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

TeamSearchScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default TeamSearchScreen;
