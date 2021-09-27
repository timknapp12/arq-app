import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'firebase/firestore';
import { useQuery } from '@apollo/client';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import { ScreenContainer, Flexbox, AddButton, ButtonText } from '../../common';
import LoadingScreen from '../../loadingScreen/LoadingScreen';
import AssetCard from '../assetCard/AssetCard';
import UploadAssetModal from '../teamView/UploadAssetModal';
import DownloadToast from '../DownloadToast';
import { GET_ASSETS } from '../../../graphql/queries';

const TeamResourcesCategoryScreen = ({ route, navigation }) => {
  const { folderId, isOwner, selectedTeamName } = route.params;
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [toastBody, setToastBody] = useState('');
  const [toastProgress, setToastProgress] = useState(0);
  const [isUploadAssetModalOpen, setIsUploadAssetModalOpen] = useState(false);

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

  const { loading, data } = useQuery(GET_ASSETS, { variables: { folderId } });

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <TouchableWithoutFeedback onPress={() => setIsCalloutOpenFromParent(false)}>
      <ScreenContainer
        style={{ paddingTop: 0, paddingBottom: 0, height: 'auto' }}
      >
        <ScrollView
          onStartShouldSetResponder={() => true}
          style={{
            zIndex: -1,
            width: '100%',
            height: '100%',
          }}
          contentContainerStyle={{
            paddingBottom: 240,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => setIsCalloutOpenFromParent(false)}
          >
            <Flexbox
              justify="flex-start"
              height="100%"
              padding={10}
              onStartShouldSetResponder={() => true}
            >
              <DownloadToast
                title={toastTitle}
                body={toastBody}
                visible={isToastVisible}
                progress={toastProgress}
              />

              {data?.links?.map((item, index) => (
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
        {isOwner && (
          <AddButton
            bottom="10px"
            right="12px"
            onPress={() => {
              setIsUploadAssetModalOpen(true);
              setIsCalloutOpenFromParent(false);
            }}
          >
            <ButtonText>+</ButtonText>
          </AddButton>
        )}
        {isUploadAssetModalOpen && (
          <UploadAssetModal
            visible={isUploadAssetModalOpen}
            onClose={() => {
              setIsUploadAssetModalOpen(false);
            }}
            folderId={folderId}
            displayOrder={data?.links?.length + 1}
            selectedTeamName={selectedTeamName}
          />
        )}
      </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

TeamResourcesCategoryScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default TeamResourcesCategoryScreen;
