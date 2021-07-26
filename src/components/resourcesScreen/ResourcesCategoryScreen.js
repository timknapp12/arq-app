import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'firebase/firestore';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import { ScreenContainer, Flexbox } from '../common';
import AssetCard from './assetCard/AssetCard';
import DownloadToast from './DownloadToast';

const ResourcesCategoryScreen = ({ route, navigation }) => {
  const { assetList, folderId, isOwner, selectedTeamName } = route.params;
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

  // this is to dismiss the little callout popup menu by tapping anywhere on the screen
  const [isCalloutOpenFromParent, setIsCalloutOpenFromParent] = useState(false);
  // this is to disable navigation to an asset on android devices when a touch event happens on a callout menu that is rendered over the top of an asset card
  const [isNavDisabled, setIsNavDisabled] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setIsCalloutOpenFromParent(false)}>
      <ScreenContainer
        style={{ paddingTop: 0, paddingBottom: 0, height: 'auto' }}>
        <ScrollView
          onStartShouldSetResponder={() => true}
          style={{
            zIndex: -1,
            width: '100%',
            height: '100%',
          }}
          contentContainerStyle={{
            paddingBottom: 120,
          }}>
          <TouchableWithoutFeedback
            onPress={() => setIsCalloutOpenFromParent(false)}>
            <Flexbox
              justify="flex-start"
              height="100%"
              padding={10}
              onStartShouldSetResponder={() => true}>
              <DownloadToast
                title={toastTitle}
                body={toastBody}
                visible={isToastVisible}
                progress={toastProgress}
              />

              {assetList.map((item, index) => (
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
                  folderId={folderId}
                  displayOrder={item?.displayOrder}
                  selectedTeamName={selectedTeamName}
                />
              ))}
            </Flexbox>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

ResourcesCategoryScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
  teamAssetList: PropTypes.array,
};

export default ResourcesCategoryScreen;
