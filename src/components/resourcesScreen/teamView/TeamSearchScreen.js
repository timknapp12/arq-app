import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ScreenContainer, Flexbox, Input } from '../../common';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import AssetCard from '../assetCard/AssetCard';
import DownloadToast from '../DownloadToast';
// TODO: remove this once we get real data
import { categories } from './mockTeamData';

const TeamSearchScreen = ({ route, navigation }) => {
  const { accessCode } = route.params;
  console.log(`accessCode`, accessCode);
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
        <Flexbox width="85%">
          <Input
            autoFocus
            testID="team-search-input"
            value={value}
            onChangeText={(text) => setValue(text)}
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
          <TouchableWithoutFeedback
            onPress={() => setIsCalloutOpenFromParent(false)}>
            <Flexbox
              justify="flex-start"
              padding={10}
              onStartShouldSetResponder={() => true}
              height="100%">
              {categories[0].assetList.map((item, index) => (
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
                  hasPermissions
                  // TODO: get real data from asset and compare agaisnt associate id to determoine permissions
                  // hasPermissions={hasPermissions}
                />
              ))}
              {/* <Flexbox
              style={{
                height: 80,
                backgroundColor: 'lightblue',
                marginTop: 9,
                width: '100%',
              }}>
              <H4>Hi</H4>
            </Flexbox> */}
            </Flexbox>
          </TouchableWithoutFeedback>
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
