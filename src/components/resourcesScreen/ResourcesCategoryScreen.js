import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import { ScreenContainer, Flexbox, H3 } from '../common';
import AssetCard from './assetCard/AssetCard';
import UploadAssetModal from './UploadAssetModal';
import DownloadToast from './DownloadToast';
import AppContext from '../../contexts/AppContext';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { getCorporateAssets } from '../../utils/firebase/getCorporateAssets';

const AddButton = styled.TouchableOpacity`
  height: 56px;
  width: 56px;
  background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 12px;
  box-shadow: 0px 24px 12px rgba(0, 0, 0, 0.5);
`;

const ButtonText = styled(H3)`
  font-family: 'Avenir-Black';
`;

const ResourcesCategoryScreen = ({ route, navigation }) => {
  const { deviceLanguage } = useContext(AppContext);
  const db = firebase.firestore();
  const { documentID, teamAssetList, hasPermissions, market } = route.params;
  const [assetList, setAssetList] = useState(teamAssetList || []);
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

  // this will get data from firebase for corporate assets, but data for team assets will just be passed as a prop called teamAssetList
  useEffect(() => {
    if (documentID) {
      getCorporateAssets(db, market, deviceLanguage, setAssetList, documentID);
    }
  }, []);

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
                  key={item.id}
                  url={item.url}
                  title={item.title}
                  description={item.description}
                  contentType={item.contentType}
                  ext={item.ext}
                  navigation={navigation}
                  setToastInfo={setToastInfo}
                  setIsNavDisabled={setIsNavDisabled}
                  isNavDisabled={isNavDisabled}
                  hasPermissions={hasPermissions}
                />
              ))}
            </Flexbox>
          </TouchableWithoutFeedback>
        </ScrollView>
        {hasPermissions && (
          <AddButton
            onPress={() => {
              setIsUploadAssetModalOpen(true);
              setIsCalloutOpenFromParent(false);
            }}>
            <ButtonText>+</ButtonText>
          </AddButton>
        )}
        {isUploadAssetModalOpen && (
          <UploadAssetModal
            visible={isUploadAssetModalOpen}
            onClose={() => {
              setIsUploadAssetModalOpen(false);
            }}
          />
        )}
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
