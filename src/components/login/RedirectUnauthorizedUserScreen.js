import React from 'react';
import PropTypes from 'prop-types';
import * as WebBrowser from 'expo-web-browser';
import QLogoScreenContainer from './QLogoScreenContainer';
import { Flexbox, H4Book, Link } from '../common';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RedirectUnauthorizedUserScreen = ({ route }) => {
  const { message, url, linkText } = route.params;
  const onFindOutMore = () => {
    WebBrowser.openBrowserAsync(url);
  };
  return (
    <QLogoScreenContainer>
      <Flexbox style={{ marginTop: 40 }} width="85%">
        <H4Book style={{ textAlign: 'center' }}>{message}</H4Book>
        <TouchableOpacity
          style={{ marginTop: 12 }}
          testID="not an-ambassador-link"
          onPress={onFindOutMore}
        >
          <Link>{linkText}</Link>
        </TouchableOpacity>
      </Flexbox>
    </QLogoScreenContainer>
  );
};

RedirectUnauthorizedUserScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default RedirectUnauthorizedUserScreen;
